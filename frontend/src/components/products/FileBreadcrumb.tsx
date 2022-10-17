import { DirectoryTree } from '@/types/api';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Template = styled.div`
  width: 100%;
  margin: 0;
  ul {
    width: 100%;
    display: flex;
    gap: 6px;
    margin: 0;
    padding: 0 4px;
    height: 40px;
    align-items: center;
    > li {
      display: contents;
      padding: 0;
      margin: 0;

      > .breadcrumb {
        display: inline-flex;
        text-decoration: none;
        width: 24px;
        height: 30px;
        border-radius: 8px;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
  .name {
    font-size: 12px;
    line-height: 16px;
    height: 32px;
    font-weight: bold;
    display: block;
    width: 100%;
    padding: 0 2px;
    color: rgba(255, 255, 255, 0.8);
  }
`;

type Props = {
  dirs: DirectoryTree[];
  moveDirectory: (dir: DirectoryTree) => void;
};

export const FileBreadcrumb: React.FC<Props> = ({ dirs, moveDirectory }) => {
  const [selectedDirIndex, setSelectedDirIndex] = useState(dirs.length - 1);

  useEffect(() => {
    setSelectedDirIndex(dirs.length - 1);
  }, [dirs]);

  return (
    <Template>
      <ul>
        {dirs.map((dir, index) => (
          <li key={dir.id}>
            <button
              className="breadcrumb"
              onClick={() => moveDirectory(dir)}
              onMouseEnter={() => {
                setSelectedDirIndex(index);
              }}
              onMouseLeave={() => {
                setSelectedDirIndex(dirs.length - 1);
              }}
            />
          </li>
        ))}
      </ul>
      <span className="name">{dirs[selectedDirIndex].name}</span>
    </Template>
  );
};
