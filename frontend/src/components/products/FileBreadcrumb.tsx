import { DirectoryTree } from '@/types/api';
import styled from '@emotion/styled';

const Template = styled.ul`
  display: flex;
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: block;
  line-height: 20px;
  font-weight: bold;
  padding: 2px 4px;
  > li {
    display: inline-flex;
    border-left: 2px solid rgba(255, 255, 255, 0.3);
    &:first-of-type {
      border-left: none;
    }
    > .name {
      display: inline-flex;
      color: #333;
      text-decoration: none;
      font-size: 14px;
      line-height: 20px;
      padding: 2px 8px;
      border: none;
      background: transparent;
      cursor: pointer;
    }
  }
`;

type Props = {
  dirs: DirectoryTree[];
  moveDirectory: (dir: DirectoryTree) => void;
};

export const FileBreadcrumb: React.FC<Props> = ({ dirs, moveDirectory }) => (
  <Template>
    {dirs.map(dir => (
      <li key={dir.path}>
        <button className="name" onClick={() => moveDirectory(dir)}>
          {dir.name}
        </button>
      </li>
    ))}
  </Template>
);
