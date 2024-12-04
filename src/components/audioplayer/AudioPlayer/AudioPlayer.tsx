import './AudioPlayer.css';
import {useState, useEffect, useRef, useCallback} from 'react';
import IconButton from 'components/common/IconButton/IconButton';
import PlayIcon from 'icons/play.svg?react';
import PauseIcon from 'icons/pause.svg?react';
import SeekBar from 'components/common/SeekBar/SeekBar';
import TimeText from 'src/components/common/TimeText/TimeText';

interface AudioPlayerProps {
  audioUrl: string;
}

const DEFAULT_MIME_TYPE = 'audio/wav';
const INITIAL_TIME_VALUE = 0;

export default function AudioPlayer({audioUrl}: AudioPlayerProps) {
  const [timeValue, setTimeValue] = useState<number>(INITIAL_TIME_VALUE);
  const [isAudioReady, setIsAudioReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audio = audioRef.current;

  const audioDurationMs = audio?.duration ? Math.floor(audio.duration * 1000) : 0;
  const currentTimeMs = audio?.currentTime ? Math.floor(audio.currentTime * 1000) : 0;
  const remainingTimeMs = audioDurationMs - currentTimeMs;
  const remainingTimeSecs = Math.floor(remainingTimeMs / 1000);

  function handleClickPlayPause() {
    if (isPlaying) {
      audio?.pause();
    } else {
      audio?.play();
    }
  }

  function handlePlay() {
    setIsPlaying(true);
  }

  function handlePause() {
    setIsPlaying(false);
  }

  function handleSeek(newValue: number) {
    if (audio) {
      audio.currentTime = newValue / 1000;
    }
  }

  function handleTimeUpdate() {
    if (audio) {
      setTimeValue(audio.currentTime * 1000);
    }
  }

  const resetPlayer = useCallback(() => {
    setTimeValue(INITIAL_TIME_VALUE);
    setIsPlaying(false);
    if (audio) {
      audio.load();
    }
  }, [audio]);

  useEffect(() => {
    resetPlayer();
  }, [audioUrl, isAudioReady, resetPlayer]);

  return (
    <div className="audio-player">
      <audio
        ref={(node) => {
          audioRef.current = node;
          setIsAudioReady(true);
        }}
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}>
        <source src={audioUrl} type={DEFAULT_MIME_TYPE} />
      </audio>
      <IconButton
        className="play-pause-button"
        Icon={isPlaying ? PauseIcon : PlayIcon}
        onClick={handleClickPlayPause}
        showBackgroundOnHover
      />
      <SeekBar min={0} max={audioDurationMs} value={timeValue} onChange={handleSeek} />
      <div className="remaining-time">
        <TimeText value={remainingTimeSecs} />
      </div>
    </div>
  );
}
