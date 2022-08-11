import * as mm from 'music-metadata';

import readdirP from 'readdirp';
import { ulid } from 'ulid';
import path from 'path';
import checksum from 'checksum';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config({ debug: true });

console.log(process.env.AUDIO_BASE_DIR);

const audioBaseDir = process.env.AUDIO_BASE_DIR || '.';

const prisma = new PrismaClient();

const getDirectoryId = async (dirName: string): Promise<number | undefined> => {
  const directory = await prisma.directory.findFirst({
    where: {
      name: dirName,
    },
  });
  return directory?.id;
};

(async () => {
  try {
    console.log(`Start to list audio files ${audioBaseDir}`);

    const audioFiles = await readdirP.promise(audioBaseDir, {
      type: 'files_directories',
      fileFilter: ['*.mp3', '*.aac', '*.m4a', '*.flac', '*.ogg', '*.opus'],
      alwaysStat: false,
    });

    for await (let file of audioFiles) {
      // for Directory
      if (file.dirent?.isDirectory()) {
        const parentDirectoryName = path.basename(path.dirname(file.path));
        const parentDirectoryId = parentDirectoryName === '.' ? null : await getDirectoryId(parentDirectoryName);

        await prisma.directory.create({
          data: {
            name: file.dirent.name,
            path: file.path,
            parentId: parentDirectoryId,
          },
        });
      }

      if (file.dirent?.isFile()) {
        // for File
        // Find parent directory
        const directoryPath = path.dirname(file.path);
        const directory = await prisma.directory.findFirst({
          where: {
            path: directoryPath,
          },
        });

        if (!directory) {
          throw new Error(`Directory ${directoryPath} not found`);
        }

        const directoryId = directory?.id;

        // Find file
        const currentAudioFile = await prisma.audio.findFirst({
          where: {
            path: file.path,
          },
        });
        if (currentAudioFile) continue;

        const metadata = await mm.parseFile(file.fullPath);
        const metadataChecksum = checksum(JSON.stringify(metadata));

        const newAudioFileData = {
          id: ulid().toLocaleLowerCase(),
          path: file.path,
          checksum: metadataChecksum,
          title: metadata.common.title || file.basename,
          author: metadata.common.artist || metadata.common.artists?.join(',') || '',
          album: metadata.common.album || '',
          duration: metadata.format.duration || 0,
          directoryId: directoryId,
        };

        await prisma.audio.create({ data: newAudioFileData });
      }
    }
  } catch (error) {
    console.error(error);
  }
})();
