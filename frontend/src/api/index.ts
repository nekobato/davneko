import { $fetch, FetchOptions } from 'ohmyfetch'

const baseOptions: FetchOptions = {
  baseURL: process.env.BASE_API_URL || 'http://localhost:3001'
}

export function getDirectoryAll() {
  return $fetch('/directory/all', { ...baseOptions })
}

export function getDirectoryAudio(direcotryId: number) {
  return $fetch('/audio/directory', {
    ...baseOptions,
    params: { dir: direcotryId }
  })
}

export function getAudioUrl(id: string) {
  return `${baseOptions.baseURL}/audio/id/${id}`
}

export function getAudioDetail(id: string) {
  return $fetch(`/audio/${id}/detail`, { ...baseOptions })
}

export function getAudioSearch({
  all,
  artist,
  album,
  title
}: {
  all?: string
  artist?: string
  album?: string
  title?: string
}) {
  return $fetch(`/audio/search`, {
    ...baseOptions,
    params: {
      all,
      artist,
      album,
      title
    }
  })
}
