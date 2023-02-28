import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/AxiosInstance";
import { successMessage, errorMessage } from "../utils/message";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const initialState = {
  
  isloading: false, 
  data: [{}],
  coinData: [{}],
};
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

// get Coin
export const getAllCoin = createAsyncThunk("getAllCoin", async () => {
  try {
    const res = await axiosInstance.get(`/coinmarket`);
    if (res.status === 200) {
      console.log(res.data , "coin data");
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
});

// get requests
 export const getAllDepositRequest = createAsyncThunk(
    "getAllDepositRequest",
    async () => {
      try {
        const res = await axiosInstance.get(`/api/deposit/`);
        if (res.status === 200) {
          return res.data;
        }
      } catch (err) {
        console.log(err);
      }
    }
  );

  // updste coin status
  export const updateDepositStatus = createAsyncThunk(
    "updateDepositStatus",
    
    async (postData) => {
     let reqBody = { status: postData.status, status_description: postData.status_description };
      try {
        const res = await axiosInstance.put(`/api/deposit/${postData.id}`, reqBody);
        if (res.status === 200) {
          console.log(res.data);
          return res.data;
        }
      } catch (err) {
        console.log(err);
      }
    }
  );


// @desc    Deposit Amount
// @route   POST /api/deposit/
 export const depositAmount = createAsyncThunk(
    "depositAmount",
    async (postData) => {
      try {
        const res = await axiosInstance.post(`/api/deposit/`, postData);
        console.log(res);
        if (res.data) { 
          successMessage("Deposit Successfully !");
        }
        return res.data;
      } catch (err) {

        errorMessage(err.response.data || err.message);
        //reject with asyncthunk
        return Promise.reject(err.response.data || err.message);
    
        
      }
    }
  );


  // create trade
 export const createTrade = createAsyncThunk(
    "createTrade",
    async (postData) => {
      try {
        const res = await axiosInstance.post(`/api/activetrade/`, postData);
        console.log(res);
        if (res.data) {
          successMessage("Trade Successfully !");
        }
        return res.data;
      } catch (err) {
        errorMessage(err.response.data || err.message);
      }
    }
  );

  //create trade

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
        [depositAmount.fulfilled]: (state, action) => {
          state.isloading = false;
        },
        [depositAmount.pending]: (state, action) => {
          state.isloading = true;
        },

        [depositAmount.rejected]: (state, action) => {
          state.isloading = false;
          console.log("rejected", action);
        },

        [getAllDepositRequest.fulfilled]: (state, action) => {
          state.isloading = false;
          state.data = action.payload;
          console.log("action.payload", action.payload);
        },
        [getAllDepositRequest.pending]: (state, action) => {
          state.isloading = true;
        },
        [getAllDepositRequest.rejected]: (state, action) => {
          state.isloading = false;
          console.log("rejected", action);
        },

        [updateDepositStatus.fulfilled]: (state, action) => {
          state.isloading = false;
         // state.data = action.payload;
          console.log("action.payload", action.payload);
        },
        [updateDepositStatus.pending]: (state, action) => {
          state.isloading = true;
        },
        [updateDepositStatus.rejected]: (state, action) => {
          state.isloading = false;
          console.log("rejected", action);
        },

    [getAllCoin.fulfilled]: (state, action) => {
      state.isloading = false;
      state.coinData = action.payload;
      console.log("action.payload", action.payload);
    },
    [getAllCoin.pending]: (state, action) => {
      state.isloading = true;
    },
    [getAllCoin.rejected]: (state, action) => {
      state.isloading = false;
      console.log("rejected", action);
    },

    [createTrade.fulfilled]: (state, action) => {
      state.isloading = false;
      //state.data = action.payload;
      console.log("action.payload", action.payload);
    },
    [createTrade.pending]: (state, action) => {
      state.isloading = true;
    },
    [createTrade.rejected]: (state, action) => {
      state.isloading = false;
      console.log("rejected", action);
    },






    // [getUserWallet.fulfilled]: (state, action) => {
    //   state.amount = action.payload;
    // },
  },
});
// Action creators are generated for each case reducer function
export const { setCurrentUser } = coinReducer.actions;
export default coinReducer.reducer;
