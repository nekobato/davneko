import { prisma } from './db';

export const searchAudioByTitle = (title: string) => {
  return prisma.audio.findMany({
    where: {
      title: {
        contains: title,
      },
    },
  });
};

export const searchAudioByAuthor = (author: string) => {
  return prisma.audio.findMany({
    where: {
      author: {
        contains: author,
      },
    },
  });
};

export const searchAudioByAlbum = (album: string) => {
  return prisma.audio.findMany({
    where: {
      album: {
        contains: album,
      },
    },
  });
};

export const getAudioByDirecotryId = (directoryId: number) => {
  return prisma.audio.findMany({
    where: {
      directoryId,
    },
  });
};
