import axios from 'axios';
import { store } from '@store/store';
import { logout, updateActivity } from "@store/Auth/LoginSlice"

const SESSION_TIMEOUT =24 * 60 * 60 * 1000; 

const api = axios.create({
  baseURL: 'https://shopcart-back-end.onrender.com',
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const { token, lastActivity } = state.login;

    if (token) {
      const isExpired =
        !lastActivity || Date.now() - lastActivity > SESSION_TIMEOUT;

      if (isExpired) {
        store.dispatch(logout());

       

        return Promise.reject(new Error('Session expired'));
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => { store.dispatch(updateActivity());
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
     
    }
    return Promise.reject(error);
  }
);

export default api;