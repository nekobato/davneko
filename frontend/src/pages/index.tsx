import { Index } from '@/components/pages';
import type { NextPage } from 'next';
import { AudioState, AudioContext } from '@/utils/AudioContext';
import { useState } from 'react';
import { AudioFile } from '@/types/api';
import { PlaylistContext } from '@/utils/PlaylistContext';

const Home: NextPage = () => {
  const [audio, setAudio] = useState<AudioFile>({} as AudioFile);
  const [audioState, setAudioState] = useState<AudioState>({
    currentTime: 0,
    loop: 'none',
    volume: 100,
    speed: 100,
    autoplay: true,
    isPlaying: false,
    canPlay: false,
    shouldUpdate: false,
  });
  const [playlist, setPlaylist] = useState<AudioFile[]>([] as AudioFile[]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const addPlaylist = (newQueue: AudioFile[]) => {
    setPlaylist((prev) => [...prev, ...newQueue]);
  };
  const removePlaylist = (index: number) => {
    setPlaylist((prev) => {
      const newPlaylist = [...prev];
      newPlaylist.splice(index, 1);
      return newPlaylist;
    });
  };
  return (
    <AudioContext.Provider
      value={{
        audio,
        setAudio: (audio) => {
          setAudio(audio);
          setAudioState((audioState) => {
            return { ...audioState, currentTime: 0, isPlaying: audioState.autoplay, shouldUpdate: true };
          });
        },
        audioState,
        setAudioState,
      }}
    >
      <PlaylistContext.Provider value={{ playlist, addPlaylist, setPlaylist, removePlaylist, currentIndex, setCurrentIndex }}>
        <Index />
      </PlaylistContext.Provider>
    </AudioContext.Provider>
  );
};

export default Home;
