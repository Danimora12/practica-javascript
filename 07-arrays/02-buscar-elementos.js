/**
 * ============================================================
 *  07-02 · BUSCAR ELEMENTOS
 * ============================================================
 *  Con PRIMITIVOS (números, strings):
 *    includes(valor)   → true/false
 *    indexOf(valor)    → posición o -1
 *
 *  Con OBJETOS (o condiciones), usa un callback:
 *    find(fn)          → el PRIMER elemento que cumple, o undefined
 *    findIndex(fn)     → su posición, o -1
 *    findLast(fn)      → el ÚLTIMO que cumple
 *    some(fn)          → ¿AL MENOS UNO cumple?   true/false
 *    every(fn)         → ¿TODOS cumplen?          true/false
 *    filter(fn)        → TODOS los que cumplen (array) → 07-arrays/03
 */

// --- Primitivos -----------------------------------------------------------------------------------
const numeros = [10, 25, 30, 25, 50];
console.log(numeros.includes(30));     // true
console.log(numeros.indexOf(25));      // 1 (primera aparición)
console.log(numeros.lastIndexOf(25));  // 3
console.log(numeros.indexOf(99));      // -1

const roles = ["admin", "editor", "lector"];
const rolUsuario = "editor";
if (roles.includes(rolUsuario)) {
    console.log("Rol válido");
}

// --- ⚠️ includes/indexOf NO sirven para buscar objetos por contenido ------------------------------------
const usuarios = [
    { id: 1, nombre: "Ana", edad: 28, activo: true },
    { id: 2, nombre: "Luis", edad: 17, activo: false },
    { id: 3, nombre: "Daniel", edad: 30, activo: true },
];
console.log(usuarios.includes({ id: 1, nombre: "Ana", edad: 28, activo: true })); // false (otra referencia)

// --- find ------------------------------------------------------------------------------------------------
const daniel = usuarios.find((u) => u.nombre === "Daniel");
console.log(daniel); // { id: 3, ... }

const inexistente = usuarios.find((u) => u.id === 99);
console.log(inexistente);            // undefined
console.log(inexistente?.nombre ?? "No encontrado");

// Uso típico: buscar por id (en React: la tarea seleccionada, el producto del carrito...)
const buscarPorId = (lista, id) => lista.find((item) => item.id === id);
console.log(buscarPorId(usuarios, 2)?.nombre);

// --- findIndex --------------------------------------------------------------------------------------------
const posLuis = usuarios.findIndex((u) => u.nombre === "Luis");
console.log("Luis está en la posición", posLuis); // 1

// --- findLast / findLastIndex -----------------------------------------------------------------------------
const ultimoActivo = usuarios.findLast((u) => u.activo);
console.log("Último activo:", ultimoActivo.nombre); // Daniel

// --- some: ¿al menos uno? -----------------------------------------------------------------------------------
const hayMenores = usuarios.some((u) => u.edad < 18);
console.log("¿Hay menores?", hayMenores); // true

const carrito = [{ producto: "Café", stock: 5 }, { producto: "Pan", stock: 0 }];
const hayAgotados = carrito.some((item) => item.stock === 0);
console.log("¿Algo agotado?", hayAgotados);

// --- every: ¿todos? -------------------------------------------------------------------------------------------
const todosActivos = usuarios.every((u) => u.activo);
console.log("¿Todos activos?", todosActivos); // false

const formulario = { nombre: "Daniel", email: "d@correo.com", mensaje: "Hola" };
const formularioCompleto = Object.values(formulario).every((valor) => valor.trim() !== "");
console.log("¿Formulario completo?", formularioCompleto); // true
// 💡 En React: <button disabled={!formularioCompleto}>Enviar</button>

// ⚠️ Array vacío: some → false, every → true (verdad "vacía")
console.log([].some((x) => x), [].every((x) => x));

// --- Resumen de qué devuelve cada uno ------------------------------------------------------------------------------
console.table([
    { metodo: "includes", devuelve: "boolean", uso: "¿existe este valor primitivo?" },
    { metodo: "indexOf", devuelve: "number | -1", uso: "posición de un valor primitivo" },
    { metodo: "find", devuelve: "elemento | undefined", uso: "primer objeto que cumple" },
    { metodo: "findIndex", devuelve: "number | -1", uso: "posición del que cumple" },
    { metodo: "some", devuelve: "boolean", uso: "¿al menos uno cumple?" },
    { metodo: "every", devuelve: "boolean", uso: "¿todos cumplen?" },
    { metodo: "filter", devuelve: "array", uso: "todos los que cumplen" },
]);


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  Usa este array:
 *    const productos = [
 *      { id: 1, nombre: "Laptop", precio: 450000, categoria: "tecnologia" },
 *      { id: 2, nombre: "Silla", precio: 85000, categoria: "hogar" },
 *      { id: 3, nombre: "Mouse", precio: 12000, categoria: "tecnologia" },
 *    ];
 *  1. Encuentra el producto con id 3.
 *  2. Obtén la posición de la "Silla".
 *  3. ¿Hay algún producto de más de ₡400 000?
 *  4. ¿Todos los productos cuestan más de ₡10 000?
 */
