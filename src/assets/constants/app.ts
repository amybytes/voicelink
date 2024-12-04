import PitchSettings from 'components/sidebar/PitchSettings/PitchSettings';
import RecordingsSettings from 'components/sidebar/RecordingsSettings/RecordingsSettings';

export const APP_NAME: string = 'VoiceLink';
export const GITHUB_PROJECT_URL: string = 'https://github.com/amybytes/voicelink';

interface Page {
  path: string;
  Settings: React.FunctionComponent;
}

export const PAGES: Record<string, Page> = {
  PITCH_MONITOR: {
    path: '/pitch',
    Settings: PitchSettings,
  },
  RECORDINGS: {
    path: '/recordings',
    Settings: RecordingsSettings,
  },
};

export const PAGE_PATHS: Record<string, Page> = {
  '/pitch': PAGES.PITCH_MONITOR,
  '/recordings': PAGES.RECORDINGS,
};
