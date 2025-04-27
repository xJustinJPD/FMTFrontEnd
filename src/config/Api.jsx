import axios from 'axios';

const local = axios.create({
    baseURL: 'https://fmtbackendpy.onrender.com'
});


export default [local];