import * as XLSX from 'xlsx';

export const descargarExcelEstudiante = (estudiante, notas) => {
    const datosExcel = notas.map(n => ({
        Materia: n.materia,
        Sección: n.seccion,
        Calificación: n.calificacion
    }));

    const promedio = notas.reduce((acc, curr) => acc + parseFloat(curr.calificacion), 0) / notas.length;
    datosExcel.push({ Materia: 'PROMEDIO FINAL', Sección: '-', Calificación: promedio.toFixed(2) });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datosExcel);
    
    XLSX.utils.book_append_sheet(wb, ws, "Calificaciones");
    
    XLSX.writeFile(wb, `Reporte_${estudiante.nombre}_${estudiante.apellido}.xlsx`);
};