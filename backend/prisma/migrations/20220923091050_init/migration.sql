-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Audio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "album" TEXT,
    "directoryId" INTEGER NOT NULL,
    "checksum" TEXT NOT NULL,
    "duration" REAL NOT NULL,
    "thumbnail" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Audio" ("album", "author", "checksum", "createdAt", "directoryId", "duration", "id", "path", "title", "updatedAt") SELECT "album", "author", "checksum", "createdAt", "directoryId", "duration", "id", "path", "title", "updatedAt" FROM "Audio";
DROP TABLE "Audio";
ALTER TABLE "new_Audio" RENAME TO "Audio";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
