import React, { useState, useEffect } from 'react';
import FormularioEstudiante from '../components/Estudiantes/FormularioEstudiante';
import ListaEstudiantes from '../components/Estudiantes/ListaEstudiante';
import FormularioNota from '../components/Notas/FormularioNota';
import { getEstudiantes } from '../services/estudianteServices';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [estudiantes, setEstudiantes] = useState([]);

    // Función para refrescar la lista de estudiantes
    const cargarDatos = async () => {
        try {
            const { data } = await getEstudiantes();
            setEstudiantes(data);
        } catch (error) {
            console.error("Error al sincronizar datos:", error);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Encabezado del Dashboard */}
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-primary mb-2">Sistema Académico</h1>
                    <p className="text-base-content/60">Gestión de Alumnos y Calificaciones de Secundaria</p>
                </header>

                {/* Navegación por Pestañas */}
                <div className="tabs tabs-boxed justify-center mb-8 bg-base-100 p-2 shadow-sm">
                    <button 
                        className={`tab tab-lg ${activeTab === 0 ? 'tab-active !bg-primary !text-white' : ''}`}
                        onClick={() => setActiveTab(0)}
                    >
                        👥 Estudiantes
                    </button>
                    <button 
                        className={`tab tab-lg ${activeTab === 1 ? 'tab-active !bg-secondary !text-white' : ''}`}
                        onClick={() => setActiveTab(1)}
                    >
                        📝 Cargar Notas
                    </button>
                </div>

                {/* Contenido Dinámico */}
                <main className="animate-fadeIn">
                    {activeTab === 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <FormularioEstudiante onEstudianteCreado={cargarDatos} />
                            </div>
                            <div className="lg:col-span-2">
                                <ListaEstudiantes estudiantes={estudiantes} />
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto">
                            <FormularioNota onNotaCreada={() => alert("¡Nota sincronizada con el servidor!")} />
                        </div>
                    )}
                </main>

            </div>
        </div>
    );
};

export default Dashboard;