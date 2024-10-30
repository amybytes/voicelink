import "./MicStatus.css";
import {useState, useEffect} from 'react';
import Collapse from "../common/Collapse/Collapse";
import MicIcon from 'icons/mic.svg?react';
import {useMicContext} from 'src/contexts/MicContext';
import useMic from 'hooks/useMic';
import useTimer from 'hooks/useTimer';

const STATUS = {
  LISTENING: "Listening",
  RECORDING: "Recording",
  WAITING: "Waiting",     // Waiting for user to allow mic permission
};

export default function MicStatus() {
  const [status, setStatus] = useState<string>(STATUS.WAITING + "--");

  const {isListening, setIsListening, isRecording, setIsRecording} = useMicContext();
  const {time, startTimer, stopTimer} = useTimer();
  const requestMicStream = useMic();
  
  const isActive = isListening || isRecording;

  useEffect(() => {
    if (isRecording) {
      setStatus(STATUS.RECORDING);
    }
    else if (isListening) {
      setStatus(STATUS.LISTENING);
    }
  }, [isListening, isRecording]);

  function formatTime(timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds / 3600)
    timeInSeconds -= hours * 3600;
    const mins = Math.floor(timeInSeconds / 60)
    timeInSeconds -= mins * 60;
    const secs = timeInSeconds;

    let output = "";
    if (hours !== 0) {
      output += `${hours}:`.padStart(3, "0");
    }
    output += `${mins}:`.padStart(3, "0");
    output += `${secs}`.padStart(2, "0");

    return output;
  }

  async function handleClick() {
    if (!isListening && !isRecording) {
      await requestMicStream()
        .then(() => {
          setIsListening(true);
        });
    }
    else if (isRecording) {
      setIsRecording(false);
      stopTimer();
    }
    else {
      setIsRecording(true);
      startTimer();
    }
  }

  return (
    <div className="mic-status" onClick={handleClick}>
      <MicIcon className={isRecording ? "recording" : ""} width={40} height={40} />
      <Collapse show={isActive}>
        <div className="details">
          <div className="status">{status}</div>
          {/* {!isRecording && <div style={{whiteSpace: "nowrap", fontSize: 12}}>Click to record</div>} */}
          <div className="time" hidden={!isRecording}>{formatTime(time)}</div>
        </div>
      </Collapse>
    </div>
  )
}
