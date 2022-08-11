import styled from '@emotion/styled';
import { CompoSection } from '../products/CompoSection';
import { FileBreadcrumb } from '../products/FileBreadcrumb';
import { FileItem } from '../products/FileItem';
import { AudioApi, AudioFile, DirectoryTree, File } from '@/types/api';
import { useEffect, useState } from 'react';
import { AudioItem } from '../products/AudioItem';
import { getDirectoryAll, getDirectoryAudio } from '@/api';
import dirList2Tree from '@/utils/directory';
import path from 'path';

const Template = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;

  .file-item-list {
    padding: 16px 8px;
    overflow-y: scroll;
    height: 100%;
    display: flex;
    flex-flow: column;
    gap: 4px;
  }

  .audio-item-list {
    padding: 16px 8px;
    overflow-y: scroll;
    height: 100%;
    display: flex;
    flex-flow: column;
    gap: 4px;
  }
`;

export const Index: React.FC = () => {
  const [dirPath, setDirPath] = useState<string>('/');
  const [files, setFiles] = useState<File[]>([]);
  const [queues, setQueues] = useState<File[]>([]);
  const [dirTree, setDirTree] = useState<DirectoryTree[]>([]);
  const [dirs, setDirs] = useState<DirectoryTree[]>([]);

  useEffect(() => {
    getDirectoryAll().then((res) => {
      const dirTree = dirList2Tree(res.directories);
      setDirTree(dirTree);
      setFiles(dirTree);
    });
  }, []);

  useEffect(() => {}, [dirPath]);

  const addQueue = (newQueue: File) => {
    setQueues([...queues, newQueue]);
  };

  const moveDirectory = (dir: DirectoryTree) => {
    if (dir.id) {
      getDirectoryAudio(dir.id).then((res) => {
        const audioList: File[] = res.audio.map((audio: AudioApi) => {
          return {
            id: audio.id,
            path: audio.path,
            name: path.basename(audio.path),
            meta: { artist: audio.author, title: audio.title, duration: audio.duration },
            type: 'file',
          };
        });
        setFiles([...dir.children!, ...audioList]);
      });
    } else {
      setFiles([...dir.children!]);
    }
  };

  return (
    <Template>
      <CompoSection className="filer">
        <FileBreadcrumb dirs={dirs} moveDirectory={moveDirectory} />
        <div className="file-item-list">
          {files?.map((file) => (
            <FileItem className="mtl-4" key={file.path} audio={file} addQueue={addQueue} moveDirectory={moveDirectory} />
          ))}
        </div>
      </CompoSection>
      <CompoSection className="queue">
        <div className="audio-item-list">
          {queues.map((audio) => (
            <AudioItem className="mtl-4" key={audio.path} audio={audio as AudioFile} />
          ))}
        </div>
      </CompoSection>
      <CompoSection className="audio" />
    </Template>
  );
};
