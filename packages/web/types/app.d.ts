export type Track = {
  id: string;
  title: string;
  duration: number;
  url: string;
  thumbnailUrl: string;
  artist: {
    id: string;
    name: string;
  };
  album: {
    id: string;
    title: string;
  };
};
