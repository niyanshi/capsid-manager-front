const TOKEN = 'token';

export const storage = {
  setToken: (val: string) => {
    sessionStorage.setItem(TOKEN, val);
  },
  getToken: () => sessionStorage.getItem(TOKEN),
  removeToken: () => {
    sessionStorage.removeItem(TOKEN);
  },
};
