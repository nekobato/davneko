import * as mm from "music-metadata";

import readdirP from "readdirp";
import { sequelize, Audio, Directory, DirectoryRow } from "../models";
import { ulid } from "ulid";
import path from "path";
import { QueryTypes } from "sequelize";

const audioBaseDir = process.env.AUDIO_BASE_DIR || ".";

(async () => {
  try {
    const files = await readdirP.promise(audioBaseDir, {
      fileFilter: ["*.mp3", "*.aac"],
      alwaysStat: false,
    });
    for await (let file of files) {
      
      // 既にDirectoryがあるかどうか
      let directoryId: number;
      const directoryPath = path.dirname(file.path);
      const directoryRecords: DirectoryRow[] = await sequelize.query('SELECT id from directory where path = :path', { replacements: {path: directoryPath}, type: QueryTypes.SELECT });
      if (directoryRecords.length) {
        directoryId = directoryRecords[0].id;
      } else {
        const directory = await Directory.create({
          path: directoryPath,
          created: new Date(),
          updated: new Date(),
        }, { fields: ['id', 'path'] });
        directoryId = directory.id;
      }

      // 既にあるかどうか
      const currentData = await sequelize.query('SELECT id from audio where path = :path', { replacements: {path: file.path}, type: QueryTypes.SELECT });
      if (currentData.length) continue;

      const metadata = await mm.parseFile(file.fullPath);
      const data = {
        id: ulid().toLocaleLowerCase(),
        checksum: "",
        title: metadata.common.title || file.basename,
        author: metadata.common.artist || metadata.common.artists?.join(',') || "",
        album: metadata.common.album || "",
        duration: metadata.format.duration || 0,
        path: file.path,
        directory: directoryId,
        created: new Date(),
        updated: new Date(),
      };
      await Audio.create(data);
    }
  } catch (error) {
    console.error(error);
  }
})();

const bulkUpsert = async (audioList: any[]) => {
  return await Audio.bulkCreate(audioList);
};
