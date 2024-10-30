import {useState, useRef} from 'react';

export default function useTimer() {
  const [time, setTime] = useState<number>(0);
  const isActive = useRef<boolean>(false);
  const timerId = useRef<number | null>(null);

  function startTimer() {
    setTime(0);
    isActive.current = true;
    timerId.current = setInterval(() => {
      if (isActive.current) {
        setTime((currTime) => currTime + 1);
      }
      else if (timerId.current) {
        clearInterval(timerId.current);
        timerId.current = null;
      }
    }, 1000);
  }

  function stopTimer() {
    isActive.current = false;
  }

  return {time, startTimer, stopTimer};
}
