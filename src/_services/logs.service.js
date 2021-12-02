import axios from "axios";
import {API_URL} from "@/_services/config";
import {authHeader} from "@/_helpers";

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export const logsService = {
    getCarLogs,
    getTrackLogs
}

function getCarLogs() {
    return axios
        .get(`${API_URL}/log/car/all`, {headers: authHeader()})
        .then(response => response.data)
        .catch(error => Promise.reject(error.response ? error.response : error))
}

function getTrackLogs() {
    return axios
        .get(`${API_URL}/log/track/all`, {headers: authHeader()})
        .then(response => response.data)
        .catch(error => Promise.reject(error.response ? error.response : error))
}