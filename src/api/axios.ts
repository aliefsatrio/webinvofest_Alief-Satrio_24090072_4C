import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-invofest-tau.vercel.app",
});

export default api;