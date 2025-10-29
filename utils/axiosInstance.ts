// utils/axiosInstance.ts
import axios from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window === 'undefined'
    ? 'http://localhost:3000'
    : window.location.origin);

const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  console.log('[Axios Request]', config.method?.toUpperCase(), config.url);
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[Axios Error]', err.response?.data || err.message);
    throw err;
  },
);

export const get = (url: string, config = {}) => axiosInstance.get(url, config);
export const post = (url: string, data: any, config = {}) =>
  axiosInstance.post(url, data, config);
export const put = (url: string, data: any, config = {}) =>
  axiosInstance.put(url, data, config);
export const del = (url: string, config = {}) =>
  axiosInstance.delete(url, config);

export default axiosInstance;
