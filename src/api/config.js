import axios from "axios";

export const apiBase = "http://localhost:4000"
export const statics = `${apiBase}/static`
export const userapi = axios.create({
    baseURL: `${apiBase}/api/v1/user`,
});
export const clientapi = axios.create({
    baseURL: `${apiBase}/api/v1/org`,
});

export const loginapi = axios.create({
    baseURL: `${apiBase}/api/v1/login`
})

export const signedin = (token) => {
    return axios.create({
        headers: { "Authorization": `Bearer ${token}` },
        baseURL: `${apiBase}`
    })
}
