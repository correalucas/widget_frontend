import config from 'config';
import axios from 'axios';
import { authHeader } from '../_helpers';

export const userService = {
  signup,
  changePassword,
  checkEmail,
  resetPassword,
  myProfile,
  update,
  show
};

function signup(params) {
  return axios.post(`${config.apiUrl}/signup`, params)
    .catch(handleResponse)
    .then(auth => {
      if(auth !== undefined){
        localStorage.setItem('auth', JSON.stringify(auth.data.token));
        window.location.reload(true);
        return auth.data;
      }
    });
}

function changePassword(params) {
  let auth = JSON.parse(localStorage.getItem('auth'));
  axios.defaults.headers.common['Authorization'] = authHeader();
  return axios.post(`${config.apiUrl}/change_password`, params)
    .catch(handleResponse)
    .then(auth => {
      localStorage.setItem('auth', JSON.stringify(auth.data.token));
      window.location.reload(true);
      return auth.data;
    });
}

function checkEmail(params) {
  return axios.get(`${config.apiUrl}/check_email`, params)
    .catch(handleResponse)
    .then(auth => {
      return auth.data;
    });
}

function resetPassword(params) {
  return axios.post(`${config.apiUrl}/reset_password`, params)
    .catch(handleResponse)
    .then(auth => {
      return auth.data;
    });
}

function myProfile() {
  axios.defaults.headers.common['Authorization'] = authHeader();
  return axios.get(`${config.apiUrl}/my_profile`)
    .catch(handleResponse)
    .then(auth => {
      return auth.data;
    });
}

function update(params) {
  axios.defaults.headers.common['Authorization'] = authHeader();
  return axios.put(`${config.apiUrl}/my_profile`, params)
    .catch(handleResponse)
    .then(auth => {
      return auth.data;
    });
}

function show(id) {
  axios.defaults.headers.common['Authorization'] = authHeader();
  return axios.get(`${config.apiUrl}/users/${id}`)
    .catch(handleResponse)
    .then(auth => {
      return auth.data;
    });
}


function handleResponse(r) {
  let auth = localStorage.getItem('auth');
  if (r.response.status !== 200) {
    if (r.response.status === 401) {
      // auto logout if 401 response returned from api
      auth ? refresh() : logout();
      window.location.reload(true);
    }
    const error = (r.response.data && r.response.data.message) || response.statusText;
    return Promise.reject(error);
  }
}