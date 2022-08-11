import { $fetch, FetchOptions } from 'ohmyfetch';

export const baseApiUrl = process.env.BASE_API_URL || 'http://localhost:3001';

const baseOptions: FetchOptions = {
  baseURL: baseApiUrl,
};

export function getDirectoryAll() {
  return $fetch('/directory/all', { ...baseOptions });
}

export function getRootDirectories() {
  return $fetch('/directory/root', { ...baseOptions });
}

export function getDirectories(id: number) {
  if (id === 0) {
    return getRootDirectories();
  } else {
    return $fetch(`/directory/${id}`, { ...baseOptions });
  }
}

export function getDirectoryAudio(direcotryId: number) {
  return $fetch(`/audio/directory/${direcotryId}`, {
    ...baseOptions,
  });
}

export function getAudioUrl(id: string) {
  return `${baseOptions.baseURL}/audio/id/${id}`;
}

export function getAudioDetail(id: string) {
  return $fetch(`/audio/${id}/detail`, { ...baseOptions });
}

export function getAudioSearch({ all, artist, album, title }: { all?: string; artist?: string; album?: string; title?: string }) {
  return $fetch(`/audio/search`, {
    ...baseOptions,
    params: {
      all,
      artist,
      album,
      title,
    },
  });
}
