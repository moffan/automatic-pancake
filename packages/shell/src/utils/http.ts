import axios, { AxiosInstance } from "axios";
import rateLimit from "axios-rate-limit";

export const http: AxiosInstance = rateLimit(axios.create(), {
  perMilliseconds: 1000,
  maxRequests: 2,
});
