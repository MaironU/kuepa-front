import axios from 'axios';
import { HOST } from "./const";

export default class ApiRequest {
    constructor() {
        this.token = localStorage.getItem('token') || '';
    }

    get(url) {
        return axios.get(`${HOST}${url}`,
            {
                headers: {
                    Authorization: `${this.token}`
                },
            });
    }

    post(url, body) {
        return axios.post(`${HOST}${url}`,
            {
                ...body,
             },
            {
                headers: {
                    Authorization: `${this.token}`
                },
            });
    }

    getFetch(url, handle) {
        fetch(`${HOST}${url}`, {
            method: 'GET',
            headers: {
                Authorization: `${this.token}`
            }
        })
            .then(respose => respose.json())
            .then(data => {
                handle(data);
            })
            .catch((error) => {
                console.error('Error: ', error);
            })
    }
}
