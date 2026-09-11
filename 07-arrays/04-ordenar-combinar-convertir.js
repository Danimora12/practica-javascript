/**
 * ============================================================
 *  07-04 · ORDENAR, COMBINAR Y CONVERTIR ARRAYS
 * ============================================================
 *  sort(fn)      → ordena (⚠️ MUTA)       toSorted(fn) → versión que no muta (ES2023)
 *  reverse()     → invierte (⚠️ MUTA)     toReversed() → no muta
 *  concat / ...  → combinar
 *  slice(a, b)   → copiar una parte (no muta)
 *  join / split  → array ↔ string
 *  flat / flatMap → aplanar arrays anidados
 *  Array.from    → crear arrays desde otras cosas
 */

// ==========================================================================================
//  sort
// ==========================================================================================
const letras = ["c", "a", "b"];
letras.sort();
console.log(letras); // ["a","b","c"]

// ⚠️ sort sin función compara como TEXTO
const numeros = [10, 1, 5, 100, 25];
console.log([...numeros].sort()); // [1, 10, 100, 25, 5] 😬

// Con función comparadora: (a, b) => negativo (a primero) | positivo (b primero) | 0
console.log([...numeros].sort((a, b) => a - b)); // ascendente  [1, 5, 10, 25, 100]
console.log([...numeros].sort((a, b) => b - a)); // descendente [100, 25, 10, 5, 1]

// Ordenar objetos
const empleados = [
    { nombre: "Sofía", salario: 850000, ingreso: "2021-03-01" },
    { nombre: "Ángel", salario: 620000, ingreso: "2019-07-15" },
    { nombre: "Bruno", salario: 950000, ingreso: "2023-01-10" },
];
const porSalario = [...empleados].sort((a, b) => b.salario - a.salario);
console.log(porSalario.map((e) => e.nombre)); // Bruno, Sofía, Ángel

// Strings con tildes: localeCompare ✅
const porNombre = [...empleados].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
console.log(porNombre.map((e) => e.nombre)); // Ángel, Bruno, Sofía

// Fechas
const porIngreso = [...empleados].sort((a, b) => new Date(a.ingreso) - new Date(b.ingreso));
console.log(porIngreso.map((e) => e.ingreso));

// ⚠️ sort MUTA: por eso copiamos con [...arr] antes. O usa toSorted:
if (Array.prototype.toSorted) {
    const ordenados = numeros.toSorted((a, b) => a - b);
    console.log("toSorted:", ordenados, "| original:", numeros);
}
// 💡 En React nunca hagas estado.sort(): ordena una copia.

// --- reverse -----------------------------------------------------------------------------------
console.log([...letras].reverse()); // ["c","b","a"]

// ==========================================================================================
//  Combinar
// ==========================================================================================
const frontend = ["HTML", "CSS", "JavaScript"];
const backend = ["Node", "SQL"];
console.log(frontend.concat(backend));          // forma clásica
console.log([...frontend, ...backend]);         // spread ✅
console.log([...frontend, "React", ...backend]); // con elementos en medio

// ==========================================================================================
//  slice: copiar una parte
// ==========================================================================================
const ranking = ["🥇", "🥈", "🥉", "4°", "5°"]; // (no uses `top` como nombre: en el navegador ya existe window.top)
console.log(ranking.slice(0, 3));  // los 3 primeros
console.log(ranking.slice(-2));    // los 2 últimos
console.log(ranking.slice());      // copia completa

// Paginación (muy común)
function paginar(array, pagina, porPagina) {
    const inicio = (pagina - 1) * porPagina;
    return array.slice(inicio, inicio + porPagina);
}
const items = Array.from({ length: 23 }, (_, i) => `Item ${i + 1}`);
console.log(paginar(items, 3, 5)); // Items 11–15

// ==========================================================================================
//  join / split
// ==========================================================================================
const etiquetas = ["js", "react", "web"];
console.log(etiquetas.join(", "));   // "js, react, web"
console.log(etiquetas.join(""));     // "jsreactweb"
console.log("2026-09-10".split("-")); // ["2026","09","10"]

// ==========================================================================================
//  flat y flatMap
// ==========================================================================================
const anidado = [1, [2, 3], [4, [5, 6]]];
console.log(anidado.flat());         // [1,2,3,4,[5,6]]
console.log(anidado.flat(Infinity)); // [1,2,3,4,5,6]

const pedidos = [
    { cliente: "Ana", productos: ["café", "pan"] },
    { cliente: "Luis", productos: ["té"] },
];
console.log(pedidos.flatMap((p) => p.productos)); // ["café","pan","té"]

// ==========================================================================================
//  Array.from, Array.of, fill
// ==========================================================================================
console.log(Array.from("hola"));                         // ["h","o","l","a"]
console.log(Array.from({ length: 5 }, (_, i) => i * 2)); // [0,2,4,6,8]
console.log(new Array(3).fill(0));                       // [0,0,0]
console.log([...new Set([1, 2, 2, 3, 3, 3])]);           // [1,2,3] → quitar duplicados ✅

// Rango de números (útil para paginadores o estrellas de rating)
const estrellas = Array.from({ length: 5 }, (_, i) => (i < 4 ? "★" : "☆")).join("");
console.log(estrellas); // ★★★★☆

// --- Recorrer con índice sin bucle ---------------------------------------------------------------
for (const [i, e] of empleados.entries()) {
    console.log(i, e.nombre);
}


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Ordena [3, 20, 100, 7] de menor a mayor sin mutar el original.
 *  2. Ordena un array de productos { nombre, precio } por precio descendente
 *     y luego obtén los 2 más caros con slice.
 *  3. Dado ["ana", "luis", "ana", "sofía", "luis"], obtén los nombres únicos
 *     ordenados alfabéticamente y unidos con " - ".
 *  4. Crea un array con los números del 1 al 10 usando Array.from.
 */
