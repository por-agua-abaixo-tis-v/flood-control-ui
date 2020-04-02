import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tisv-flood-control-api.herokuapp.com/'
});

export default instance;