/**
 * ============================================================
 *  05-03 · MATH, FORMATO DE NÚMEROS Y FECHAS
 * ============================================================
 *  Math → objeto con funciones matemáticas (no se usa con new).
 *  Intl.NumberFormat / toLocaleString → formatear moneda y números.
 *  Date → fechas y horas.
 *
 *  Muy útil para proyectos de PYMEs: precios en colones, facturas, reportes.
 */

// --- Redondeo -------------------------------------------------------------
console.log(Math.round(4.5));   // 5 → al más cercano
console.log(Math.round(4.4));   // 4
console.log(Math.floor(4.9));   // 4 → hacia abajo
console.log(Math.ceil(4.1));    // 5 → hacia arriba
console.log(Math.trunc(-4.7));  // -4 → quita decimales

// Redondear a 2 decimales
const monto = 1234.5678;
console.log(monto.toFixed(2));                  // "1234.57" (string)
console.log(Math.round(monto * 100) / 100);     // 1234.57  (number)

// --- Otros métodos útiles -------------------------------------------------
console.log(Math.max(3, 9, 1), Math.min(3, 9, 1)); // 9 1
const notas = [70, 95, 82];
console.log(Math.max(...notas));  // 95 (spread para usar un array)
console.log(Math.abs(-15));       // 15
console.log(Math.sqrt(81));       // 9
console.log(Math.PI);

// --- Números aleatorios ---------------------------------------------------
console.log(Math.random()); // entre 0 (incluido) y 1 (excluido)

function enteroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // min y max incluidos
}
console.log("Dado:", enteroAleatorio(1, 6));

const colores = ["rojo", "verde", "azul"];
console.log("Color aleatorio:", colores[Math.floor(Math.random() * colores.length)]);

// --- Formato de moneda y números ⭐ ----------------------------------------
const precio = 1250000.5;
console.log(precio.toLocaleString("es-CR"));  // "1 250 000,5" (formato local)

const colones = new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC" });
const dolares = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
console.log(colones.format(precio));  // "₡1 250 000,50"
console.log(dolares.format(2450.9));  // "$2,450.90"

const porcentaje = new Intl.NumberFormat("es-CR", { style: "percent", maximumFractionDigits: 1 });
console.log(porcentaje.format(0.137)); // "13,7%"

// --- Validar números ------------------------------------------------------
console.log(Number.isInteger(5), Number.isInteger(5.5)); // true false
console.log(Number.isNaN(Number("abc")));                // true
console.log(Number.parseFloat("12.5kg"));                 // 12.5

// --- Fechas: Date -----------------------------------------------------------
const ahora = new Date();
console.log("Ahora:", ahora);
console.log("Año:", ahora.getFullYear());
console.log("Mes:", ahora.getMonth() + 1); // ⚠️ los meses van de 0 (enero) a 11
console.log("Día:", ahora.getDate());
console.log("Día de la semana:", ahora.getDay()); // 0 = domingo

// Crear una fecha específica
const lanzamiento = new Date(2026, 11, 25);      // 25 de DICIEMBRE (mes 11)
const desdeTexto = new Date("2026-12-25T10:30:00");
console.log(lanzamiento.toDateString(), "|", desdeTexto.toISOString());

// Formatear fechas en español
console.log(ahora.toLocaleDateString("es-CR"));  // ej. "10/9/2026"
console.log(ahora.toLocaleDateString("es-CR", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
}));                                             // ej. "jueves, 10 de septiembre de 2026"
console.log(ahora.toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit" }));

// Diferencia entre fechas (en milisegundos)
const inicio = new Date("2026-01-01");
const fin = new Date("2026-03-15");
const dias = (fin - inicio) / (1000 * 60 * 60 * 24);
console.log("Días entre fechas:", dias); // 73

// Sumar días
const vence = new Date(inicio);
vence.setDate(vence.getDate() + 30);
console.log("Vence:", vence.toLocaleDateString("es-CR"));

// Timestamp (útil como id simple o para medir tiempo)
console.log("Timestamp:", Date.now());
// 💡 Para fechas complejas en proyectos reales se usan librerías como date-fns o dayjs.


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. `formatearColones(monto)` que devuelva el monto en formato ₡ con Intl.
 *  2. `calcularEdad(fechaNacimiento)` que reciba "1995-06-20" y devuelva la
 *     edad en años (aproximada está bien).
 *  3. `generarCodigo()` que devuelva un código de 6 dígitos aleatorio como
 *     string, con ceros a la izquierda si hace falta (ej. "004521").
 */
