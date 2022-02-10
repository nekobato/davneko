import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import { IconPause } from '../commons/icons/IconPause'
import { IconPlayArrow } from '../commons/icons/IconPlayArrow'
import { IconSkipNext } from '../commons/icons/IconSkipNext'
import { IconSkipPrevious } from '../commons/icons/IconSkipPrevious'

const Player = styled.div`
  display: grid;
  grid-template-rows: 36px 1fr;
  padding: 8px;
  height: 96px;
  border: 1px solid #ddd;
  border-radius: 16px;
  .progress-bar {
    position: relative;
    width: 100%;
    height: 32px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }
  .progress-bar-inner {
    width: 0;
    height: 100%;
    background: #ddd;
    transition: width 0.16s ease;
  }
  .controller {
    display: flex;
    place-content: center;
    & > button {
      display: inline-flex;
      margin: 0 8px;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
    }
    .icon {
      width: 40px;
      height: 40px;
      fill: #222;
    }
  }
`

type Props = {
  audio: any
}

type AudioState = {
  isPlaying: boolean
  currentTime: number
  duration: number
}

export const Audio: React.FC<Props> = ({ audio }) => {
  const audioEl = useRef<HTMLAudioElement>(null)

  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0
  })

  const playOrPause = () => {
    if (audioState.isPlaying) {
      audioEl.current?.play();
      setAudioState({ ...audioState, isPlaying: true })
    } else {
      audioEl.current?.pause();
      setAudioState({ ...audioState, isPlaying: false })
    }
  }

  const next = () => {
    // this.$store.commit(rootTypes.AUDIO_NEXT);
    // this.$store.commit(rootTypes.AUDIO_TIMEUPDATE, 0);
  }
  const prev = () => {
    // this.$store.commit(rootTypes.AUDIO_PREV);
    // this.$store.commit(rootTypes.AUDIO_TIMEUPDATE, 0);
  }
  const changeVolume = () => {}
  const seek = (e: React.MouseEvent) => {
    // this.$store.commit(
    //   rootTypes.AUDIO_SEEK,
    //   duration *
    //     (e.offsetX / (this.$refs.seekbar as HTMLDivElement).offsetWidth)
    // );
  }
  const onCanPlay = () => {}
  const onPlay = () => {
    audioState.isPlaying = true
  }
  const onPause = () => {
    audioState.isPlaying = false
  }
  const onEnded = () => {
    // this.$store.commit(rootTypes.AUDIO_END);
  }
  const onTimeUpdate = (e: any) => {
    audioState.currentTime = e.target.currentTime
    // this.$store.commit(rootTypes.AUDIO_TIMEUPDATE, e.target.currentTime);
  }
  const onLoadedMetaData = (e: any) => {
    audioState.duration = e.target.duration
    // this.$store.commit(rootTypes.AUDIO_LOADED, { duration: e.target.duration });
    ;(this as any).analyzeAudio()
  }
  const onVolumeChange = () => {}

  const progressStyle = {
    width:
      ((audioState.currentTime / audioState.duration) * 100).toString() + '%'
  }

  useEffect(() => {
    setAudioState({ ...audioState, currentTime: audioEl.current!.currentTime })
  }, [audioEl.current?.currentTime])

  return (
    <Player>
      <audio
        src={audio.item.path ? '/api/audio/file?path=' + audio.item.path : ''}
        onCanPlay={onCanPlay}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetaData}
        onVolumeChange={onVolumeChange}
        autoPlay
        ref={audioEl}
      />
      <div className="progress-bar" onClick={seek}>
        <div className="progress-bar-inner" style={progressStyle} />
      </div>
      <div className="controller">
        <button className="previous">
          <IconSkipPrevious className="icon" />
        </button>
        <button className="play-pause" onClick={playOrPause}>
          {audioState.isPlaying ? (
            <IconPause className="icon" />
          ) : (
            <IconPlayArrow className="icon" />
          )}
        </button>
        <button className="next">
          <IconSkipNext className="icon" />
        </button>
      </div>
    </Player>
  )
}
