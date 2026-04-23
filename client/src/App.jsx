import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [notas, setNotas] = useState([]);

  const obtenerNotas = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notas');
      setNotas(res.data);
    } catch (error) {
      console.error("Error al traer notas:", error);
    }
  };

  useEffect(() => {
    obtenerNotas();
  }, []);

  return (
    <div className="min-h-screen bg-base-300 p-10 flex flex-col items-center gap-8">
      {/* Encabezado Estilo Glow */}
      <div className="text-center">
        <h1 className="text-5xl font-black text-primary drop-shadow-md mb-2">
          MODO GLOW ACTIVADO
        </h1>
        <div className="badge badge-success gap-2 font-bold p-4">
          Tailwind v4 + daisyUI
        </div>
      </div>

      {/* Panel de Estadísticas */}
      <div className="stats shadow-xl bg-base-100">
        <div className="stat">
          <div className="stat-title">Estado de Red</div>
          <div className="stat-value text-success uppercase text-2xl">Conectado</div>
          <div className="stat-desc">Backend: localhost:5000</div>
        </div>
        <div className="stat">
          <div className="stat-title">Notas Cargadas</div>
          <div className="stat-value text-primary">{notas.length}</div>
          <div className="stat-desc">Sincronizado</div>
        </div>
      </div>

      {/* Galería de Botones para confirmar estilos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button class="btn btn-primary">Button</button>
      </div>

      {/* Listado de Notas (Si hay) */}
      {notas.length > 0 && (
        <div className="w-full max-w-2xl grid gap-4">
          {notas.map(nota => (
            <div key={nota.id} className="alert shadow-lg bg-base-100 border-l-4 border-primary">
              <div>
                <h3 className="font-bold">{nota.titulo}</h3>
                <div className="text-xs">{nota.contenido}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App