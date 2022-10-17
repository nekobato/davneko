import styled from '@emotion/styled';
import { AudioFile } from '@/types/api';
import { MdPlaylistAdd } from 'react-icons/md';
import { useContext } from 'react';
import { PlaylistContext } from '@/utils/PlaylistContext';

const Button = styled.button`
  display: inline-flex;
  width: 40px;
  height: 32px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    filter: opacity(80%) brightness(150%);
  }
  .nn-icon {
    flex-shrink: 0;
    fill: rgba(0, 0, 0, 0.4);
  }
`;

type Props = {
  audioList: AudioFile[];
  className?: string;
};

export const AddAll2PlaylistButton: React.FC<Props> = ({ audioList, className }) => {
  const playlistContext = useContext(PlaylistContext);
  return (
    <Button
      onClick={() => {
        playlistContext.setPlaylist(audioList);
      }}
      aria-label="Add all to playlist"
      className={className}
    >
      <MdPlaylistAdd className="nn-icon size-medium" />
    </Button>
  );
};
