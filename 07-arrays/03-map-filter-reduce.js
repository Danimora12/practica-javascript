/**
 * ============================================================
 *  07-03 · MAP, FILTER, REDUCE (y forEach)  ⭐⭐⭐ LO MÁS USADO EN REACT
 * ============================================================
 *  Ninguno muta el array original. Todos reciben un callback:
 *     (elemento, indice, arrayCompleto) => ...
 *
 *  forEach(fn) → EJECUTA algo por cada elemento. Devuelve undefined.
 *  map(fn)     → TRANSFORMA cada elemento. Devuelve array del MISMO largo.
 *  filter(fn)  → SELECCIONA los que cumplen. Devuelve array igual o más corto.
 *  reduce(fn, inicial) → ACUMULA todo en UN valor (número, objeto, array...).
 *
 *        [🌽, 🥔, 🐔].map(cocinar)           → [🍿, 🍟, 🍗]
 *        [🍿, 🍟, 🍗].filter(esVegetariano)  → [🍿, 🍟]
 *        [🍿, 🍟].reduce(comer)              → 😋
 */

const productos = [
    { id: 1, nombre: "Café Tarrazú", precio: 6500, categoria: "bebidas", stock: 20 },
    { id: 2, nombre: "Pan casero", precio: 1500, categoria: "panadería", stock: 0 },
    { id: 3, nombre: "Queso Turrialba", precio: 4200, categoria: "lácteos", stock: 8 },
    { id: 4, nombre: "Natilla", precio: 1800, categoria: "lácteos", stock: 15 },
    { id: 5, nombre: "Té frío", precio: 1200, categoria: "bebidas", stock: 30 },
];

// ==========================================================================================
//  forEach
// ==========================================================================================
productos.forEach((p, i) => {
    console.log(`${i + 1}. ${p.nombre}`);
});
// ⚠️ forEach no devuelve nada: const x = arr.forEach(...) → undefined
// ⚠️ No se puede usar break dentro de forEach (usa for...of si lo necesitas)

// ==========================================================================================
//  map: transformar
// ==========================================================================================
const nombres = productos.map((p) => p.nombre);
console.log(nombres);

const conIva = productos.map((p) => ({
    ...p,                               // copia todas las propiedades
    precioConIva: Math.round(p.precio * 1.13),
}));
console.log(conIva[0]);

const numeros = [1, 2, 3, 4];
console.log(numeros.map((n) => n * n));             // [1, 4, 9, 16]
console.log(numeros.map((n, i) => `${i}:${n}`));    // usando el índice

// 💡 En React, map convierte datos en elementos de la interfaz:
//    {productos.map((p) => <li key={p.id}>{p.nombre}</li>)}
// Simulación con strings:
const listaHTML = productos.map((p) => `<li>${p.nombre} - ₡${p.precio}</li>`).join("\n");
console.log(listaHTML);

// ==========================================================================================
//  filter: seleccionar
// ==========================================================================================
const disponibles = productos.filter((p) => p.stock > 0);
console.log("Disponibles:", disponibles.length);

const lacteos = productos.filter((p) => p.categoria === "lácteos");
console.log("Lácteos:", lacteos.map((p) => p.nombre));

const baratos = productos.filter((p) => p.precio < 2000 && p.stock > 0);
console.log("Baratos y disponibles:", baratos.map((p) => p.nombre));

// Buscador (patrón típico con un <input> en React)
const busqueda = "caf";
const encontrados = productos.filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));
console.log("Búsqueda:", encontrados.map((p) => p.nombre));

// Quitar valores "vacíos"
console.log([0, "hola", "", null, 42, undefined].filter(Boolean)); // ["hola", 42]

// ==========================================================================================
//  reduce: acumular
// ==========================================================================================
// reduce((acumulador, elementoActual) => nuevoAcumulador, valorInicial)
const suma = numeros.reduce((acc, n) => acc + n, 0);
console.log("Suma:", suma); // 10

// Paso a paso:
// vuelta 1: acc=0, n=1 → 1
// vuelta 2: acc=1, n=2 → 3
// vuelta 3: acc=3, n=3 → 6
// vuelta 4: acc=6, n=4 → 10

// Valor total del inventario
const valorInventario = productos.reduce((acc, p) => acc + p.precio * p.stock, 0);
console.log("Valor inventario: ₡" + valorInventario.toLocaleString("es-CR"));

// Contar por categoría → reduce a un OBJETO
const porCategoria = productos.reduce((acc, p) => {
    acc[p.categoria] = (acc[p.categoria] ?? 0) + 1;
    return acc; // ⚠️ nunca olvides devolver el acumulador
}, {});
console.log(porCategoria); // { bebidas: 2, panadería: 1, lácteos: 2 }

// Agrupar
const agrupados = productos.reduce((acc, p) => {
    (acc[p.categoria] ??= []).push(p.nombre);
    return acc;
}, {});
console.log(agrupados);

// El más caro
const masCaro = productos.reduce((max, p) => (p.precio > max.precio ? p : max));
console.log("Más caro:", masCaro.nombre);

// ==========================================================================================
//  Encadenar: filter → map → reduce
// ==========================================================================================
const totalBebidasDisponibles = productos
    .filter((p) => p.categoria === "bebidas" && p.stock > 0)
    .map((p) => p.precio)
    .reduce((acc, precio) => acc + precio, 0);
console.log("Suma de precios de bebidas disponibles:", totalBebidasDisponibles);

// Carrito de compras
const carrito = [
    { idProducto: 1, cantidad: 2 },
    { idProducto: 3, cantidad: 1 },
];
const totalCarrito = carrito
    .map((item) => {
        const producto = productos.find((p) => p.id === item.idProducto);
        return producto.precio * item.cantidad;
    })
    .reduce((acc, subtotal) => acc + subtotal, 0);
console.log("Total carrito: ₡" + totalCarrito);

/*
 *  ¿Cuál uso?
 *  - Quiero un array del mismo largo, pero con datos cambiados → map
 *  - Quiero menos elementos                                 → filter
 *  - Quiero UN resultado (total, objeto, conteo)            → reduce
 *  - Solo quiero hacer algo (imprimir, guardar)             → forEach
 *  - Quiero UN elemento                                     → find
 */


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  Usa:
 *    const estudiantes = [
 *      { nombre: "Ana", nota: 92, carrera: "Informática" },
 *      { nombre: "Luis", nota: 65, carrera: "Administración" },
 *      { nombre: "Sofía", nota: 78, carrera: "Informática" },
 *      { nombre: "Carlos", nota: 55, carrera: "Informática" },
 *    ];
 *  1. map: array solo con los nombres en mayúsculas.
 *  2. filter: estudiantes aprobados (nota >= 70).
 *  3. reduce: promedio de notas.
 *  4. Encadena: promedio de notas de los estudiantes de Informática aprobados.
 *  5. reduce: objeto que cuente estudiantes por carrera.
 */
