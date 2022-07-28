export const toMMSS = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
};