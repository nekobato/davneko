import { nanoid } from "nanoid";
import { audioTable } from "../schema";
import { db } from "..";
import { insertArtist } from "./artist";
import { insertAlbum } from "./album";

export const createAudio = async (audio: {
  path: string;
  title: string;
  artist: string;
  album?: string;
  track?: number;
  directoryId: string;
  duration: number;
}) => {
  const { path, title, artist, album, track, directoryId, duration } = audio;

  const artistData = await insertArtist(artist);
  const albumData = album ? await insertAlbum(album, artistData.id) : null;

  const audioData = await insertAudio({
    path,
    title,
    artistId: artistData.id,
    albumId: albumData?.id,
    track,
    directoryId,
    duration
  });

  return {
    audio: audioData,
    artist: artistData,
    album: albumData
  };
};

export const insertAudio = async (audio: {
  path: string;
  title: string;
  track?: number;
  duration: number;
  artistId: string;
  albumId?: string;
  directoryId: string;
}) => {
  const { path, title, artistId, albumId, track, directoryId, duration } =
    audio;

  const audioData = await db
    .insert(audioTable)
    .values({
      id: nanoid(),
      type: "audio",
      path,
      title,
      artistId,
      albumId,
      track,
      directoryId,
      duration,
      updatedAt: Date.now(),
      createdAt: Date.now()
    })
    .returning();

  return { ...audioData[0], path: audio.path };
};
