import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [notas, setNotas] = useState([]);

  // Función para obtener las notas del backend
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
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Mis Notas 📝</h1>
      
      {/* Aquí irá el formulario más adelante */}
      
      <hr />

      <div className="lista-notas">
        {notas.length === 0 ? (
          <p>No hay notas todavía. ¡Crea la primera!</p>
        ) : (
          notas.map(nota => (
            <div key={nota.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
              <h3>{nota.titulo}</h3>
              <p>{nota.contenido}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App