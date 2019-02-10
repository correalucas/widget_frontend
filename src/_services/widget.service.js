import config from 'config';
import axios from 'axios';
import { authHeader } from '../_helpers';

export const widgetService = {
  widgets,
  visibles,
  myWidgets,
  userWidgets,
  create,
  update,
  destroy
};

function create(params) {
  axios.defaults.headers.common['Authorization'] = authHeader();
  return axios.post(`${config.apiUrl}/widgets`, params)
    .catch(handleResponse)
    .then(auth => {
      return auth.data;
    });
}

function update(id, params) {
  axios.defaults.headers.common['Authorization'] = authHeader();
  return axios.put(`${config.apiUrl}/widgets/${id}`, params)
    .catch(handleResponse)
    .then(auth => {
      return auth.data;
    });
}

function destroy(id) {
  axios.defaults.headers.common['Authorization'] = authHeader();
  return axios.delete(`${config.apiUrl}/widgets/${id}`)
    .catch(handleResponse)
    .then(auth => {
      return auth.data;
    });
}

function myWidgets(params) {
  axios.defaults.headers.common['Authorization'] = authHeader();
  return axios.get(`${config.apiUrl}/my_widgets`, {params: params})
    .catch(handleResponse)
    .then(auth => {
      return auth.data;
    });
}

function userWidgets(userId, params) {
  axios.defaults.headers.common['Authorization'] = authHeader();
  return axios.get(`${config.apiUrl}/users/${userId}/widgets`, {params: params})
    .catch(handleResponse)
    .then(auth => {
      return auth.data;
    });
}

function visibles(params) {
  axios.defaults.headers.common['Authorization'] = authHeader();
  return axios.get(`${config.apiUrl}/widgets/visible`, {params: params})
    .catch(handleResponse)
    .then(auth => {
      return auth.data;
    });
}

function widgets() {
  axios.defaults.headers.common['Authorization'] = authHeader();
  return axios.get(`${config.apiUrl}/widgets`)
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