import { AudioFile } from '@/types/api';
import { createContext, Dispatch, SetStateAction } from 'react';

export type AudioState = {
  currentTime: number;
  loop: 'none' | 'one' | 'all';
  volume: number;
  speed: number;
  autoplay: boolean;
  isPlaying: boolean;
  canPlay: boolean;
  shouldUpdate: boolean;
};

export const AudioContext = createContext<{
  audio: AudioFile;
  audioState: AudioState;
  setAudioState: Dispatch<SetStateAction<AudioState>>;
  setAudio: Dispatch<SetStateAction<AudioFile>>;
}>({
  audio: {} as AudioFile,
  audioState: {
    currentTime: 0,
    loop: 'none',
    volume: 100,
    speed: 100,
    autoplay: true,
    isPlaying: false,
    canPlay: false,
    shouldUpdate: false,
  },
  setAudioState: () => {},
  setAudio: () => {},
});
