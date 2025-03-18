import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL)
export const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials : true,
    headers: {
        "ContentType" : "application/json"
    }
  });

