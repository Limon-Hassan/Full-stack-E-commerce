export const setUser = (user, token) => {
  return {
    type: 'SET_USER',
    payload: { user, token },
  };
};

export const logOut = () => {
  return {
    type: 'LOG_OUT',
  };
};
