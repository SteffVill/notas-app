import React from 'react';
import { descargarExcelEstudiante } from '../../services/reporteService';

const CuadriculaReportes = ({ estudiantes, notas }) => {
    
    const obtenerNotasEstudiante = (id) => notas.filter(n => n.estudianteId === id);

    const calcularPromedio = (notasEst) => {
        if (notasEst.length === 0) return 0;
        const suma = notasEst.reduce((acc, curr) => acc + parseFloat(curr.calificacion), 0);
        return (suma / notasEst.length).toFixed(2);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {estudiantes.map(est => {
                const notasEst = obtenerNotasEstudiante(est.id);
                const promedio = calcularPromedio(notasEst);

                return (
                    <div key={est.id} className="card bg-base-100 shadow-xl border border-base-300">
                        <div className="card-body p-5">
                            <div className="flex justify-between items-start">
                                <h2 className="card-title text-primary">{est.nombre} {est.apellido}</h2>
                                <div className={`badge ${promedio >= 10 ? 'badge-success' : 'badge-error'} text-white`}>
                                    Promedio: {promedio}
                                </div>
                            </div>
                            
                            <div className="divider my-1"></div>
                            
                            <div className="space-y-2 min-h-[100px]">
                                {notasEst.length > 0 ? (
                                    notasEst.map((n, idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span>{n.materia}</span>
                                            <span className="font-mono font-bold">{n.calificacion}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs italic opacity-50">Sin notas registradas</p>
                                )}
                            </div>

                            <div className="card-actions justify-end mt-4">
                                <button 
                                    className="btn btn-outline btn-success btn-sm gap-2"
                                    onClick={() => descargarExcelEstudiante(est, notasEst)}
                                    disabled={notasEst.length === 0}
                                >
                                    📥 Excel
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CuadriculaReportes;