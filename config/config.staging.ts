import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      prefix: 'https://staging-manager-api.capsid.one',
      staging: true,
    },
  },
});
