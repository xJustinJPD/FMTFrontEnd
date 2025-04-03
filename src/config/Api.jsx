import axios from 'axios';

// const local = axios.create({
//     baseURL: 'https://clash-0707c55bf2f2.herokuapp.com/api'
// });

const local = axios.create({
    baseURL: 'http://localhost:5000'
});


export default [local];