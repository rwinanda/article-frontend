// src/lib/api.ts
import axios from "axios";

const baseURL = axios.create({
    baseURL: "https://test-fe.mysellerpintar.com/api",
    // timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
});

export default baseURL;