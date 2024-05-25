import axios from 'axios';

const config = { headers: { 'Content-Type': 'application/json' } };
const request = axios.create(config);

export default request;
