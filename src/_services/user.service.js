import axios from "axios";
import {API_URL} from "@/_services/config";

export const userService = {
    login,
    logout,
};


function login(username, password) {
    return axios.post(`${API_URL}/login`, {username, password}, {validateStatus: status => status === 202})
        .then(response => {
            let user = response.data
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                console.log("no token amigo")
            }
            return Promise.resolve(user);
        }).catch(error => Promise.reject(error.response ? error.response : error))
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
