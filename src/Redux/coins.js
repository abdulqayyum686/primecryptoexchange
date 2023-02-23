import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/AxiosInstance";
import { successMessage, errorMessage } from "../utils/message";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const initialState = {};
// get requests
// export const getUserWallet = createAsyncThunk(
//   "getUserWallet",
//   async (userId) => {
//     try {
//       const res = await axiosInstance.get(`api/wallet/${userId}`);
//       if (res.status === 200) {
//         return res.data;
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

// post requests
// export const solidToStandExchange = createAsyncThunk(
//   "solidToStandExchange",
//   async (postData) => {
//     try {
//       const res = await axiosInstance.post(`api/exchangecoin`, postData);
//       console.log(res);
//       if (res.data) {
//         successMessage("Stand to Solid Exchange Successfully !");
//       }
//       return res.data;
//     } catch (err) {
//       errorMessage(err.response.data || err.message);
//     }
//   }
// );

export const coinReducer = createSlice({
  name: "coinReducer",
  initialState: initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
    // [getUserWallet.fulfilled]: (state, action) => {
    //   state.amount = action.payload;
    // },
  },
});
// Action creators are generated for each case reducer function
export const { setCurrentUser } = coinReducer.actions;
export default coinReducer.reducer;
