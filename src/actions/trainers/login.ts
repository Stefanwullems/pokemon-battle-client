export const PLAYER_LOGIN = 'PLAYER_LOGIN'
export const PLAYER_LOGOUT = 'PLAYER_LOGOUT'

export const login = (color) => ({
  type: `${color.toUpperCase()}_LOGIN`
});

export const logout = (color) => ({
  type: `${color.toUpperCase()}_LOGOUT`
});

export const playerLogin = (color) => ({
  type: PLAYER_LOGIN,
  payload: color
})

export const playerLogout = () => ({
  type: PLAYER_LOGOUT
})