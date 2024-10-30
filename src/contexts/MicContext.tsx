import {useState, useContext, createContext} from 'react';

const DEFAULT_LISTENING_STATE = false;
const DEFAULT_RECORDING_STATE = false;

interface MicContextType {
  stream: MediaStream | null,
  setStream: React.Dispatch<MediaStream | null>,
  isListening: boolean,
  setIsListening: React.Dispatch<boolean>,
  isRecording: boolean,
  setIsRecording: React.Dispatch<boolean>
};

interface MicContextProviderProps {
  children: React.ReactNode,
};

const MicContext = createContext<MicContextType>({
  stream: null,
  setStream: () => {},
  isListening: DEFAULT_LISTENING_STATE,
  setIsListening: () => {},
  isRecording: DEFAULT_RECORDING_STATE,
  setIsRecording: () => {},
});

export function useMicContext() {
  return useContext(MicContext);
}

export default function MicContextProvider({children}: MicContextProviderProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isListening, setIsListening] = useState<boolean>(DEFAULT_LISTENING_STATE);
  const [isRecording, setIsRecording] = useState<boolean>(DEFAULT_RECORDING_STATE);

  return (
    <MicContext.Provider
      value={{
        stream,
        setStream,
        isListening,
        setIsListening,
        isRecording,
        setIsRecording,
      }}>
      {children}
    </MicContext.Provider>
  );
}
