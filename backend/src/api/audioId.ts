import express from 'express';
import path from 'path';
import { prisma } from '../models/db';

const audioBaseDir = process.env.AUDIO_BASE_DIR || '.';

export const index = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).send('Bad Request');
      return;
    }

    const audio = await prisma.audio.findFirst({
      where: {
        id,
      },
    });

    if (!audio) {
      res.status(404).send('Not Found');
      return;
    }

    console.log(audio);

    res.sendFile(
      path.join(audioBaseDir, audio.path),
      {
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true,
          'Cache-Control': ['private', 'no-store', 'no-cache', 'must-revalidate'].join(','),
        },
      },
      next
    );
  } catch (error) {
    throw error;
  }
};

export const detail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!req.params.id) {
      res.status(400).send('Bad Request');
      return;
    }
    const audio = await prisma.audio.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!audio) {
      res.status(404).send('Not Found');
      return;
    }

    res.json({ audio });
  } catch (error) {
    throw error;
  }
};
