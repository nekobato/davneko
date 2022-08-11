import express from 'express';
import { prisma } from '../models/db';

export const all = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const directories = await prisma.directory.findMany();

    res.status(200).json({ directories });
  } catch (error) {
    throw error;
  }
};

export const getRootDirectories = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const directories = await prisma.directory.findMany({
      where: {
        parentId: null,
      },
    });

    res.status(200).json({ directories });
  } catch (error) {
    throw error;
  }
};

export const getDirectoriesByParentId = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!req.params.id) {
      throw new Error('Parent ID is required');
    }

    const directories = await prisma.directory.findMany({
      where: {
        parentId: Number(req.params.id),
      },
    });

    res.status(200).json({ directories });
  } catch (error) {
    throw error;
  }
};
