import axios from 'axios';
const baseUrl = '/api/notes';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAllNotes = () => {
  const response = axios.get(baseUrl);
  return response.then(response => response.data);
};

const createNote = async newObject => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updateNote = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

const deleteNote = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};

const noteService = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  setToken
};

export default noteService;