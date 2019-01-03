import axios from "axios";
const HTTP = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { language: "en-US", api_key: "af9c62f06479e409fbc8b1ee21126a96" },
  // headers: {},
  validateStatus: function(status) {
    return status >= 200 && status < 300; // default
  }
});
export default HTTP;
