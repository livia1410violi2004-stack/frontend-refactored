import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
export const API_BASE = `${BACKEND_URL}/api`;

// Axios instance ready for future JWT auth
export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT (when back-end is ready)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("absoluta_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Fake async helper for mock services
export const mockDelay = (data, ms = 200) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));
