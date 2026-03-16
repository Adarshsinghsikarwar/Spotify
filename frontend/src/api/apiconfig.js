import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/"; // Adjust the base URL as needed

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
