import React, { useState } from 'react';
import { crearEstudiante } from '../../services/estudianteServices';
import { validarSoloLetras, validarEmail, filtrarSoloLetras } from '../../utils/validaciones';

const FormularioEstudiante = ({ onEstudianteCreado }) => {
    const [formData, setFormData] = useState({ nombre: '', apellido: '', email: '' });
    const [errors, setErrors] = useState({ nombre: '', apellido: '', email: '' });
    const [loading, setLoading] = useState(false);

 const handleChange = (e) => {
    const { name, value } = e.target;    
    let valorProcesado = value;
        if (name === 'nombre' || name === 'apellido') {
            valorProcesado = filtrarSoloLetras(value);
        }   
        setFormData({ ...formData, [name]: valorProcesado });
            if (valorProcesado.trim() === '') {
                setErrors(prev => ({ ...prev, [name]: 'Este campo es obligatorio' }));
            } else if (name === 'email' && !validarEmail(valorProcesado)) {
                setErrors(prev => ({ ...prev, [name]: 'El formato de correo no es válido' }));
            } else {
                setErrors(prev => ({ ...prev, [name]: '' }));
        }
};

    const handleSubmit = async (e) => {
        e.preventDefault();

        let unError = false;
        let nuevosErrores = { nombre: '', apellido: '', email: '' };

        if (!validarSoloLetras(formData.nombre)) {
            nuevosErrores.nombre = 'El nombre solo debe contener letras.';
            unError = true;
        }
        if (!validarSoloLetras(formData.apellido)) {
            nuevosErrores.apellido = 'El apellido solo debe contener letras.';
            unError = true;
        }
        if (!validarEmail(formData.email)) {
            nuevosErrores.email = 'Introduce un correo electrónico válido.';
            unError = true;
        }

        if (unError) {
            setErrors(nuevosErrores);
            return;
        }

        setLoading(true);
        try {
            await crearEstudiante(formData);
            setFormData({ nombre: '', apellido: '', email: '' });
            setErrors({ nombre: '', apellido: '', email: '' });
            if (onEstudianteCreado) onEstudianteCreado();
            alert("Estudiante registrado con éxito");
        } catch (error) {
            console.error("Error al crear estudiante:", error);
            alert("Hubo un error al registrar al estudiante");
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
                        <label className="label"><span className="label-text font-semibold">Nombre</span></label>
                        <input 
                            type="text" name="nombre" placeholder="Ej. Ana" 
                            className={`input input-bordered w-full ${errors.nombre ? 'input-error' : 'input-primary'}`} 
                            value={formData.nombre} onChange={handleChange} required 
                        />
                        {errors.nombre && (
                            <label className="label py-1"><span className="label-text-alt text-error font-medium">{errors.nombre}</span></label>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Apellido</span></label>
                        <input 
                            type="text" name="apellido" placeholder="Ej. Pérez" 
                            className={`input input-bordered w-full ${errors.apellido ? 'input-error' : 'input-primary'}`} 
                            value={formData.apellido} onChange={handleChange} required 
                        />
                        {errors.apellido && (
                            <label className="label py-1"><span className="label-text-alt text-error font-medium">{errors.apellido}</span></label>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Correo Electrónico</span></label>
                        <input 
                            type="email" name="email" placeholder="tucorreoaqui@ejemplo.com" 
                            className={`input input-bordered w-full ${errors.email ? 'input-error' : 'input-primary'}`} 
                            value={formData.email} onChange={handleChange} required 
                        />
                        {errors.email && (
                            <label className="label py-1"><span className="label-text-alt text-error font-medium">{errors.email}</span></label>
                        )}
                    </div>

                    <div className="card-actions justify-end mt-6">
                        <button 
                            type="submit" 
                            className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                            disabled={loading || Object.values(errors).some(err => err !== '')}
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