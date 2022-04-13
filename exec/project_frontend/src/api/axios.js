import axios from "axios";
// axios
export default axios.create({
  baseURL: "http://localhost:8000/api/",
  //baseURL: "https://k4d109.p.ssafy.io/api/", // baseUrl
  headers: {
    "Content-type": "application/json",
  },
});
