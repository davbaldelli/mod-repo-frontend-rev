import axios from "axios";
import {authHeader} from "@/_helpers";
import {API_URL} from "@/_services/config";

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export const authorService = {
    getAll,
}

function getAll() {
    return axios
        .get(`${API_URL}/author/all`, {headers: authHeader()})
        .then(response => response.data)
        .catch((error) => Promise.reject(error.response ? error.response : error));
}