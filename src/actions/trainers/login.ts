export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (color) => ({
  type: LOGIN,
  payload: color
});

export const logout = () => ({
  type: LOGOUT
});