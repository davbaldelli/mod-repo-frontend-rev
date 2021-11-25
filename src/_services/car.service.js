import axios from "axios";
import {authHeader} from "@/_helpers";
import {API_URL} from "@/_services/config";

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export const carService = {
    getAll,
    getCarTypes,
    getCarNations,
    getCarBrands,
    getCarAuthors,
    addCar,
    updateCar
}


function getAll() {
    return axios
        .get(`${API_URL}/car/all`, {headers: authHeader()})
        .then(response => response.data)
        .catch((error) => Promise.reject(error.response ? error.response : error));
}

function getCarTypes() {
    return axios
        .get(`${API_URL}/car/type/all`, {headers: authHeader()})
        .then(response => response.data)
        .catch((error) => Promise.reject(error.response ? error.response : error));
}

function getCarBrands() {
    return axios
        .get(`${API_URL}/brand/all/`, {headers: authHeader()})
        .then(response => response.data)
        .catch((error) => Promise.reject(error.response ? error.response : error));
}

function getCarAuthors() {
    return axios
        .get(`${API_URL}/car/author/all`, {headers: authHeader()})
        .then(response => response.data)
        .catch((error) => Promise.reject(error.response ? error.response : error));
}

function getCarNations() {
    return axios
        .get(`${API_URL}/nation/brand/all`, {headers: authHeader()})
        .then(response => response.data)
        .catch((error) => Promise.reject(error.response ? error.response : error));
}

function addCar(car) {
    return axios
        .post(`${API_URL}/car/new`, car, {headers: authHeader()})
        .then(res => res.data)
        .catch(error => {
            return Promise.reject(error.response ? error.response : error)
        })
}

function updateCar(car) {
    return axios.post(`${API_URL}/car/update`, car, {headers: authHeader()})
        .then(res => res.data)
        .catch(error => Promise.reject(error.response ? error.response : error))
}