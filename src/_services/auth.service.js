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
        localStorage.setItem('auth', JSON.stringify(auth.data));
        window.location.reload(true);
        return auth.data;
      }
    });
}

function refresh() {
  let auth = localStorage.getItem('auth');

  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ refresh_token: auth.token.refresh_token })
  };

  return fetch(`${config.apiUrl}/auth/refresh`, requestOptions)
    .then(handleResponse)
    .then(auth => {
      localStorage.setItem('auth', JSON.stringify(auth));

      return auth;
    });
}

function logout() {
  let auth = JSON.parse(localStorage.getItem('auth'));
  axios.defaults.headers.common['Authorization'] = authHeader()
  console.log();
  return axios.post(`${config.apiUrl}/auth/logout`, { token: auth.token.access_token })
    .then(handleResponse)
    .then(auth => {
      localStorage.removeItem('auth');
      window.location.reload(true);
    });
}

function handleResponse(r) {
  console.log(r)
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