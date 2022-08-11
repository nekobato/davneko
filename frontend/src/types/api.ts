export type DirectoryTree = {
  id?: number;
  path: string;
  name: string;
  type: 'directory';
  children?: DirectoryTree[];
};

export type AudioFile = {
  id: number;
  path: string;
  name: string;
  type: 'file';
  meta: {
    imageUrl?: string;
    artist?: string;
    title?: string;
  };
};

export type File = AudioFile | DirectoryTree;

export type DirectoryApi = {
  id: number;
  path: string;
  created: string;
  updated: string;
};

export type AudioApi = {
  id: number;
  path: string;
  album: string;
  author: string;
  title: string;
  directory: number;
  duration: number;
  created: string;
  updated: string;
};
