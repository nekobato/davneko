import styled from '@emotion/styled';
import { AudioFile } from '@/types/api';
import { MdAudiotrack } from 'react-icons/md';
import { duration2TimeString } from '@/utils/audio';

const Template = styled.button`
  position: relative;
  display: flex;
  width: 100%;
  padding: 4px 8px;
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
  cursor: pointer;
  &:hover {
    filter: opacity(80%) brightness(150%);
  }
  .nn-icon {
    flex-shrink: 0;
    fill: rgba(0, 0, 0, 0.4);
  }
  .name {
    margin-left: 4px;
    display: inline-flex;
    line-height: 20px;
    max-height: 40px;
    overflow: hidden;
    text-align: left;
    padding-right: 40px;
  }
  .duration {
    position: absolute;
    right: 8px;
  }
`;

type Props = {
  audio: AudioFile;
  addPlaylist: (queue: AudioFile) => void;
  className: string;
};

export const FileItem: React.FC<Props> = ({ audio, addPlaylist }) => (
  <Template onClick={() => addPlaylist(audio)}>
    {<MdAudiotrack className="nn-icon size-small" />}
    <span className="name">{audio.meta.title}</span>
    <span className="duration">{duration2TimeString(audio.meta.duration)}</span>
  </Template>
);
