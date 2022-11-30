import axios from 'axios';
import { message } from 'antd';
import { storage } from '@/utils';

const http = axios.create({
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  if (storage.getToken()) {
    config.headers = {
      Authorization: `Bearer${storage.getToken()}`,
    };
  }

  return config;
});
http.interceptors.response.use(
  (config) => {
    const { data } = config;
    if (data.code === '401') {
      message.warn(`CODE ${data.code}: ${data.message}`);
    }
    return config;
  },
  (err) => err,
);

export default http;

export const prefix = process.env.prefix;
