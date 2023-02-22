import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/AxiosInstance";
import { successMessage, errorMessage } from "../utils/message";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const initialState = {
  amount: {},
  isLoading: false,
  solidValue: 0,
  solidCoin: {},
  standCoin: {},
  userWithDraw: [],
  userDeposite: [],
  solidToStandER: {},
  witdrawlByCryptoH: [],
  solidCoinTH: [],
  exchangeCoinTH: [],
 
};
// get requests
export const getUserWallet = createAsyncThunk(
  "getUserWallet",
  async (userId) => {
    try {
      const res = await axiosInstance.get(`api/wallet/${userId}`);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  }
);
export const getSolidCoin = createAsyncThunk("getSolidCoin", async (userId) => {
  try {
    const res = await axiosInstance.get(`api/solidcoin/${userId}`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log(err);
  }
});
export const getStandCoin = createAsyncThunk("getStandCoin", async (userId) => {
  try {
    const res = await axiosInstance.get(`api/exchangecoin/${userId}`);
    if (res.status === 200) {
      return res?.data;
    }
  } catch (err) {
    console.log(err);
  }
});
export const getUserWithdraw = createAsyncThunk(
  "getUserWithdraw",
  async (userId) => {
    try {
      const res = await axiosInstance.get(`api/withdraw/${userId}`);
      if (res.status === 200) {
        const nn = res?.data?.map((i) => {
          return { ...i, type: "Withdraw" };
        });
        return nn.reverse();
      }
    } catch (err) {
      console.log(err);
    }
  }
);
export const getUserDeposits = createAsyncThunk(
  "getUserDeposits",
  async (userId) => {
    try {
      const res = await axiosInstance.get(`api/deposit/${userId}`);
      if (res.status === 200) {
        const nn = res?.data?.map((i) => {
          return { ...i, type: "Deposit" };
        });
        return nn.reverse();
      }
    } catch (err) {
      console.log(err);
    }
  }
);
export const getSolidValue = createAsyncThunk("getSolidValue", async () => {
  try {
    const res = await axiosInstance.get(`api/solidvalue`);
    if (res.status === 200) {
      return res?.data?.value;
    }
  } catch (err) {
    console.log(err);
  }
});
export const solidToStandExchangeRate = createAsyncThunk(
  "solidToStandExchangeRate",
  async () => {
    try {
      const res = await axiosInstance.get(
        `api/exchangecoin/w/solidtostand/${1}`
      );

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const witdrawlByCryptoH = createAsyncThunk(
  "witdrawlByCryptoH",
  async (userId) => {
    try {
      const res = await axiosInstance.get(`api/withdrawbycrypto/${userId}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const exchangeCoinTH = createAsyncThunk(
  "exchangeCoinTH",
  async (userId) => {
    try {
      const res = await axiosInstance.get(`api/exchangehistory/${userId}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const solidCoinTH = createAsyncThunk("solidCoinTH", async (userId) => {
  try {
    const res = await axiosInstance.get(`api/solidhistory/${userId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

// post requests
export const solidToStandExchange = createAsyncThunk(
  "solidToStandExchange",
  async (postData) => {
    try {
      const res = await axiosInstance.post(`api/exchangecoin`, postData);
      console.log(res);
      if (res.data) {
        successMessage("Stand to Solid Exchange Successfully !");
      }
      return res.data;
    } catch (err) {
      errorMessage(err.response.data || err.message);
    }
  }
);
export const standToSolid = createAsyncThunk("standToSolid", async (data) => {
  try {
    const res = await axiosInstance.put(
      `api/exchangecoin/${data.id}`,
      data.postData
    );
    if (res) {
      successMessage("nill");
    }
    return res.data;
  } catch (err) {
    console.log(err);
    errorMessage(err.response.data || err.message);
  }
});
export const widthDrawByCrypto = createAsyncThunk(
  "widthDrawByCrypto",
  async (postData) => {
    try {
      const res = await axiosInstance.post(`api/withdrawbycrypto`, postData);
      if (res) {
        successMessage(`✔️ ${res.data}`);
      }
      return res;
    } catch (err) {
      console.log(err);
      errorMessage(err.response.data || err.message);
    }
  }
);
export const widthDrawByFait = createAsyncThunk(
  "widthDrawByFait",
  async (postData) => {
    try {
      const res = await axiosInstance.post(`api/withdraw`, postData);
      if (res) {
        successMessage(`✔️ ${res.data}`);
      }
      return res;
    } catch (err) {
      console.log(err);
      errorMessage(err.response.data || err.message);
    }
  }
);
export const buySolidCoin = createAsyncThunk(
  "buySolidCoin",
  async (postData) => {
    try {
      const res = await axiosInstance.post(`api/solidcoin`, postData);
      if (res.data) {
        console.log("res==========", res);
        successMessage(`✔️${res.data}!`);
      }
      return res;
    } catch (err) {
      console.log(err);
      errorMessage(err.response.data || err.message);
    }
  }
);
export const sellSolidCoin = createAsyncThunk("sellSolidCoin", async (data) => {
  try {
    const res = await axiosInstance.put(
      `api/solidcoin/${data?.id}`,
      data.postData
    );
    if (res) {
      successMessage("✔️ Coin Sold!");
    }
    return res;
  } catch (err) {
    console.log(err);
    errorMessage(err.response.data || err.message);
  }
});
export const depositeAmount = createAsyncThunk(
  "depositeAmount",
  async (postData) => {
    try {
      const res = await axiosInstance.post(`api/deposit`, postData);
      if (res) {
        successMessage("✔️ Deposit Request Initiated!");
      }
      return res;
    } catch (err) {
      console.log(err);
      errorMessage(err.response.data || err.message);
    }
  }
);
export const coinReducer = createSlice({
  name: "coinReducer",
  initialState: initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
    [getUserWallet.fulfilled]: (state, action) => {
      state.amount = action.payload;
    },
    [getUserWallet.pending]: (state, action) => {
      state.amount = {};
    },
    [getSolidCoin.fulfilled]: (state, action) => {
      state.solidCoin = action.payload;
    },
    [getStandCoin.fulfilled]: (state, action) => {
      state.standCoin = action.payload;
    },
    [getUserWithdraw.fulfilled]: (state, action) => {
      state.userWithDraw = action.payload;
    },
    [getUserDeposits.fulfilled]: (state, action) => {
      state.userDeposite = action.payload;
    },
    [getSolidValue.fulfilled]: (state, action) => {
      state.solidValue = action.payload;
    },
    [solidToStandExchangeRate.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.solidToStandER = action.payload;
    },
    [solidToStandExchangeRate.pending]: (state, action) => {
      state.isLoading = true;
      state.solidToStandER = action.payload;
    },
    [solidToStandExchange.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [solidToStandExchange.pending]: (state, action) => {
      state.isLoading = true;
    },
    [witdrawlByCryptoH.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.witdrawlByCryptoH = action.payload;
    },
    [witdrawlByCryptoH.pending]: (state, action) => {
      state.isLoading = true;
      state.witdrawlByCryptoH = action.payload;
    },
    [solidCoinTH.fulfilled]: (state, action) => {
      state.solidCoinTH = action.payload;
    },
    [exchangeCoinTH.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.exchangeCoinTH = action.payload;
    },
    [exchangeCoinTH.pending]: (state, action) => {
      state.isLoading = true;
      state.exchangeCoinTH = action.payload;
    },
    [buySolidCoin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [buySolidCoin.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [sellSolidCoin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [sellSolidCoin.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [depositeAmount.pending]: (state, action) => {
      state.isLoading = true;
    },
    [depositeAmount.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [standToSolid.pending]: (state, action) => {
      state.isLoading = true;
    },
    [standToSolid.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [widthDrawByCrypto.pending]: (state, action) => {
      state.isLoading = true;
    },
    [widthDrawByCrypto.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [widthDrawByFait.pending]: (state, action) => {
      state.isLoading = true;
    },
    [widthDrawByFait.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
  },
});
// Action creators are generated for each case reducer function
export const { setCurrentUser } = coinReducer.actions;
export default coinReducer.reducer;



