import { defineStore } from 'pinia';

export default defineStore('apiStore', {
  state: () => ({
    apiUrl: import.meta.env.VITE_API,
    apiPath: import.meta.env.VITE_PATH,
  }),
  getters: {
    VITE_API: ({ apiUrl }) => {
      return apiUrl;
    },
    VITE_PATH: ({ apiPath }) => {
      return apiPath;
    },
  },
});
