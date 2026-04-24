import api from './axiosConfig';

export const getNotas = () => api.get('/notas');
export const crearNota = (data) => api.post('/notas', data);
export const eliminarNota = (id) => api.delete(`/notas/${id}`);
export const actualizarNota = (id, data) => api.put(`/notas/${id}`, data);