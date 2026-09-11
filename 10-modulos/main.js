/**
 * ============================================================
 *  10 · MÓDULOS (import / export) — archivo principal (main.js)
 * ============================================================
 *  ⭐ Todo proyecto de React está hecho de módulos:
 *     import { useState } from "react";
 *     import Boton from "./components/Boton";
 *
 *  CÓMO EJECUTAR ESTE ARCHIVO
 *  - Navegador: los módulos NO funcionan abriendo index.html con doble clic
 *    (file://) por seguridad (CORS). Usa la extensión "Live Server" de VS Code:
 *    clic derecho en index.html → "Open with Live Server" y elige este archivo.
 *  - Node: en la terminal, dentro de esta carpeta → node main.js
 *    (funciona gracias al package.json con "type": "module").
 *
 *  REGLAS
 *  - Las rutas relativas empiezan con ./ o ../ y en el navegador llevan .js
 *    (en React con Vite puedes omitir la extensión).
 *  - Los import van al inicio del archivo.
 *  - Los módulos siempre están en modo estricto.
 */

// --- Import nombrado: los nombres deben coincidir, entre { } -------------------------------------
import { sumar, multiplicar, PI, conIva } from "./matematicas.js";

// --- Import con alias (as) ---------------------------------------------------------------------------
import { promedio as calcularPromedio, redondearA } from "./matematicas.js";

// --- Import default: sin llaves, el nombre lo eliges tú ---------------------------------------------------
import Calculadora from "./matematicas.js";
import saludar, { formatearMoneda, formatearFecha } from "./formato.js"; // default + nombrados juntos

// --- Importar TODO como un objeto -------------------------------------------------------------------------
import * as Mate from "./matematicas.js";

console.log(sumar(2, 3), multiplicar(4, 5), PI);
console.log("Con IVA:", conIva(10000));
console.log("Promedio:", redondearA(calcularPromedio(80, 91, 77), 1));

const calc = new Calculadora();
calc.calcular(6, "*", 7);
calc.calcular(10, "+", 5);
console.log(calc.historial);

console.log(saludar("daniel"));
console.log(formatearMoneda(1250000), "|", formatearMoneda(99.5, "USD"));
console.log(formatearFecha("2026-09-10T12:00:00"));

console.log(Object.keys(Mate)); // todo lo exportado
console.log(Mate.sumar(1, 1));

// console.log(IVA); // ❌ ReferenceError: IVA no se exportó, es privado del módulo

// --- Import dinámico: cargar un módulo solo cuando se necesita --------------------------------------------
const cargarFormato = async () => {
    const modulo = await import("./formato.js");
    console.log("Import dinámico:", modulo.capitalizar("carga diferida"));
};
cargarFormato();
// 💡 React usa esto para "lazy loading": const Pagina = lazy(() => import("./Pagina"));

/*
 *  RESUMEN
 *  | Exportar                          | Importar                                  |
 *  |-----------------------------------|-------------------------------------------|
 *  | export const x = 1;               | import { x } from "./archivo.js";         |
 *  | export function f() {}            | import { f } from "./archivo.js";         |
 *  | export { a as b };                | import { b } from "./archivo.js";         |
 *  | export default function App() {}  | import App from "./archivo.js";           |
 *  | (todo)                            | import * as Todo from "./archivo.js";     |
 *  | librería de npm                   | import { useState } from "react";         |
 *
 *  Convención en React: un componente por archivo, exportado por default.
 */


/* ============================================================
 *  EJERCICIOS  (soluciones en soluciones/10-modulos/)
 * ============================================================
 *  1. Crea `validaciones.js` con los exports nombrados `esEmail(texto)` y
 *     `esTelefonoCR(texto)` (8 dígitos). Impórtalos aquí y pruébalos.
 *  2. Crea `Usuario.js` con una clase exportada por default. Impórtala aquí
 *     con el nombre `Persona`.
 *  3. Importa `formatearMoneda` con el alias `aColones`.
 */
