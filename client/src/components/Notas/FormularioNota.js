import React, { useState, useEffect } from 'react';
import { getEstudiantes } from '../../services/estudianteService';
import { crearNota } from '../../services/notaService';

const FormularioNota = ({ onNotaCreada }) => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        estudianteId: '',
        materia: '',
        seccion: '',
        calificacion: ''
    });

    // Cargamos los estudiantes al montar el componente para el Select
    useEffect(() => {
        const cargarEstudiantes = async () => {
            try {
                const { data } = await getEstudiantes();
                setEstudiantes(data);
            } catch (error) {
                console.error("Error cargando estudiantes:", error);
            }
        };
        cargarEstudiantes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await crearNota(formData);
            setFormData({ estudianteId: '', materia: '', seccion: '', calificacion: '' });
            if (onNotaCreada) onNotaCreada();
            alert("¡Calificación guardada exitosamente!");
        } catch (error) {
            console.error("Error al guardar nota:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card w-full max-w-2xl bg-base-100 shadow-2xl border border-primary/20 mx-auto mt-10">
            <div className="card-body">
                <h2 className="card-title text-secondary justify-center text-2xl font-bold mb-6">
                    Asignar Calificación de Secundaria
                </h2>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Selector de Estudiante */}
                    <div className="form-control col-span-1 md:col-span-2">
                        <label className="label">
                            <span className="label-text font-bold">Seleccionar Estudiante</span>
                        </label>
                        <select 
                            className="select select-bordered select-primary w-full"
                            value={formData.estudianteId}
                            onChange={(e) => setFormData({...formData, estudianteId: e.target.value})}
                            required
                        >
                            <option value="">¿A quién evaluamos?</option>
                            {estudiantes.map(est => (
                                <option key={est.id} value={est.id}>
                                    {est.nombre} {est.apellido}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Materia */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Materia</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Ej. Física, Química..." 
                            className="input input-bordered w-full focus:input-secondary"
                            value={formData.materia}
                            onChange={(e) => setFormData({...formData, materia: e.target.value})}
                            required 
                        />
                    </div>

                    {/* Sección */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Sección</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Ej. 5to Año B" 
                            className="input input-bordered w-full focus:input-secondary"
                            value={formData.seccion}
                            onChange={(e) => setFormData({...formData, seccion: e.target.value})}
                            required 
                        />
                    </div>

                    {/* Calificación */}
                    <div className="form-control col-span-1 md:col-span-2">
                        <label className="label">
                            <span className="label-text font-bold">Calificación Final (0 - 20)</span>
                        </label>
                        <input 
                            type="number" 
                            step="0.1" 
                            min="0" 
                            max="20"
                            placeholder="18.5" 
                            className="input input-bordered input-secondary w-full text-center text-xl font-bold"
                            value={formData.calificacion}
                            onChange={(e) => setFormData({...formData, calificacion: e.target.value})}
                            required 
                        />
                    </div>

                    <div className="card-actions justify-center mt-6 col-span-1 md:col-span-2">
                        <button 
                            type="submit" 
                            className={`btn btn-secondary btn-wide ${loading ? 'loading' : ''}`}
                            disabled={loading || !formData.estudianteId}
                        >
                            {loading ? 'Procesando...' : 'Guardar en Historial'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioNota;