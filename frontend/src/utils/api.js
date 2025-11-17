import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",  // backend url
});

export default API;
