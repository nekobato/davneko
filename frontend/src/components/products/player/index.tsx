import { AudioFile } from '@/types/api';
import styled from '@emotion/styled';
import { SyntheticEvent, useContext, useEffect, useRef } from 'react';
import { AudioContext, AudioState } from '@/utils/AudioContext';
import { baseApiUrl } from '@/api';
import { Gauge } from './Gauge';
import { MdSkipPrevious, MdSkipNext, MdPlayArrow, MdPause } from 'react-icons/md';

const Template = styled.div`
margin-top: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 8px;
  gap: 2px 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  align-items: center;
  justify-content: flex-start;
  .nn-icon {
    flex-shrink: 0;
  }
  .name {
    margin-left: 4px;
    display: inline-flex;
    line-height: 20px;
    max-height: 40px;
    overflow: hidden;
    text-align: left;
  }
`;

const $Controller = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

const $ControllerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  cursor: pointer;
  &:hover {
    filter: opacity(80%) brightness(150%);
  }
  > .icon {
    width: 24px;
    height: 24px;
  }
  &:disabled {
    filter: opacity(50%);
  }
`;

type Props = {
  audio: AudioFile;
  audioRef: React.RefObject<HTMLAudioElement>;
  state: AudioState;
  handleSkipPrevious: () => void;
  handleSkipNext: () => void;
  canSkipPrevious: boolean;
  canSkipNext: boolean;
};

export const Player: React.FC<Props> = ({ audio, audioRef, state, handleSkipNext, handleSkipPrevious, canSkipPrevious, canSkipNext }) => {
  const { audioState, setAudioState } = useContext(AudioContext);

  const onAudioTimeUpdate = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    setAudioState((audioState) => {
      return { ...audioState, currentTime: audioRef.current!.currentTime || 0 };
    });
  };
  const onAudioPlay = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    setAudioState((audioState) => {
      return { ...audioState, isPlaying: true };
    });
  };
  const onAudioPause = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    setAudioState((audioState) => {
      return { ...audioState, isPlaying: false };
    });
  };
  const onAudioCanPlay = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    setAudioState((audioState) => {
      return { ...audioState, canPlay: true };
    });
  };
  const onAudioEnded = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    // Restart audio
    if (state.loop) {
      (e.target as HTMLAudioElement).play();
    }
  };
  const onLoadedMetaData = (e: SyntheticEvent<HTMLAudioElement, Event>) => {};
  const onVolumeChange = (e: SyntheticEvent<HTMLAudioElement, Event>) => {};
  const playOrPause = () => {
    if (audioState.isPlaying) {
      audioRef.current!.pause();
    } else {
      audioRef.current!.play();
    }
  };

  useEffect(() => {
    if (audioRef.current && audioState.shouldUpdate) {
      audioRef.current.currentTime = audioState.currentTime;
      setAudioState((audioState) => {
        return { ...audioState, shouldUpdate: false };
      });
    }
  }, [audioState.shouldUpdate]);

  return (
    <Template>
      <audio
        onTimeUpdate={onAudioTimeUpdate}
        onPlay={onAudioPlay}
        onPause={onAudioPause}
        onCanPlay={onAudioCanPlay}
        onEnded={onAudioEnded}
        onLoadedMetadata={onLoadedMetaData}
        onVolumeChange={onVolumeChange}
        autoPlay={audioState.autoplay}
        ref={audioRef}
        key={audio?.id}
        crossOrigin="anonymous"
      >
        <source src={audio?.id ? `${baseApiUrl}/audio/${audio.id}` : ''} />
      </audio>
      <Gauge
        onSeek={(progress: number) => {
          if (!audioRef.current) return;
          audioRef.current.currentTime = audioRef.current.duration * progress;
        }}
        progress={(audioState.currentTime / (audioRef.current?.duration || 0)) * 100}
      />
      <$Controller>
        <$ControllerButton className="previous" onClick={handleSkipPrevious} disabled={!canSkipPrevious}>
          <MdSkipPrevious width={24} height={24} className="icon" />
        </$ControllerButton>
        <$ControllerButton className="play-pause" onClick={playOrPause}>
          {audioState.isPlaying ? (
            <MdPause width={24} height={24} className="icon" />
          ) : (
            <MdPlayArrow width={24} height={24} className="icon" />
          )}
        </$ControllerButton>
        <$ControllerButton className="next" onClick={handleSkipNext} disabled={!canSkipNext}>
          <MdSkipNext width={24} height={24} className="icon" />
        </$ControllerButton>
      </$Controller>
    </Template>
  );
};
