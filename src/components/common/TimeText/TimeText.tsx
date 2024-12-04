interface TimeTextProps {
  value: number;
  showMilliseconds?: boolean;
}

export default function TimeText({value}: TimeTextProps) {
  function formatTime(timeInSeconds: number) {
    const hours = Math.floor(timeInSeconds / 3600);
    timeInSeconds -= hours * 3600;
    const mins = Math.floor(timeInSeconds / 60);
    timeInSeconds -= mins * 60;
    const secs = timeInSeconds;

    let output = '';
    if (hours !== 0) {
      output += `${hours}:`.padStart(3, '0');
    }
    output += `${mins}:`.padStart(3, '0');
    output += `${secs}`.padStart(2, '0');

    return output;
  }

  return formatTime(value);
}
