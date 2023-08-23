import axios from "axios";

export const CLIENT_URL = 'https://spboptis.ru'
export const DEV_API_URL = 'http://localhost:5555'
export const RENDER_PROD_API_URL = 'https://backend-optics-without-packlo.onrender.com'
export const PROD_API_URL = 'https://api.spboptis.ru'
export const BEGET_PROD_API_URL = 'https://api.spboptis.ru:8080'
export const API_URL = BEGET_PROD_API_URL

const instance = axios.create({  
    baseURL: API_URL,  
    withCredentials: true,    
})

instance.interceptors.request.use( (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

instance.interceptors.response.use( (config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401  
            && error.config && !error.config._isRetry ) { 
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.tokens.accessToken);  
            return instance.request(originalRequest); 
        } catch (error) {
            console.log('not authorised')
        } 
    } 
    throw error;
}) 

export default instance;