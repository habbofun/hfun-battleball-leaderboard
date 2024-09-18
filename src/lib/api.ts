import axios from 'axios';

export const leaderboardApiClient = axios.create({
  baseURL: 'https://leaderboard.hfun.info',
});

export const localApiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://hfun.info',
});
