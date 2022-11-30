import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      prefix: './api',
      dev: true,
    },
  },
});
