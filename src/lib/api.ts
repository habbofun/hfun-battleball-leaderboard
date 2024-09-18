import axios from 'axios';

export const leaderboardApiClient = axios.create({
  baseURL: 'https://leaderboard.hfun.info',
});

export const localApiClient = axios.create({
  baseURL: 'http://localhost:3000',
});
