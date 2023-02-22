import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
axios.defaults.headers.authorization = cookies.get("token");

const axiosInstance = axios.create({
  baseURL: `https://test.logicsyard.com/`,
  // baseURL: `http://localhost:5000/`,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  crossorigin: true,
});

export default axiosInstance;
