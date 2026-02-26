import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error logging — replace with Sentry or similar in production
    if (import.meta.env.DEV) {
      console.error("[API Error]", error);
    }

    return Promise.reject(error);
  },
);
