import axios from "axios";

export const apiBase = "http://localhost:4000"
export const userapi = axios.create({
    baseURL: `${apiBase}/api/v1/user`,
});
export const clientapi = axios.create({
    baseURL: `${apiBase}/api/v1/org`,
});

export const loginapi = axios.create({
    baseURL: `${apiBase}/api/v1/login`
})

