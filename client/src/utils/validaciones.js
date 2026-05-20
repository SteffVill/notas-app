export const validarSoloLetras = (texto) => {
    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regexLetras.test(texto);
};

export const validarEmail = (correo) => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(correo);
};

export const filtrarSoloLetras = (texto) => {
    return texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
};