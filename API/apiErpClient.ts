import axios from "axios";
import { apiErrorHandler } from "./helper";

const apiErpClient = axios.create({
  baseURL: process.env.REACT_APP_ERP_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiErpClient.interceptors.response.use((response) => response, apiErrorHandler);

export default apiErpClient;
