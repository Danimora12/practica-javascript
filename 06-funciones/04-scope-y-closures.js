/**
 * ============================================================
 *  06-04 · SCOPE (alcance) Y CLOSURES
 * ============================================================
 *  SCOPE = dónde "existe" una variable.
 *   - Global: fuera de toda función/bloque. Accesible desde cualquier lugar.
 *   - De función: declarada dentro de una función.
 *   - De bloque: let/const dentro de { } (if, for, etc.).
 *  Una función puede ver variables de afuera, pero no al revés.
 *
 *  CLOSURE = una función que "recuerda" las variables del lugar donde fue
 *  creada, incluso después de que ese lugar terminó de ejecutarse.
 *
 *  ⭐ Los hooks de React (useState, useEffect) funcionan gracias a closures.
 */

// --- Scope global, de función y de bloque ----------------------------------------
const appNombre = "Mi App"; // global

function mostrarInfo() {
    const version = "1.0"; // de función
    if (true) {
        const build = 42;  // de bloque
        console.log(appNombre, version, build); // ✅ ve todo hacia afuera
    }
    // console.log(build); // ❌ ReferenceError: build no existe fuera del if
}
mostrarInfo();
// console.log(version); // ❌ ReferenceError: version solo existe dentro de la función

// --- Shadowing: una variable interna "tapa" a la externa ---------------------------
const mensaje = "global";
function probarShadowing() {
    const mensaje = "local";
    console.log("Dentro:", mensaje); // "local"
}
probarShadowing();
console.log("Fuera:", mensaje);      // "global"

// --- Scope chain: se busca de adentro hacia afuera ---------------------------------
const nivel1 = "🌍";
function externa() {
    const nivel2 = "🏠";
    function interna() {
        const nivel3 = "🛏️";
        console.log(nivel1, nivel2, nivel3);
    }
    interna();
}
externa();

// --- Closure básico ------------------------------------------------------------------
function crearContador() {
    let cuenta = 0; // esta variable "sobrevive" gracias al closure
    return function () {
        cuenta++;
        return cuenta;
    };
}
const contadorA = crearContador();
const contadorB = crearContador();
console.log(contadorA(), contadorA(), contadorA()); // 1 2 3
console.log(contadorB());                            // 1 → cada uno tiene su propia `cuenta`

// --- Closure para configurar funciones -------------------------------------------------
const crearFormateador = (moneda) => (monto) => `${moneda}${monto.toLocaleString("es-CR")}`;
const enColones = crearFormateador("₡");
const enDolares = crearFormateador("$");
console.log(enColones(150000), enDolares(300));

// --- Closure para datos privados ---------------------------------------------------------
function crearCarrito() {
    const items = []; // privado
    return {
        agregar: (item) => items.push(item),
        cantidad: () => items.length,
        listar: () => [...items], // devolvemos una copia para no exponer el original
    };
}
const carrito = crearCarrito();
carrito.agregar("café");
carrito.agregar("pan");
console.log(carrito.cantidad(), carrito.listar(), carrito.items); // 2 ["café","pan"] undefined

// --- Clásico: var vs let en bucles con closures ------------------------------------------
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 0); // 3, 3, 3 😬 (una sola i compartida)
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 0); // 0, 1, 2 ✅ (una j por vuelta)
}

// --- "Stale closure": el problema que verás en React ----------------------------------------
let precioActual = 100;
const mostrarPrecio = () => precioActual; // lee la variable EN EL MOMENTO de ejecutarse
precioActual = 200;
console.log("Lee valor actual:", mostrarPrecio()); // 200

function crearReporte(precio) {
    return () => `Precio capturado: ${precio}`; // captura el VALOR que tenía `precio` al crearse
}
const reporte = crearReporte(precioActual);
precioActual = 999;
console.log(reporte()); // "Precio capturado: 200"
// 💡 En React, un useEffect/setTimeout puede "ver" un estado viejo por esta razón.
//    Solución típica: setContador(prev => prev + 1) en vez de setContador(contador + 1).


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea `crearAcumulador(inicial)` que devuelva una función; cada vez que
 *     la llames con un número, lo suma y devuelve el total acumulado.
 *  2. Crea `crearLimitador(max)` que devuelva una función que solo permita
 *     ejecutarse `max` veces; después devuelve "Límite alcanzado".
 *  3. Sin ejecutar: ¿qué imprime esto y por qué?
 *       let x = 1;
 *       function f() { let x = 2; return () => x; }
 *       console.log(f()());
 */
