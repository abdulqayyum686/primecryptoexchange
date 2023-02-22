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
export const allUsers = createAsyncThunk("allUsers", async () => {
  try {
    const res = await axiosInstance.get(`api/user/getall`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
});
export const updateSettings = createAsyncThunk(
  "updateSettings",
  async (obj) => {
    try {
      const res = await axiosInstance.put(obj.url, obj.formData, obj.config);
      if (res.status === 201) {
        console.log("consoledata===", res.data);
        successMessage(res.data.mesasge);
        cookies.set(res.data.role, res.data.token);
        return res.data.user;
      } else {
        errorMessage("Internal server error");
      }
    } catch (err) {
      console.log(err);
      errorMessage("Internal server error");
    }
  }
);
export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (obj) => {
    try {
      const { data } = await axiosInstance.put(obj.url, obj.passwordSettings);
      console.log("update password==", data);
      if (data) {
        successMessage(data.message);
      } else {
        errorMessage(data.message);
      }
      return data.user;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getCurrentuser = createAsyncThunk(
  "getCurrentuser",
  async (userId) => {
    try {
      const { data } = await axiosInstance.get(`/api/user/${userId}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getUserRewards = createAsyncThunk(
  "getUserRewards",
  async (userName) => {
    try {
      const { data } = await axiosInstance.get(`/api/referreward/${userName}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getUserLevelRewards = createAsyncThunk(
  "getUserLevelRewards",
  async (user_id) => {
    try {
      const { data } = await axiosInstance.get(`/api/levelreward/${user_id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getAdminDefaultPer = createAsyncThunk(
  "getAdminDefaultPer",
  async () => {
    try {
      const { data } = await axiosInstance.get(`/api/adminlevelreward`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
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
export const uerLelevRewards = createAsyncThunk(
  "uerLelevRewards",
  async (formData) => {
    try {
      const res = await axiosInstance.post(`/api/levelreward`, formData);
      if (res.status === 200) {
        successMessage("User level rewards updated successfully");
        // return res.data.user;
      }
    } catch (err) {
      console.log(err);
      errorMessage(err.response.data || err.message);
    }
  }
);
export const addReferalCode = createAsyncThunk(
  "addReferalCode",
  async (formData) => {
    try {
      const res = await axiosInstance.post(`/api/refer`, formData);
      if (res.status === 200) {
        successMessage("Referal Code added");
        return res.data.user;
      }
    } catch (err) {
      console.log(err);
      errorMessage(err.response.data || err.message);
    }
  }
);
//update Requests
export const updateUserLevel = createAsyncThunk(
  "updateUserLevel",
  async (formData, { getState }) => {
    try {
      const res = await axiosInstance.put(`/api/profile/level`, formData);
      if (res.status === 200) {
        let array = [...getState().userReducer.allUsers];
        let index = array.findIndex((d) => d.id === formData?.user_id);
        array[index] = { ...array[index], level: formData?.level };
        // successMessage("User Level Changed");
        return array;
      }
    } catch (err) {
      console.log(err);
      errorMessage(err.response.data || err.message);
    }
  }
);

export const saveDefaultPer = createAsyncThunk(
  "saveDefaultPer",
  async (data) => {
    try {
      const res = await axiosInstance.put(
        `/api/adminlevelreward/${data.id}`,
        data.data
      );
      if (res.status === 200) {
        successMessage("Default Levels values changed successfully");
        // return res.data.user;
      }
    } catch (err) {
      console.log(err);
      errorMessage(err.response.data || err.message);
    }
  }
);
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
    [allUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload;
    },
    [updateSettings.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [getCurrentuser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [getUserRewards.fulfilled]: (state, action) => {
      state.getUserRewards = action.payload;
    },
    [updateUserLevel.fulfilled]: (state, action) => {
      state.allUsers = action.payload;
    },
    [getAdminDefaultPer.fulfilled]: (state, action) => {
      state.getAdminDefaultPer = action.payload;
    },
    [userSignUp.fulfilled]: (state, action) => {
      state.isloading = false;
    },
    [userSignUp.pending]: (state, action) => {
      state.isloading = true;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  setCurrentRoom,
  setCurrentPrivateMemberMsg,
  setCurrentRoomMessages,
  addNotification,
  resetNotification,
  setCurrentUser,
  changeCurrentSideBar,
  resetCurrentUser,
} = userReducer.actions;
export default userReducer.reducer;
