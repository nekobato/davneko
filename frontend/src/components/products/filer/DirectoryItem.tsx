import styled from '@emotion/styled';
import { DirectoryTree } from '@/types/api';
import { MdFolder } from 'react-icons/md';

type Props = {
  directory: DirectoryTree;
  handleClick: (queue: DirectoryTree) => void;
  className: string;
};

export const DirectoryItem: React.FC<Props> = ({ directory, handleClick }) => (
  <Template onClick={() => handleClick(directory)}>
    <MdFolder className="nn-icon size-small" />
    <span className="name">{directory.name}</span>
  </Template>
);

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
    fill: rgba(0, 0, 0, 0.4);
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
