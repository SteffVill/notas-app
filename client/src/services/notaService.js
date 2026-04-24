import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notas';

export const getNotas = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createNota = async (nota) => {
  const res = await axios.post(API_URL, nota);
  return res.data;
};

export const deleteNota = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};