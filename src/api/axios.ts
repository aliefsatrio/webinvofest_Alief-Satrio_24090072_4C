import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Otomatis sisipkan token JWT dari Zustand persist storage
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("auth-storage");
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      const token = parsed?.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // token tidak valid, lanjut tanpa auth
    }
  }
  return config;
});

export default api;