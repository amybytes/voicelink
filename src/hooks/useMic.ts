import {useMicContext} from "contexts/MicContext"

const DEFAULT_FFT_SIZE = 2048;

export default function useMic() {
  const {audioComponents, setAudioComponents} = useMicContext();

  async function setupRecorder(context: AudioContext, source: MediaStreamAudioSourceNode) {
    await context.audioWorklet.addModule("AudioProcessor.js");

    const recorderNode = new AudioWorkletNode(context, "AudioProcessor");
    source.connect(recorderNode);
    return recorderNode;
  }

  function setupAnalyzer(context: AudioContext, source: MediaStreamAudioSourceNode) {
    const analyzer = context.createAnalyser();
    analyzer.fftSize = DEFAULT_FFT_SIZE;
    source.connect(analyzer);
    return analyzer;
  }

  async function setupMic() {
    return new Promise((resolve, reject) => {
      if ("mediaDevices" in navigator) {
        navigator.mediaDevices
          .getUserMedia({audio: true, video: false})
          .then(async (stream) => {
            const context = new AudioContext();
            const source = context.createMediaStreamSource(stream);

            const analyzer = setupAnalyzer(context, source);
            const recorder = await setupRecorder(context, source);

            const data = new Float32Array(analyzer.frequencyBinCount);

            setAudioComponents({
              stream,
              context,
              source,
              analyzer,
              recorder,
              data,
            });
            resolve(true);
          });
      }
      else {
        reject();
      }
    });
  }

  function startMicRecording() {
    audioComponents?.recorder.port.postMessage("start");
  }

  function stopMicRecording() {
    return new Promise((resolve, reject) => {
      const recorderPort = audioComponents?.recorder.port;
      if (recorderPort) {
        recorderPort.postMessage("stop");
        recorderPort.onmessage = (e) => {
          const recorderData: Float32Array[] = e.data;
          const len = recorderData.reduce((sum, buffer) => sum + buffer.length, 0);
          const fullBuffer = new Float32Array(len);

          // Merge samples into a single buffer
          let offset = 0;
          for (let buffer of recorderData) {
            fullBuffer.set(buffer, offset);
            offset += buffer.length;
          }
          resolve(fullBuffer);
        }
      }
      else {
        reject();
      }
    })
  }

  return {setupMic, startMicRecording, stopMicRecording};
}
