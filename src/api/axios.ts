import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-invofest-fdi9xqzmj-aliefsatrios-projects.vercel.app",
});

export default api;