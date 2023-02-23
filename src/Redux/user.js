import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/AxiosInstance";
import { successMessage, errorMessage } from "../utils/message";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const initialState = {
  currentUser: null,
  getUserRewards: [],
  allUsers: [],
  getAdminDefaultPer: {},
  isloading: false,
};
// get requests
// export const allUsers = createAsyncThunk("allUsers", async () => {
//   try {
//     const res = await axiosInstance.get(`api/user/getall`);
//     if (res.status === 200) {
//       return res.data;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// export const getCurrentuser = createAsyncThunk(
//   "getCurrentuser",
//   async (userId) => {
//     try {
//       const { data } = await axiosInstance.get(`/api/user/${userId}`);
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

//post requests

export const userSignUp = createAsyncThunk("userSignUp", async (formData) => {
  try {
    const res = await axiosInstance.post(`/api/user/register`, formData);
    if (res.status === 200) {
      successMessage("User successfully registered");
      // return res.data.user;
    }
  } catch (err) {
    console.log(err);
    errorMessage(err.response.data || err.message);
  }
});

//update Requests
// export const updateUserLevel = createAsyncThunk(
//   "updateUserLevel",
//   async (formData, { getState }) => {
//     try {
//       const res = await axiosInstance.put(`/api/profile/level`, formData);
//       if (res.status === 200) {
//         let array = [...getState().userReducer.allUsers];
//         let index = array.findIndex((d) => d.id === formData?.user_id);
//         array[index] = { ...array[index], level: formData?.level };
//         // successMessage("User Level Changed");
//         return array;
//       }
//     } catch (err) {
//       console.log(err);
//       errorMessage(err.response.data || err.message);
//     }
//   }
// );

export const userReducer = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    resetCurrentUser(state, action) {
      state.currentUser = null;
    },
  },
  extraReducers: {
    [userSignUp.fulfilled]: (state, action) => {
      state.isloading = false;
    },
    [userSignUp.pending]: (state, action) => {
      state.isloading = true;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setCurrentUser, resetCurrentUser } = userReducer.actions;
export default userReducer.reducer;
