import axios from "axios";

export const api = () => {
    return axios.create({
        baseURL: "https://music.merritt.es/api",
    });
};
