import axios from "axios";
import {authHeader} from "@/_helpers";
import {API_URL} from "@/_services/config";

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export const trackService = {
    getAll,
    getTracksNations,
    getTracksAuthors,
    addTrack,
    updateTrack
}

function getAll() {
    return axios
        .get(`${API_URL}/track/all`, {headers: authHeader()})
        .then(response => response.data)
        .catch(error => Promise.reject(error.response ? error.response : error));
}

function getTracksNations() {
    return axios
        .get(`${API_URL}/nation/track/all`, {headers: authHeader()})
        .then(res => res.data)
        .catch(error => Promise.reject(error.response ? error.response : error));
}

function getTracksAuthors() {
    return axios.get(`${API_URL}/track/author/all`, {headers: authHeader()})
        .then(res => res.data)
        .catch(error => Promise.reject(error.response ? error.response : error))
}

function addTrack(track) {
    return axios
        .post(`${API_URL}/track/new`, track, {headers: authHeader()})
        .then(res => res.data)
        .catch(error => Promise.reject(error.response ? error.response : error))
}

function updateTrack(track) {
    return axios
        .post(`${API_URL}/track/update`, track, {headers: authHeader()})
        .then(res => res.data)
        .catch(error => Promise.reject(error.response ? error.response : error))
}