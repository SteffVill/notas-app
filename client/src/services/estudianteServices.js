import api from './axiosConfig';

export const getEstudiantes = () => api.get('/estudiantes');
export const getEstudianteById = (id) => api.get(`/estudiantes/${id}`);
export const crearEstudiante = (data) => api.post('/estudiantes', data);
export const actualizarEstudiante = (id, data) => api.put(`/estudiantes/${id}`, data);
export const eliminarEstudiante = (id) => api.delete(`/estudiantes/${id}`);