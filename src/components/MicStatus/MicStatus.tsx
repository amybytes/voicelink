import "./MicStatus.css";
import {useState, useEffect} from 'react';
import Collapse from "components/common/Collapse/Collapse";
import TimeText from "components/common/TimeText/TimeText";
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
  const {setupMic, startMicRecording, stopMicRecording} = useMic();
  
  const isActive = isListening || isRecording;

  useEffect(() => {
    if (isRecording) {
      setStatus(STATUS.RECORDING);
    }
    else if (isListening) {
      setStatus(STATUS.LISTENING);
    }
  }, [isListening, isRecording]);

  async function handleClick() {
    if (!isListening && !isRecording) {
      await setupMic()
        .then(() => {
          setIsListening(true);
        });
    }
    else if (isRecording) {
      setIsRecording(false);
      stopTimer();
      const recordingData = await stopMicRecording();
      console.log("final output", recordingData);
      // TODO: add to the queue to be uploaded to the server (after user confirmation)
    }
    else {
      setIsRecording(true);
      startTimer();
      startMicRecording();
    }
  }

  return (
    <div className="mic-status" onClick={handleClick}>
      <MicIcon className={isRecording ? "recording" : ""} width={40} height={40} />
      <Collapse show={isActive}>
        <div className="details">
          <div className="status">{status}</div>
          {!isRecording && <div className="record-msg">Click to record</div>}
          <div className="time" hidden={!isRecording}>
            <TimeText value={time} />
          </div>
        </div>
      </Collapse>
    </div>
  )
}
