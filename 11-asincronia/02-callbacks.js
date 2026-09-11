/**
 * ============================================================
 *  11-02 · CALLBACKS ASÍNCRONOS Y "CALLBACK HELL"
 * ============================================================
 *  Antes de las promesas (ES6), el código asíncrono se manejaba pasando
 *  callbacks: "cuando termines, ejecuta esta función".
 *
 *  Convención de Node: callback(error, resultado)
 *
 *  Problema: si una tarea depende de otra, los callbacks se anidan
 *  → "callback hell" o "pirámide de la perdición". Las promesas y
 *  async/await (siguientes archivos) lo resuelven.
 */

// --- "Base de datos" simulada -----------------------------------------------------------------------
const USUARIOS = [{ id: 1, nombre: "Daniel" }, { id: 2, nombre: "Ana" }];
const PEDIDOS = [
    { id: 101, usuarioId: 1, productoId: 5 },
    { id: 102, usuarioId: 2, productoId: 7 },
];
const PRODUCTOS = [{ id: 5, nombre: "Laptop", precio: 450000 }, { id: 7, nombre: "Mouse", precio: 12000 }];

// --- Funciones asíncronas con callback (error primero) ---------------------------------------------------
function obtenerUsuario(id, callback) {
    setTimeout(() => {
        const usuario = USUARIOS.find((u) => u.id === id);
        if (!usuario) return callback(new Error(`Usuario ${id} no existe`));
        callback(null, usuario);
    }, 300);
}

function obtenerPedido(usuarioId, callback) {
    setTimeout(() => {
        const pedido = PEDIDOS.find((p) => p.usuarioId === usuarioId);
        if (!pedido) return callback(new Error("Sin pedidos"));
        callback(null, pedido);
    }, 300);
}

function obtenerProducto(id, callback) {
    setTimeout(() => {
        const producto = PRODUCTOS.find((p) => p.id === id);
        if (!producto) return callback(new Error("Producto no encontrado"));
        callback(null, producto);
    }, 300);
}

// --- Un solo nivel: todo bien --------------------------------------------------------------------------------
obtenerUsuario(1, (error, usuario) => {
    if (error) return console.log("❌", error.message);
    console.log("Un nivel →", usuario.nombre);
});

// --- 😱 Callback hell: tareas que dependen unas de otras ------------------------------------------------------------
obtenerUsuario(1, (errorU, usuario) => {
    if (errorU) return console.log("❌", errorU.message);
    obtenerPedido(usuario.id, (errorP, pedido) => {
        if (errorP) return console.log("❌", errorP.message);
        obtenerProducto(pedido.productoId, (errorPr, producto) => {
            if (errorPr) return console.log("❌", errorPr.message);
            console.log(`Callback hell → ${usuario.nombre} compró ${producto.nombre}`);
            // ...y si hubiera más pasos, la pirámide seguiría creciendo hacia la derecha
        });
    });
});

// --- Manejo de error ----------------------------------------------------------------------------------------------
obtenerUsuario(99, (error, usuario) => {
    if (error) return console.log("❌ Error controlado:", error.message);
    console.log(usuario);
});

// --- Mitigar: funciones con nombre (aplanar un poco) --------------------------------------------------------------------
function manejarProducto(error, producto) {
    if (error) return console.log("❌", error.message);
    console.log("Con funciones con nombre →", producto.nombre);
}
function manejarPedido(error, pedido) {
    if (error) return console.log("❌", error.message);
    obtenerProducto(pedido.productoId, manejarProducto);
}
function manejarUsuario(error, usuario) {
    if (error) return console.log("❌", error.message);
    obtenerPedido(usuario.id, manejarPedido);
}
obtenerUsuario(2, manejarUsuario);

// --- Callbacks que siguen siendo normales hoy ------------------------------------------------------------------------------
// Los callbacks NO desaparecieron: se usan en eventos y métodos de arrays.
//   boton.addEventListener("click", () => {...})
//   array.map((x) => ...)
// Lo que se reemplazó por promesas es encadenar TAREAS ASÍNCRONAS.
// 👉 Siguiente archivo: 03-promesas.js reescribe este mismo ejemplo.


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea `leerArchivo(nombre, callback)` que después de 500 ms llame a
 *     callback(null, "contenido de <nombre>") o a callback(error) si el
 *     nombre no termina en ".txt".
 *  2. Llama a leerArchivo para "a.txt" y, dentro de su callback, para "b.txt".
 *     Imprime ambos contenidos juntos.
 */
