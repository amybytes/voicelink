import {useState, useContext, createContext} from 'react';

const DEFAULT_LISTENING_STATE = false;
const DEFAULT_RECORDING_STATE = false;

interface MicStatusContextType {
  isListening: boolean,
  setIsListening: React.Dispatch<boolean>,
  isRecording: boolean,
  setIsRecording: React.Dispatch<boolean>
};

interface MicStatusContextProviderProps {
  children: React.ReactNode,
};

const MicStatusContext = createContext<MicStatusContextType>({
  isListening: DEFAULT_LISTENING_STATE,
  setIsListening: () => {},
  isRecording: DEFAULT_RECORDING_STATE,
  setIsRecording: () => {},
});

export function useMicStatusContext() {
  return useContext(MicStatusContext);
}

export default function MicStatusContextProvider({children}: MicStatusContextProviderProps) {
  const [isListening, setIsListening] = useState<boolean>(DEFAULT_LISTENING_STATE);
  const [isRecording, setIsRecording] = useState<boolean>(DEFAULT_RECORDING_STATE);

  return (
    <MicStatusContext.Provider
      value={{
        isListening,
        setIsListening,
        isRecording,
        setIsRecording,
      }}>
      {children}
    </MicStatusContext.Provider>
  );
}
