import { Config } from '../Config'

export const getJwt = () => {
  return localStorage.getItem(Config.tokenName);
};
