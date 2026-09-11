/**
 * ============================================================
 *  10 · MÓDULOS — segundo archivo que EXPORTA (formato.js)
 * ============================================================
 *  Estructura típica de un proyecto React:
 *    src/
 *      components/Boton.jsx        → export default function Boton() {}
 *      utils/formato.js            → export function formatearMoneda() {}
 *      services/api.js             → export async function obtenerUsuarios() {}
 */

export function formatearMoneda(monto, moneda = "CRC") {
    return new Intl.NumberFormat("es-CR", { style: "currency", currency: moneda }).format(monto);
}

export function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString("es-CR", { day: "numeric", month: "long", year: "numeric" });
}

export const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

// Default export como función (así se exportan los componentes de React)
export default function saludar(nombre) {
    return `¡Hola, ${capitalizar(nombre)}!`;
}
