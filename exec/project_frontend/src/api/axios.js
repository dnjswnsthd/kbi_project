import axios from "axios";
// axios
export default axios.create({
  baseURL: "https://k4d109.p.ssafy.io/api/", // baseUrl
  headers: {
    "Content-type": "application/json",
  },
});
