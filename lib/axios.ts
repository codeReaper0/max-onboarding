import {LoginInput, RegisterInput} from "@/types/RegisterForm";
import axios from "axios";

const BASE_URL = "https://onboarding-api-pi.vercel.app/api/v1";

// Create an Axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define API endpoints
const apiEndpoints = {
  register: (data: RegisterInput) => api.post("/register/", data),
  login: (data: LoginInput) => api.post("/login/", data),
  verifyOTP: (email: string, code: string) =>
    api.post("/otp/verify/", {email, code}),
};

export default apiEndpoints;
