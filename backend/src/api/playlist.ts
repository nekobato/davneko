import express from 'express';
import { prisma } from '../models/db';

export const getPlaylistAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const playlists = await prisma.playlist.findMany();

  try {
    res.json({
      playlists,
    });
  } catch (error) {
    throw error;
  }
};

export const getPlaylistItems = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const playlistId = req.params.id;

  if (!playlistId) {
    res.status(400).send('Bad Request');
    return;
  }

  const playlistItems = await prisma.playlistItem.findMany({
    where: {
      playlistId: Number(playlistId),
    },
  });

  try {
    res.json({
      playlistItems,
    });
  } catch (error) {
    throw error;
  }
};

export const createPlaylist = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const name = req.body.name;

  if (!name) {
    res.status(400).send('Bad Request');
    return;
  }

  const playlist = await prisma.playlist.create({
    data: {
      name,
    },
  });

  try {
    res.json({
      playlist,
    });
  } catch (error) {
    throw error;
  }
};

export const createPlaylistItem = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const playlistId = req.body.playlistId;
  const audioId = req.body.audioId;

  if (!playlistId || !audioId) {
    res.status(400).send('Bad Request');
    return;
  }

  const playlistItem = await prisma.playlistItem.create({
    data: {
      playlistId,
      audioId,
    },
  });

  try {
    res.json({
      playlistItem,
    });
  } catch (error) {
    throw error;
  }
};

// SQLite does't support createMany
export const createPlaylistItems = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const playlistId = req.body.playlistId as number;
  const audioIds = req.body.audioIds as string[];

  if (!playlistId || !audioIds) {
    res.status(400).send('Bad Request');
    return;
  }

  const playlistItems = Promise.all(
    audioIds.map(audioId => {
      return prisma.playlistItem.create({
        data: {
          playlistId,
          audioId,
        },
      });
    })
  );

  try {
    res.json({
      playlistItems,
    });
  } catch (error) {
    throw error;
  }
};

export const deletePlaylist = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const playlistId = req.params.id;

  if (!playlistId) {
    res.status(400).send('Bad Request');
    return;
  }

  const playlist = await prisma.playlist.delete({
    where: {
      id: Number(playlistId),
    },
  });

  try {
    res.json({
      playlist,
    });
  } catch (error) {
    throw error;
  }
};

export const deletePlaylistItem = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const playlistItemId = req.params.id;

  if (!playlistItemId) {
    res.status(400).send('Bad Request');
    return;
  }

  const playlistItem = await prisma.playlistItem.delete({
    where: {
      id: Number(playlistItemId),
    },
  });

  try {
    res.json({
      playlistItem,
    });
  } catch (error) {
    throw error;
  }
};

export const updatePlaylist = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const playlistId = req.params.id;
  const name = req.body.name;

  if (!playlistId || !name) {
    res.status(400).send('Bad Request');
    return;
  }

  const playlist = await prisma.playlist.update({
    where: {
      id: Number(playlistId),
    },
    data: {
      name,
    },
  });

  try {
    res.json({
      playlist,
    });
  } catch (error) {
    throw error;
  }
};
