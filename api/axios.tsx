import axios from "axios";

export const NodeApi = axios.create({
  baseURL: "http://localhost:8000/data/admin",
  withCredentials: true,
});
