import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: null,
  userName: null,
  userImageURL: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      userImageURL: payload.userImageURL,
    }),
    authStateChange: (state, { payload }) => ({ ...state, stateChange: payload.stateChange }),
    authSignOut: () => state,
  },
});
