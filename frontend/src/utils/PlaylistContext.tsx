import { AudioFile } from '@/types/api';
import { createContext, Dispatch, SetStateAction } from 'react';

export const PlaylistContext = createContext<{
  playlist: AudioFile[];
  setPlaylist: Dispatch<SetStateAction<AudioFile[]>>;
  removePlaylist: (index: number) => void;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  currentIndex: number;
  addPlaylist: (newQueue: AudioFile[]) => void;
}>({
  playlist: [] as AudioFile[],
  addPlaylist: () => {},
  setPlaylist: () => {},
  removePlaylist: () => {},
  currentIndex: 0,
  setCurrentIndex: () => {},
});
