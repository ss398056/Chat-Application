import axios from 'axios'

const baseURL = "https://chat-application-production-9095.up.railway.app/api/chat/app/v1";

export const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials : true,
    headers: {
        "ContentType" : "application/json"
    }
  });

