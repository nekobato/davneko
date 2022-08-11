import express from 'express';
import { searchAudioByAlbum, searchAudioByAuthor, searchAudioByTitle, getAudioByDirecotryId } from '../models';

export const search = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const title = req.query['title'] || req.query['all'] || undefined;
  const album = req.query['album'] || req.query['all'] || undefined;
  const author = req.query['author'] || req.query['all'] || undefined;

  try {
    res.json({
      titles: title ? await searchAudioByTitle(title) : [],
      albums: album ? await searchAudioByAlbum(album) : [],
      authors: author ? await searchAudioByAuthor(author) : [],
    });
  } catch (error) {
    throw error;
  }
};

export const directory = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const directoryId = req.params.id;

  if (!directoryId) {
    res.status(400).send('Bad Request');
    return;
  }

  const audios = await getAudioByDirecotryId(Number(directoryId));

  try {
    res.json({
      audios,
    });
  } catch (error) {
    throw error;
  }
};
