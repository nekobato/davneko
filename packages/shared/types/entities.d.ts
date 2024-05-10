export type User = {
  id: string;
  name: string;
};

export type Audio = {
  id: string;
  title: string;
  filePath: string;
  imagePath?: string;
  duration: number;
};

export type AudioDetail = Audio & {
  artists: Artist[];
  album: Album;
  directory: Directory;
};

export type Artist = {
  id: string;
  name: string;
};

export type ArtistDetail = Artist & {
  audio: AudioDetail[];
  albums: Album[];
};

export type Album = {
  id: string;
  name: string;
  imagePath?: string;
};

export type AlbumDetail = Album & {
  artists: Artist[];
  audio: AudioDetail[];
};

export type Directory = {
  id: string;
  name: string;
  path: string;
};

export type DirectoryDetail = Directory & {
  audio: AudioDetail[];
};
