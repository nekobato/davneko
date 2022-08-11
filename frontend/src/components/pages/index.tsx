import styled from '@emotion/styled';
import { CompoSection } from '../products/CompoSection';
import { FileBreadcrumb } from '../products/FileBreadcrumb';
import { FileItem } from '../products/filer/FileItem';
import { AudioApi, AudioFile, DirectoryApi, DirectoryTree } from '@/types/api';
import { useContext, useEffect, useState } from 'react';
import { AudioItem } from '../products/AudioItem';
import { getDirectories, getDirectoryAudio, getRootDirectories } from '@/api';
import path from 'path';
import { Player } from '../products/player';
import { PlaylistContext } from '@/utils/PlaylistContext';
import { AudioContext } from '@/utils/AudioContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DirectoryItem } from '../products/filer/DirectoryItem';

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
    > .draggable-item {
      display: block;
    }
  }
`;

export const Index: React.FC = () => {
  const playlistContext = useContext(PlaylistContext);
  const audioContext = useContext(AudioContext);

  const [files, setFiles] = useState<AudioFile[]>([]);
  const [dirs, setDirs] = useState<DirectoryTree[]>([]);
  const [depth, setDepth] = useState<DirectoryTree[]>([
    {
      id: 0,
      name: '/',
      path: '/',
      parentId: null,
      type: 'directory',
    },
  ]);

  const getCurrentPath = () => {
    return depth.map((dir) => dir.name).join('/');
  };

  useEffect(() => {
    getRootDirectories().then((res) => {
      setDirs(
        res.directories.map((directory: DirectoryApi) => {
          return { ...directory, path: '/', type: 'directory' };
        })
      );
    });
  }, []);

  const moveDirectory = (dir: DirectoryTree) => {
    // find dir in depth
    if (depth.find((d) => d.id === dir.id)) {
      const newDepth = depth.slice(0, depth.findIndex((d) => d.id === dir.id) + 1);
      setDepth(newDepth);
    } else {
      setDepth((prev) => [...prev, dir]);
    }

    const dirPath = path.join(getCurrentPath(), dir.name);

    getDirectories(dir.id).then((res) => {
      setDirs(
        res.directories.map((directory: DirectoryApi) => {
          return { ...directory, path: path.join(dirPath, directory.name), type: 'directory' };
        })
      );
    });

    getDirectoryAudio(dir.id).then((res) => {
      const audioList: AudioFile[] = res.audios.map((audio: AudioApi) => {
        return {
          id: audio.id,
          title: audio.title,
          path: audio.path,
          meta: { artist: audio.author, title: audio.title, duration: audio.duration },
          type: 'file',
        };
      });
      setFiles([...audioList]);
    });
  };

  return (
    <Template>
      <CompoSection className="filer">
        <FileBreadcrumb dirs={depth} moveDirectory={moveDirectory} />
        <div className="file-item-list">
          {dirs.map((dir) => (
            <DirectoryItem className="mtl-4" key={dir.name} directory={dir} handleClick={moveDirectory} />
          ))}
          {files?.map((file) => (
            <FileItem
              className="mtl-4"
              key={file.path}
              audio={file}
              addPlaylist={() => {
                playlistContext.addPlaylist([file]);
              }}
            />
          ))}
        </div>
      </CompoSection>
      <CompoSection className="queue">
        {playlistContext.playlist.length > 0 && (
          <DragDropContext
            onDragEnd={(result) => {
              if (!result.destination) {
                return;
              }

              const reorderedPlaylist = Array.from(playlistContext.playlist);
              const [removed] = reorderedPlaylist.splice(result.source.index, 1);
              reorderedPlaylist.splice(result.destination.index, 0, removed);
              playlistContext.setPlaylist(reorderedPlaylist);
            }}
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  className="audio-item-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  // style={getListStyle(snapshot.isDraggingOver)}
                >
                  {playlistContext.playlist.map((audio, index) => (
                    <Draggable key={audio.id + String(index)} draggableId={audio.id + String(index)} index={index}>
                      {(provided, snapshot) => (
                        <div
                          className="droppable-item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                        >
                          <AudioItem
                            className="mtl-4"
                            index={index}
                            audio={audio as AudioFile}
                            handleClick={() => {
                              audioContext.setAudio(audio);
                              playlistContext.setCurrentIndex(index);
                            }}
                            handleClickClose={() => {
                              playlistContext.removePlaylist(index);
                            }}
                            isActive={index === playlistContext.currentIndex}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </CompoSection>
      <CompoSection className="audio">
        <Player
          audio={audioContext.audio}
          state={audioContext.audioState}
          handleSkipNext={() => {
            if (playlistContext.playlist.length > 0 && playlistContext.currentIndex < playlistContext.playlist.length - 1) {
              playlistContext.setCurrentIndex(playlistContext.currentIndex + 1);
            } else if (audioContext.audioState.loop === 'all') {
              playlistContext.setCurrentIndex(playlistContext.playlist.length - 1);
            }
          }}
          handleSkipPrevious={() => {
            if (playlistContext.currentIndex > 0) {
              playlistContext.setCurrentIndex(playlistContext.currentIndex - 1);
            } else if (audioContext.audioState.loop === 'all') {
              playlistContext.setCurrentIndex(0);
            }
          }}
          canSkipNext={
            playlistContext.playlist.length > 1 &&
            (playlistContext.currentIndex < playlistContext.playlist.length - 1 || audioContext.audioState.loop === 'all')
          }
          canSkipPrevious={
            playlistContext.playlist.length > 1 && (playlistContext.currentIndex > 0 || audioContext.audioState.loop === 'all')
          }
        />
      </CompoSection>
    </Template>
  );
};
