import axios from 'axios';

let BASE_URL = 'http://localhost:3003/api';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      console.log("token", token)
      config.headers['Accept'] = 'application/json';
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['X-CSRFToken'] = localStorage.getItem('csrf');
    }
    
    config.headers['Content-Type'] = 'application/json';
    
    console.log(config)

    return config;
  },
  (error) => Promise.reject(error)
);

// Add an error handler
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      console.log(originalRequest)
      console.log(error)
  
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      let tokenHasExpired = error.response.status === 401 && !originalRequest._retry
      if (tokenHasExpired) {
        originalRequest._retry = true;
  
        try {
          const refresh = localStorage.getItem('refresh');
          const response = await axios.post(`${BASE_URL}/auth/token/refresh/`, { refresh });
          const { access } = response.data;
  
          localStorage.setItem('access', access);
  
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return axios(originalRequest);
        } catch (error) {
          console.log(error)

          // If the refresh token has also expired, log the user out
          if ((error as any).response.status === 401 && (error as any).response.data.code === 'token_not_valid') {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('user');

            // Redirect the user to the login page
            window.location.href = '/login';
          }

          return Promise.reject(error);
        }
      }
  
      return Promise.reject(error);
    }
  );
  

export default api
