import axios from "axios";

let baseURL = "http://localhost:8000/api/"
//let baseURL = "https://thr-backend.camionerosperuanos.org/api/"
let refresh = false;

const axiosInstance = axios.create({
    baseURL: baseURL
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
axiosInstance.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;
        axiosInstance.post('token/refresh/', {
            refresh:localStorage.getItem('refresh_token')
        }).then((response) => {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
            localStorage.setItem('access_token', response.data.access);
            window.location.reload();
        }).catch((err) => {
            localStorage.clear();
            axiosInstance.defaults.headers.common['Authorization'] = null;
            window.location.href = '/login';
        });
    }
    refresh = false;
    return error;
});

export default axiosInstance;
