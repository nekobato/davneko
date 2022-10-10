export const duration2TimeString = (duration?: number) => {
  if (!duration) {
    return '';
  }
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
