/**
 * ============================================================
 *  11-03 · PROMESAS (Promise)
 * ============================================================
 *  Una promesa es un objeto que representa un valor FUTURO.
 *  Estados:
 *    ⏳ pending   → todavía no termina
 *    ✅ fulfilled → terminó bien (resolve)
 *    ❌ rejected  → falló (reject)
 *
 *  Consumir:
 *    promesa
 *      .then((valor) => ...)    // si se cumple
 *      .catch((error) => ...)   // si falla (en cualquier paso anterior)
 *      .finally(() => ...)      // siempre
 *
 *  fetch() devuelve una promesa → por eso es clave para React.
 */

// --- Crear una promesa --------------------------------------------------------------------------------------
function lanzarMoneda() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const cara = Math.random() > 0.5;
            if (cara) {
                resolve("🪙 Cara: ganaste");
            } else {
                reject(new Error("Cruz: perdiste"));
            }
        }, 500);
    });
}

const promesa = lanzarMoneda();
console.log("Estado inicial:", promesa); // Promise { <pending> }

promesa
    .then((resultado) => console.log("then →", resultado))
    .catch((error) => console.log("catch →", error.message))
    .finally(() => console.log("finally → la moneda cayó"));

// --- Función utilitaria muy común: esperar ------------------------------------------------------------------------
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
esperar(700).then(() => console.log("⏰ Pasaron 700 ms"));

// --- Reescribiendo el callback hell de 02-callbacks.js --------------------------------------------------------------
const USUARIOS = [{ id: 1, nombre: "Daniel" }, { id: 2, nombre: "Ana" }];
const PEDIDOS = [{ id: 101, usuarioId: 1, productoId: 5 }, { id: 102, usuarioId: 2, productoId: 7 }];
const PRODUCTOS = [{ id: 5, nombre: "Laptop", precio: 450000 }, { id: 7, nombre: "Mouse", precio: 12000 }];

function obtenerUsuario(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const usuario = USUARIOS.find((u) => u.id === id);
            usuario ? resolve(usuario) : reject(new Error(`Usuario ${id} no existe`));
        }, 300);
    });
}
function obtenerPedido(usuarioId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pedido = PEDIDOS.find((p) => p.usuarioId === usuarioId);
            pedido ? resolve(pedido) : reject(new Error("Sin pedidos"));
        }, 300);
    });
}
function obtenerProducto(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const producto = PRODUCTOS.find((p) => p.id === id);
            producto ? resolve(producto) : reject(new Error("Producto no encontrado"));
        }, 300);
    });
}

// ✅ Encadenamiento plano: cada then DEVUELVE la siguiente promesa
let usuarioActual;
obtenerUsuario(1)
    .then((usuario) => {
        usuarioActual = usuario;
        return obtenerPedido(usuario.id); // ⚠️ el return es clave
    })
    .then((pedido) => obtenerProducto(pedido.productoId))
    .then((producto) => console.log(`Promesas → ${usuarioActual.nombre} compró ${producto.nombre}`))
    .catch((error) => console.log("❌", error.message)); // UN solo catch para toda la cadena

// Error en la cadena
obtenerUsuario(99)
    .then((u) => obtenerPedido(u.id))
    .then(() => console.log("Esto no se ejecuta"))
    .catch((error) => console.log("❌ Error capturado en cadena:", error.message));

// --- Promise.resolve / Promise.reject: promesas ya resueltas ------------------------------------------------------------
Promise.resolve(42).then((v) => console.log("Promise.resolve →", v));
Promise.reject(new Error("falló")).catch((e) => console.log("Promise.reject →", e.message));

// ==========================================================================================
//  VARIAS PROMESAS A LA VEZ
// ==========================================================================================
// Promise.all: espera a TODAS (en paralelo). Si una falla, falla todo.
Promise.all([obtenerUsuario(1), obtenerUsuario(2), esperar(200).then(() => "extra")])
    .then(([u1, u2, extra]) => console.log("Promise.all →", u1.nombre, u2.nombre, extra))
    .catch((e) => console.log("Promise.all falló:", e.message));

// Promise.allSettled: espera a todas y te dice cuál salió bien o mal
Promise.allSettled([obtenerUsuario(1), obtenerUsuario(99)]).then((resultados) => {
    resultados.forEach((r) =>
        console.log("allSettled →", r.status, r.status === "fulfilled" ? r.value.nombre : r.reason.message)
    );
});

// Promise.race: gana la primera en terminar (útil para timeouts)
const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));
Promise.race([obtenerUsuario(1), timeout(100)])
    .then((u) => console.log("race →", u.nombre))
    .catch((e) => console.log("race →", e.message)); // Timeout (100 ms < 300 ms)

// Promise.any: la primera que se CUMPLA (ignora las rechazadas)
Promise.any([obtenerUsuario(99), obtenerUsuario(2)]).then((u) => console.log("any →", u.nombre));

// ⚠️ Una promesa rechazada sin catch genera "Uncaught (in promise)" en la consola.


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea `verificarEdad(edad)` que devuelva una promesa: resuelve con
 *     "Acceso permitido" si edad >= 18, rechaza con un Error si no.
 *     Consúmela con then/catch para 20 y para 15.
 *  2. Usando `esperar`, imprime "uno", "dos", "tres" con 1 segundo entre cada
 *     uno, encadenando then.
 *  3. Con Promise.all, obtén los usuarios 1 y 2 e imprime sus nombres unidos por " y ".
 */
