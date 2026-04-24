import React from 'react';

const ListaEstudiantes = ({ estudiantes }) => {
    return (
        <div className="overflow-x-auto w-full shadow-lg rounded-lg border border-base-200 mt-8">
            <table className="table w-full">
                {/* Cabecera */}
                <thead className="bg-base-200">
                    <tr>
                        <th className="text-primary">ID</th>
                        <th>Nombre Completo</th>
                        <th>Email</th>
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
                                    <button className="btn btn-ghost btn-xs text-error">Eliminar</button>
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