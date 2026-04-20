import axios from "axios";

export const NodeApi = axios.create({
  baseURL: "https://data.uaeiptvbox.net/data/admin",
  // baseURL: "http://localhost:8000/data/admin",
  withCredentials: true,
});
