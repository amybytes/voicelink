import {useState, useContext, createContext} from 'react';

const DEFAULT_LISTENING_STATE = false;
const DEFAULT_RECORDING_STATE = false;

interface AudioComponents {
  stream: MediaStream;
  context: AudioContext;
  source: MediaStreamAudioSourceNode;
  analyzer: AnalyserNode;
  recorder: AudioWorkletNode;
  data: Float32Array;
}

interface MicContextType {
  audioComponents: AudioComponents | null;
  setAudioComponents: React.Dispatch<AudioComponents | null>;
  isListening: boolean;
  setIsListening: React.Dispatch<boolean>;
  isRecording: boolean;
  setIsRecording: React.Dispatch<boolean>;
}

interface MicContextProviderProps {
  children: React.ReactNode;
}

const MicContext = createContext<MicContextType>({
  audioComponents: null,
  setAudioComponents: () => {},
  isListening: DEFAULT_LISTENING_STATE,
  setIsListening: () => {},
  isRecording: DEFAULT_RECORDING_STATE,
  setIsRecording: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export function useMicContext() {
  return useContext(MicContext);
}

export default function MicContextProvider({children}: MicContextProviderProps) {
  const [audioComponents, setAudioComponents] = useState<AudioComponents | null>(null);
  const [isListening, setIsListening] = useState<boolean>(DEFAULT_LISTENING_STATE);
  const [isRecording, setIsRecording] = useState<boolean>(DEFAULT_RECORDING_STATE);

  return (
    <MicContext.Provider
      value={{
        audioComponents,
        setAudioComponents,
        isListening,
        setIsListening,
        isRecording,
        setIsRecording,
      }}>
      {children}
    </MicContext.Provider>
  );
}
