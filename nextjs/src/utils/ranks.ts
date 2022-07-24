export const getRankRP = (rank: number) => {
  return Math.round(4 * Math.pow(rank, 3) / 5);
};

export const getRankProgress = (rp: number) => {
  return Math.min(rp / getRankRP(getNextRank(rp)) * 100, 100);
};

export const getPrevRank = (rp: number) => {
  return Math.max(getCurrentRank(rp) - 1, 0);
};

export const getNextRank = (rp: number) => {
  return Math.min(getCurrentRank(rp) + 1, 20);
};

export const getCurrentRank = (rp: number) => {
  return Math.floor(Math.cbrt(rp * 5 / 4));
};