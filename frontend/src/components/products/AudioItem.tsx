import { AudioFile } from '@/types/api';
import styled from '@emotion/styled';
import { MdClose, MdDragHandle } from 'react-icons/md';
import clsx from 'clsx';

const Template = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  &.active {
    background: rgba(255, 255, 255, 0.8);
  }
  figure,
  picture,
  img {
    width: 40px;
    height: 40px;
  }
  picture {
    display: inline-flex;
    img {
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
    }
  }
  .text-container {
    margin-left: 16px;
    line-height: 20px;
    .artist,
    .title {
      display: block;
      line-height: 20px;
    }
    .artist {
    }
    .title {
      font-weight: bold;
    }
    .nn-icon {
      fill: rgba(0, 0, 0, 0.4);
    }
  }

  &:hover > .overlay {
    visibility: visible;
  }
`;

const $Overlay = styled.div`
  visibility: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  > button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border: 0;
    gap: 4px;
    background: transparent;
    &.close {
      width: 32px;
      cursor: pointer;
    }
    &.handle {
      width: 24px;
      cursor: grab;
    }
  }
`;

type Props = {
  index: number;
  audio: AudioFile;
  handleClick: () => void;
  handleClickClose: () => void;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  isActive?: boolean;
};

export const AudioItem: React.FC<Props> = ({ audio, handleClick, handleClickClose, isActive }) => {
  return (
    <Template onClick={handleClick} className={clsx({ active: isActive })}>
      <figure>
        <picture>
          <img alt="サムネイル" src={audio.meta.imageUrl || ''} />
        </picture>
      </figure>
      <div className="text-container">
        <span className="artist">{audio.meta.artist}</span>
        <span className="title">{audio.meta.title}</span>
      </div>
      <$Overlay className="overlay">
        <button className="close" onClick={handleClickClose}>
          <MdClose className="nn-icon" />
        </button>
        <button className="handle">
          <MdDragHandle className="nn-icon" />
        </button>
      </$Overlay>
    </Template>
  );
};
