export type DirectoryTree = {
  id: number;
  name: string;
  path: string;
  parentId: string | null;
  type: 'directory';
};

export type AudioFile = {
  id: string;
  path?: string;
  type: 'file';
  meta: {
    imageUrl?: string;
    artist?: string;
    title?: string;
    duration?: number;
  };
};

export type DirectoryApi = {
  id: number;
  name: string;
  path: string;
  perentId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AudioApi = {
  id: number;
  path: string;
  album: string;
  author: string;
  title: string;
  directory: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
};
