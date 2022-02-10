import { DataTypes, Model, QueryTypes } from 'sequelize';
import { sequelize } from './db';

export class Audio extends Model {
  public id!: string;
  public title!: string;
  public author!: string;
  public album!: string;
  public duration!: string;
  public path!: string;
  public directory!: number;
  public created!: Date;
  public updated!: Date;
}

Audio.init(
  {
    id: {
      type: DataTypes.STRING(40),
      primaryKey: true,
      allowNull: false,
    },
    title: { type: DataTypes.STRING(200), allowNull: false },
    author: { type: DataTypes.STRING(200), allowNull: false },
    album: { type: DataTypes.STRING(200), allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    path: { type: DataTypes.STRING(200), allowNull: false },
    directory: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: 'audio',
    freezeTableName: true,
    createdAt: 'created',
    updatedAt: 'updated',
  }
);

export const searchAudioByTitle = (title: string) => {
  return sequelize.query('SELECT * from audio WHERE title LIKE :title', {
    replacements: { title: `%${title}%` },
    type: QueryTypes.SELECT,
  });
};

export const searchAudioByAuthor = (author: string) => {
  return sequelize.query('SELECT * from audio WHERE author LIKE :author', {
    replacements: { author: `%${author}%` },
    type: QueryTypes.SELECT,
  });
};

export const searchAudioByAlbum = (album: string) => {
  return sequelize.query('SELECT * from audio WHERE album LIKE :album', {
    replacements: { album: `%${album}%` },
    type: QueryTypes.SELECT,
  });
};

export const getAudioByDirecotryId = (directoryId: number) => {
  return sequelize.query('SELECT * from audio WHERE directory = :directory', {
    replacements: { directory: directoryId },
    type: QueryTypes.SELECT,
  });
};
