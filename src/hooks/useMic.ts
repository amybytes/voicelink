import { useMicContext } from "contexts/MicContext"

const DEFAULT_FFT_SIZE = 32768;
// const DEFAULT_FFT_SIZE = 1024;

export default function useMic() {
  const {setAudioComponents} = useMicContext();

  function setupMic() {
    return new Promise((resolve, reject) => {
      if ("mediaDevices" in navigator) {
        navigator.mediaDevices
          .getUserMedia({audio: true, video: false})
          .then((stream) => {
            const context = new AudioContext();
            const source = context.createMediaStreamSource(stream);
            
            const analyzer = context.createAnalyser();
            analyzer.fftSize = DEFAULT_FFT_SIZE;
            source.connect(analyzer);

            const data = new Float32Array(analyzer.frequencyBinCount);

            setAudioComponents({
              stream,
              context,
              source,
              analyzer,
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

  return setupMic;
}
