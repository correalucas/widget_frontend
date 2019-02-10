import config from 'config';
import axios from 'axios';
import { authHeader } from '../_helpers';

export const authService = {
  login,
  logout,
  refresh
};

function login(username, password) {
  return axios.post(`${config.apiUrl}/auth/login`, { username, password })
    .catch(handleResponse)
    .then(auth => {
      if(auth !== undefined){
        localStorage.setItem('auth', JSON.stringify(auth.data.token));
        window.location.reload(true);
        return auth.data;
      }
    });
}

function refresh() {
  let auth = JSON.parse(localStorage.getItem('auth'));
  axios.defaults.headers.common['Authorization'] = authHeader()
  return axios.post(`${config.apiUrl}/auth/refresh`, { refresh_token: auth.refresh_token })
    .catch(handleResponse)
    .then(auth => {
      localStorage.setItem('auth', JSON.stringify(auth.data.token));

      return auth;
    });
}

function logout() {
  let auth = JSON.parse(localStorage.getItem('auth'));
  axios.defaults.headers.common['Authorization'] = authHeader()
  return axios.post(`${config.apiUrl}/auth/logout`, { token: auth.access_token })
    .catch(handleResponse)
    .then(auth => {
      localStorage.removeItem('auth');
      window.location.reload(true);
    });
}

function handleResponse(r) {
  let auth = localStorage.getItem('auth');
  if (!r.statusText == 'OK') {
    if (r.response.status === 401) {
      // auto logout if 401 response returned from api
      auth ? refresh() : logout();
      window.location.reload(true);
    }
    const error = (r.response.data && r.response.data.message) || response.statusText;
    return Promise.reject(error);
  }
}