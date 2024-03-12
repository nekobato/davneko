import { promises as fs } from 'fs';
import m3u8Parser from 'm3u8-parser';

type M3U8Manifest = {
  allowCache: boolean;
  endList: boolean;
  mediaSequence: number;
  discontinuitySequence: number;
  playlistType: string;
  custom: object;
  playlists: [
    {
      attributes: object;
      Manifest;
    },
  ];
  mediaGroups: {
    AUDIO: {
      'GROUP-ID': {
        NAME: {
          default: boolean;
          autoselect: boolean;
          language: string;
          uri: string;
          instreamId: string;
          characteristics: string;
          forced: boolean;
        };
      };
    };
    VIDEO: object;
    'CLOSED-CAPTIONS': object;
    SUBTITLES: object;
  };
  dateTimeString: string;
  dateTimeObject: Date;
  targetDuration: number;
  totalDuration: number;
  discontinuityStarts: [number];
  segments: [
    {
      byterange: {
        length: number;
        offset: number;
      };
      duration: number;
      attributes: object;
      discontinuity: number;
      uri: string;
      timeline: number;
      key: {
        method: string;
        uri: string;
        iv: string;
      };
      map: {
        uri: string;
        byterange: {
          length: number;
          offset: number;
        };
      };
      'cue-out': string;
      'cue-out-cont': string;
      'cue-in': string;
      custom: object;
    },
  ];
};

export const readM3U8 = async (filePath: string): Promise<M3U8Manifest> => {
  const parser = new m3u8Parser.Parser();

  parser.push(await fs.readFile(filePath, 'utf8'));
  parser.end();

  return parser.manifest;
};

export const generateM3U8FromSegments = (segments: any[]) => {
  const extInfList = segments.reduce((acc, segment) => {
    return [...acc, InfWIthUrl(segment)];
  }, []);
  const m3u8Contents = [
    '#EXTM3U',
    '#EXT-X-VERSION:6',
    'EXT-X-PLAYLIST-TYPE:VOD',
    '#EXT-X-TARGETDURATION:10',
    '#EXT-X-MEDIA-SEQUENCE:0',
    ...extInfList,
    '#EXT-X-ENDLIST',
  ];
  return m3u8Contents.join('\n');
};

const InfWIthUrl = (segment: { duration: number; url: string }) => {
  return `#EXTINF:${segment.duration},\n ${segment.url}`;
};

// Soundcloudはこういうの
// #EXTM3U
// #EXT-X-VERSION:6
// #EXT-X-PLAYLIST-TYPE:VOD
// #EXT-X-TARGETDURATION:10
// #EXT-X-MEDIA-SEQUENCE:0
// #EXTINF:1.985272,
// https://cf-hls-media.sndcdn.com/media/159660/0/31762/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:2.977908,
// https://cf-hls-media.sndcdn.com/media/159660/31763/79410/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:4.989302,
// https://cf-hls-media.sndcdn.com/media/159660/79411/159240/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/159241/318900/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/318901/478561/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/478562/638221/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/638222/797882/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/797883/957542/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/957543/1117202/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/1117203/1276863/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/1276864/1436523/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/1436524/1596184/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/1596185/1755844/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/1755845/1915505/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/1915506/2075165/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/2075166/2234825/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/2234826/2394486/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/2394487/2554146/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/2554147/2713807/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:9.978604,
// https://cf-hls-media.sndcdn.com/media/159660/2713808/2873467/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXTINF:4.963180,
// https://cf-hls-media.sndcdn.com/media/159660/2873468/2952879/UteDAjsg4tTI.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLzE1OTY2MC8qLyovVXRlREFqc2c0dFRJLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2ODAwNjk2ODl9fX1dfQ__&Signature=OyZCqmLyGzns8GpxQ1cNjpkQhadj5k50mFfUixzd6KfSJwHqonLwZL7hEZQLfU-zz8TWB4E8svnWXigMD4UqL28TYaFJvW51DiGnXNGn8auW1Lu0gKZjseffFmkmFXqMxOuB15b6Ov5NsEOiK3ogoHYXzY0gSCAC6yx6HD-e~w7lYF0PI1vg1gyvZyPupGu4lcMW0M5zfouOh6EmxMnNI9Cos3q~KkNfP-2ieNaOl3b1cKsvRV4RQAIG0N8712Ch2Itr7hmUFNkG4HGR0SYongMIcHpqk3UC8onKUhP05hZaiRCpXMlxswUB7Frb2VRZZ5qZ-4Q7qB9t3Z0dQM4mTQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ
// #EXT-X-ENDLIST
