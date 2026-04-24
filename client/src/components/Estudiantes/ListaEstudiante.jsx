import React from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
const ListaEstudiantes = ({ estudiantes }) => {
    return (
        <div className="overflow-x-auto w-full shadow-lg rounded-lg border border-base-200 mt-8">
            <table className="table w-full">
                {/* Cabecera */}
                <thead className="bg-blue-700/10 text-blue-900">
                    <tr>
                        <th className="text-primary">ID</th>
                        <th>Nombre Completo</th>
                        <th>Correo Electrónico</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center py-4 italic text-base-content/50">
                                No hay estudiantes registrados aún.
                            </td>
                        </tr>
                    ) : (
                        estudiantes.map((est) => (
                            <tr key={est.id} className="hover">
                                <th className="text-base-content/70">{est.id}</th>
                                <td>
                                    <div className="font-bold">{est.nombre} {est.apellido}</div>
                                </td>
                                <td>{est.email}</td>
                                <td className="text-center">
                                    <div className="tooltip tooltip-top" data-tip="Eliminar estudiante">
                                        <button className="btn btn-error btn-xs text-white"><RiDeleteBinLine /></button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListaEstudiantes;