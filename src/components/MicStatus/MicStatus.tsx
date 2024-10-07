import "./MicStatus.css";
import {useState, useEffect} from 'react';
import Collapse from "../common/Collapse/Collapse";
import MicIcon from 'icons/mic.svg?react';
import {useMicStatusContext} from 'src/contexts/MicStatusContext';

const STATUS = {
  LISTENING: "Listening",
  RECORDING: "Recording",
};

export default function MicStatus() {
  const [status, setStatus] = useState<string>("Recording");
  const {isListening, isRecording, setIsRecording} = useMicStatusContext();
  
  const isActive = isListening || isRecording;

  useEffect(() => {
    if (isRecording) {
      setStatus(STATUS.RECORDING);
    }
    else if (isListening) {
      setStatus(STATUS.LISTENING);
    }
  }, [isListening, isRecording]);

  return (
    <div className="mic-status" onClick={() => setIsRecording(!isRecording)}>
      <MicIcon className={isRecording ? "recording" : ""} width={40} height={40} />
      <Collapse show={isActive}>
        <div className="details">
          <div className="status">{status}</div>
          <div className="time">00:00</div>
        </div>
      </Collapse>
    </div>
  )
}
