/**
 * ============================================================
 *  10 · MÓDULOS — archivo que EXPORTA (matematicas.js)
 * ============================================================
 *  Un módulo es un archivo JS con su propio alcance: nada es visible
 *  desde afuera a menos que lo EXPORTES.
 *
 *  Export NOMBRADO → puede haber muchos por archivo. Se importan con { llaves }
 *  Export DEFAULT  → uno solo por archivo. Se importa con el nombre que quieras.
 *
 *  ⚠️ Este archivo NO se ejecuta solo: lo usa main.js. Abre main.js.
 */

// --- Exports nombrados ----------------------------------------------------------------------
export const PI = 3.1416;

export function sumar(a, b) {
    return a + b;
}

export const multiplicar = (a, b) => a * b;

// Variable privada del módulo: NO se exporta, nadie de afuera la ve
const IVA = 0.13;

export function conIva(monto) {
    return Math.round(monto * (1 + IVA));
}

// También se puede exportar al final, en una lista
function promedio(...numeros) {
    return numeros.reduce((acc, n) => acc + n, 0) / numeros.length;
}
function redondear(numero, decimales = 2) {
    return Number(numero.toFixed(decimales));
}
export { promedio, redondear as redondearA }; // exportar con otro nombre

// --- Export default (uno por archivo) ------------------------------------------------------------
export default class Calculadora {
    constructor() {
        this.historial = [];
    }
    calcular(a, operador, b) {
        const operaciones = { "+": sumar, "*": multiplicar };
        const resultado = operaciones[operador]?.(a, b) ?? NaN;
        this.historial.push(`${a} ${operador} ${b} = ${resultado}`);
        return resultado;
    }
}
