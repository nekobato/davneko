import path from "node:path";
import { readdirGlob } from "readdir-glob";
import { parseBuffer } from "music-metadata";
import { createAudio } from "../../../database/models/audio";
import { insertDirectory } from "../../../database/models/directory";
import type { GetAudioResponse } from "../../audio/audio.schema";
import fs from "node:fs/promises";

export const scanAudioFiles = (directory: string) => {
  return new Promise((resolve, reject) => {
    const scannedAudio: GetAudioResponse[] = [];

    const fileErrors: {
      path: string;
      message: string;
    }[] = [];

    const globber = readdirGlob(path.resolve(directory), {
      pattern: "**/*.(mp3|m4a|aac|ogg|flac|wav)"
    });

    globber.on("match", async (match) => {
      console.log("scanning...", match.relative);

      const direcotryData = await insertDirectory(directory);

      const file = await fs.readFile(match.absolute);

      const parsed = await parseBuffer(file);

      if (!parsed.format.duration) {
        fileErrors.push({
          path: match.relative,
          message: "duration not found"
        });
        return;
      }

      const audio = await createAudio({
        path: match.relative,
        title:
          parsed.common.title ||
          path.basename(match.relative).replace(/\.[^/.]+$/, ""),
        artist: parsed.common.artist || "Unknown Artist",
        album: parsed.common.album,
        directoryId: direcotryData.id,
        track: parsed.common.track.no || undefined,
        duration: parsed.format.duration
      });

      scannedAudio.push({
        id: audio.audio.id,
        type: "audio",
        path: audio.audio.path,
        title: audio.audio.title,
        artist: {
          id: audio.artist.id,
          name: audio.artist.name
        },
        album: audio.album
          ? {
              id: audio.album.id,
              title: audio.album.title
            }
          : undefined,
        directory: {
          id: direcotryData.id,
          path: direcotryData.path
        },
        duration: audio.audio.duration
      });
    });

    globber.on("error", (err) => {
      console.error("fatal error", err);
      reject(err);
    });

    globber.on("end", () => {
      console.log("done");
      resolve(fileErrors);
    });
  });
};
