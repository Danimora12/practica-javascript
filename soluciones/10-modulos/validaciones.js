// SOLUCIÓN 10-modulos · ejercicio 1: exports nombrados

export function esEmail(texto) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
}

export function esTelefonoCR(texto) {
    const soloDigitos = texto.replace(/[\s-]/g, ""); // acepta "8888-8888" o "8888 8888"
    return /^\d{8}$/.test(soloDigitos);
}
