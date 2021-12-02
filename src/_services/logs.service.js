import axios from "axios";

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
    return [
        {
            "model": "Supra MKIV Ridox Body Kit",
            "brand": "Toyota",
            "year": 2000,
            "version": "4.0",
            "id": 445,
            "action": "Insert",
            "happened_at": "2021-12-01 09:52:00"
        },
        {
            "model": "Levin AE86",
            "brand": "Toyota",
            "year": 1983,
            "version": "1.1",
            "id": 446,
            "action": "Insert",
            "happened_at": "2021-12-01 09:56:39"
        },
        {
            "model": "Civic Type R",
            "brand": "Honda",
            "year": 2007,
            "version": "2.0",
            "id": 447,
            "action": "Insert",
            "happened_at": "2021-12-01 10:17:42"
        },
        {
            "model": "Civic Si Coupe",
            "brand": "Honda",
            "year": 2013,
            "version": "2.0",
            "id": 448,
            "action": "Insert",
            "happened_at": "2021-12-01 10:21:33"
        },
        {
            "model": "240SX",
            "brand": "Nissan",
            "year": 1993,
            "version": "4.0",
            "id": 449,
            "action": "Insert",
            "happened_at": "2021-12-01 23:24:03"
        },
        {
            "model": "Mustang S550 SC",
            "brand": "Ford",
            "year": 2019,
            "version": "3.9",
            "id": 451,
            "action": "Insert",
            "happened_at": "2021-12-01 23:44:29"
        },
        {
            "model": "Commodore ZB SC",
            "brand": "Holden",
            "year": 2018,
            "version": "3.9",
            "id": 452,
            "action": "Insert",
            "happened_at": "2021-12-01 23:49:42"
        },
        {
            "model": "Falcon FGX SC",
            "brand": "Ford",
            "year": 2015,
            "version": "3.9",
            "id": 454,
            "action": "Insert",
            "happened_at": "2021-12-02 00:08:55"
        },
        {
            "model": "Commodore VF SC",
            "brand": "Holden",
            "year": 2013,
            "version": "3.9",
            "id": 455,
            "action": "Insert",
            "happened_at": "2021-12-02 00:10:48"
        },
        {
            "model": "Altima L33 SC",
            "brand": "Nissan",
            "year": 2013,
            "version": "3.9",
            "id": 456,
            "action": "Insert",
            "happened_at": "2021-12-02 00:12:41"
        },
        {
            "model": "FW31",
            "brand": "Williams",
            "year": 1997,
            "version": "1.0",
            "id": 457,
            "action": "Insert",
            "happened_at": "2021-12-02 00:17:18"
        },
        {
            "model": "GT-R Super GT",
            "brand": "Nissan",
            "year": 2021,
            "version": "1.0",
            "id": 458,
            "action": "Insert",
            "happened_at": "2021-12-02 11:03:44"
        }
    ]
}

function getTrackLogs() {
    return [
        {
            "name": "Autódromo Hermanos Rodríguez",
            "id": 80,
            "version": "1.05",
            "action": "Update",
            "happened_at": "2021-12-02 10:11:12"
        },
        {
            "name": "Knockhill",
            "id": 82,
            "version": "1.2",
            "action": "Update",
            "happened_at": "2021-12-02 10:55:06"
        },
        {
            "name": "Gunma Cycle Sports Center",
            "id": 120,
            "version": "1.2",
            "action": "Insert",
            "happened_at": "2021-12-02 11:13:03"
        },
        {
            "name": "Hope",
            "id": 121,
            "version": "1.0",
            "action": "Insert",
            "happened_at": "2021-12-02 11:25:14"
        }
    ]
}