import { mockDelay } from "./api";
import { mockUser } from "../mocks/data";

// Mock credentials — swap for real JWT auth once backend is live
const FIXED_USER = "admin";
const FIXED_PASS = "admin123";

export const AuthService = {
  login: async ({ username, password }) => {
    await mockDelay(null, 400);
    if (username === FIXED_USER && password === FIXED_PASS) {
      const fakeToken = btoa(`${username}:${Date.now()}`);
      localStorage.setItem("absoluta_token", fakeToken);
      localStorage.setItem("absoluta_user", JSON.stringify(mockUser));
      return { token: fakeToken, user: mockUser };
    }
    throw new Error("Credenciais inválidas. Use admin / admin123.");
  },
  logout: () => {
    localStorage.removeItem("absoluta_token");
    localStorage.removeItem("absoluta_user");
  },
  currentUser: () => {
    const raw = localStorage.getItem("absoluta_user");
    return raw ? JSON.parse(raw) : null;
  },
  isAuthenticated: () => !!localStorage.getItem("absoluta_token"),
};
