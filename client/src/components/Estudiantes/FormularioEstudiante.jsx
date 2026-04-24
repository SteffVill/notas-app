import React, { useState } from 'react';
import { crearEstudiante } from '../../services/estudianteServices';

const FormularioEstudiante = ({ onEstudianteCreado }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await crearEstudiante(formData);
            setFormData({ nombre: '', apellido: '', email: '' }); // Limpiar formulario
            if (onEstudianteCreado) onEstudianteCreado();
            // Aquí podrías usar una alerta de DaisyUI o SweetAlert2
            alert("Estudiante registrado con éxito");
        } catch (error) {
            console.error("Error al crear estudiante:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card w-full max-w-lg bg-base-100 shadow-xl border border-base-300 mx-auto">
            <div className="card-body">
                <h2 className="card-title text-primary justify-center text-2xl font-bold mb-4">
                    Registro de Estudiante
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Nombre</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Ej. Ana" 
                            className="input input-bordered input-primary w-full" 
                            value={formData.nombre}
                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                            required 
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Apellido</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Ej. Pérez" 
                            className="input input-bordered input-primary w-full" 
                            value={formData.apellido}
                            onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                            required 
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Correo Electrónico</span>
                        </label>
                        <input 
                            type="email" 
                            placeholder="tucorreoaqui@ejemplo.com" 
                            className="input input-bordered input-primary w-full" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required 
                        />
                    </div>

                    <div className="card-actions justify-end mt-6">
                        <button 
                            type="submit" 
                            className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioEstudiante;