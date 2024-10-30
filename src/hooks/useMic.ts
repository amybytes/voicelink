import { useMicContext } from "contexts/MicContext"

export default function useMic() {
  const {setStream} = useMicContext();

  function requestMicStream() {
    return new Promise((resolve, reject) => {
      if ("mediaDevices" in navigator) {
        navigator.mediaDevices
          .getUserMedia({audio: true, video: false})
          .then((stream) => {
            setStream(stream);
            resolve(true);
          });
      }
      else {
        reject();
      }
    });
  }

  return requestMicStream;
}
