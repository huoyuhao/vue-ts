import Cookies from 'js-cookie';

const TokenKey = 'token';

export const getToken = () => {
  return Cookies.get(TokenKey);
};
export const getTokenKey = () => {
  return TokenKey;
};
export const setToken = (token: any) => {
  return Cookies.set(TokenKey, token);
};
export const removeToken = () => {
  Cookies.remove(TokenKey);
};
