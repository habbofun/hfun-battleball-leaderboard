import axios from 'axios';

export const leaderboardApiClient = axios.create({
  baseURL: 'https://leaderboard.hfun.info',
});
