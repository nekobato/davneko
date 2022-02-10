import styled from '@emotion/styled'
import { IconAudiotrack } from '@/components/commons/icons/IconAudiotrack'
import { IconFolder } from '@/components/commons/icons/IconFolder'
import { DirectoryTree, File } from '@/types/api'
import { dir } from 'console'

type Props = {
  audio: File
  addQueue: (queue: File) => void
  moveDirectory: (queue: DirectoryTree) => void
  className: string
}

// TODO: フォルダをクリックしたときはaddQueueではなくmoveDirectory
export const FileItem: React.FC<Props> = ({
  audio,
  addQueue,
  moveDirectory
}) => (
  <Template
    onClick={() =>
      audio.type === 'file' ? addQueue(audio) : moveDirectory(audio)
    }
  >
    {audio.type === 'file' ? (
      <IconAudiotrack className="nn-icon size-small" />
    ) : (
      <IconFolder className="nn-icon size-small" />
    )}
    <span className="name">{audio.name}</span>
  </Template>
)

const Template = styled.button`
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
  }
  .name {
    margin-left: 4px;
    display: inline-flex;
    line-height: 20px;
    max-height: 40px;
    overflow: hidden;
    text-align: left;
  }
`
