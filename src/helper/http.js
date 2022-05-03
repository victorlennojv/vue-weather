import axios from "axios";

const http = axios.create({
  baseURL: String("https://api.openweathermap.org/data/2.5/").trim(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
