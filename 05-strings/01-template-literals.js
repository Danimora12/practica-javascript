/**
 * ============================================================
 *  05-01 · TEMPLATE LITERALS (plantillas de texto)
 * ============================================================
 *  Se escriben con backticks ` ` (AltGr + } en teclado español latino,
 *  o Alt + 96 en Windows).
 *
 *  - ${expresión} inserta cualquier expresión JS dentro del texto.
 *  - Permiten saltos de línea reales.
 *  - Reemplazan la concatenación con + (más legible y menos errores).
 */

const nombre = "Daniel";
const producto = "Café";
const precio = 2500;
const cantidad = 3;

// --- Concatenación vs template literal ------------------------------------
console.log("Hola " + nombre + ", compraste " + cantidad + " " + producto + ".");
console.log(`Hola ${nombre}, compraste ${cantidad} ${producto}.`); // ✅

// --- Cualquier expresión dentro de ${} -------------------------------------
console.log(`Total: ₡${precio * cantidad}`);
console.log(`Con IVA: ₡${(precio * cantidad * 1.13).toFixed(2)}`);
console.log(`Nombre en mayúsculas: ${nombre.toUpperCase()}`);
console.log(`Estado: ${cantidad > 0 ? "con productos" : "vacío"}`);   // ternario
console.log(`Items: ${["pan", "café"].join(", ")}`);

function formatearMoneda(monto) {
    return `₡${monto.toLocaleString("es-CR")}`;
}
console.log(`Saldo disponible: ${formatearMoneda(1250000)}`); // llamar funciones

// --- Multilínea ------------------------------------------------------------
const ticket = `
=========================
  Tienda La Esquina
=========================
Cliente:  ${nombre}
Producto: ${producto} x${cantidad}
Total:    ${formatearMoneda(precio * cantidad)}
=========================`;
console.log(ticket);

// --- Construir HTML (antes de React se hacía así) --------------------------
const usuario = { nombre: "Ana", rol: "admin", activo: true };
const tarjetaHTML = `
<div class="tarjeta ${usuario.activo ? "activa" : "inactiva"}">
  <h2>${usuario.nombre}</h2>
  <span>${usuario.rol}</span>
</div>`;
console.log(tarjetaHTML);
// ⚠️ Insertar texto del usuario con innerHTML es un riesgo de seguridad (XSS).
//    React lo resuelve escapando el texto automáticamente.

// --- Uso típico en React ---------------------------------------------------
const esActivo = true;
const tamano = "grande";
const clases = `boton boton--${tamano} ${esActivo ? "boton--activo" : ""}`;
console.log(clases);  // en JSX: <button className={clases}>

const id = 42;
const url = `https://jsonplaceholder.typicode.com/users/${id}`;
console.log(url);     // en React: fetch(`${API_URL}/users/${id}`)

// --- Escapar caracteres ----------------------------------------------------
console.log(`Un backtick: \` y un símbolo de dólar literal: \${noSeEvalua}`);
console.log("Comillas \"dobles\" dentro de dobles y salto\nde línea con \\n");


/* ============================================================
 *  EJERCICIOS  (soluciones en soluciones/05-strings.js)
 * ============================================================
 *  1. Dado un objeto `pelicula = { titulo, anio, rating }`, imprime:
 *     "Inception (2010) - ⭐ 8.8/10" usando template literal.
 *  2. Crea `generarFactura(cliente, items)` donde items es un array de
 *     { nombre, precio }. Devuelve un texto multilínea con cada item y el total.
 *  3. Construye la URL `https://api.tienda.com/productos?categoria=X&pagina=Y`
 *     con variables categoria y pagina.
 */
