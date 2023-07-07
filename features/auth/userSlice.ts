import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: any;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    join: (state, action: PayloadAction<string>) => {
      state.user.user.checkpost = action.payload;
    },
    updateUser: (state, action: PayloadAction<any>) => {
      state.user.user = action.payload;
    },
  },
});

export const { login, logout, join, updateUser } = userSlice.actions;
export default userSlice.reducer;
