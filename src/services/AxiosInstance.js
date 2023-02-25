import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
axios.defaults.headers["x-auth-token"] = cookies.get("token");

const axiosInstance = axios.create({
  baseURL: `http://localhost:8000/`,
  //baseURL: `https://prime-exchange.cyclic.app/`,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  crossorigin: true,
});

export default axiosInstance;
