import {useState, useContext, createContext} from 'react';
import {DEFAULT_HORIZONTAL_STEP, DEFAULT_MIN_PITCH_VOLUME} from 'constants/settings';

interface SettingsContextType {
  minPitchVolume: number,
  setMinPitchVolume: React.Dispatch<number>,
  horizontalStep: number,
  setHorizontalStep: React.Dispatch<number>,
};

interface SettingsContextProviderProps {
  children: React.ReactNode,
};

const SettingsContext = createContext<SettingsContextType>({
  minPitchVolume: DEFAULT_MIN_PITCH_VOLUME,
  setMinPitchVolume: () => {},
  horizontalStep: DEFAULT_HORIZONTAL_STEP,
  setHorizontalStep: () => {},
});

export function useSettingsContext() {
  return useContext(SettingsContext);
}

export default function SettingsContextProvider({children}: SettingsContextProviderProps) {
  const [minPitchVolume, setMinPitchVolume] = useState<number>(DEFAULT_MIN_PITCH_VOLUME);
  const [horizontalStep, setHorizontalStep] = useState<number>(DEFAULT_HORIZONTAL_STEP);

  return (
    <SettingsContext.Provider
      value={{
        minPitchVolume,
        setMinPitchVolume,
        horizontalStep,
        setHorizontalStep,
      }}>
      {children}
    </SettingsContext.Provider>
  );
}
