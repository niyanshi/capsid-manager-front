import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      prefix: 'https://manager-api.capsid.one',
      prod: true,
    },
  },
});
