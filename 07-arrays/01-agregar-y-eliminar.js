/**
 * ============================================================
 *  07-01 · AGREGAR Y ELIMINAR ELEMENTOS
 * ============================================================
 *  MUTAN el array original (lo cambian):
 *    push     → agrega al final          pop    → quita del final
 *    unshift  → agrega al inicio         shift  → quita del inicio
 *    splice   → agrega/quita en cualquier posición
 *
 *  NO MUTAN (devuelven un array nuevo) ⭐ lo que React necesita:
 *    [...arr, x]   concat   slice   filter   toSpliced (ES2023)
 */

// --- push / pop (final) --------------------------------------------------------------------
const pila = ["a", "b"];
const nuevoLargo = pila.push("c", "d"); // push devuelve el nuevo largo
console.log(pila, nuevoLargo);          // ["a","b","c","d"] 4
const quitado = pila.pop();             // pop devuelve el elemento quitado
console.log(pila, quitado);             // ["a","b","c"] "d"

// --- unshift / shift (inicio) ------------------------------------------------------------------
const fila = ["Luis", "Ana"];
fila.unshift("Sofía");      // agrega al inicio
console.log(fila);          // ["Sofía","Luis","Ana"]
const atendido = fila.shift();
console.log(atendido, fila); // "Sofía" ["Luis","Ana"]
// ⚠️ unshift/shift son más lentos en arrays enormes: reacomodan todos los índices.

// --- splice (posición específica) ----------------------------------------------------------------
// arr.splice(inicio, cuantosEliminar, ...elementosAAgregar)
const meses = ["enero", "marzo", "abril", "junio"];
meses.splice(1, 0, "febrero");         // en índice 1, elimina 0, agrega "febrero"
console.log(meses);                    // ["enero","febrero","marzo","abril","junio"]
meses.splice(4, 0, "mayo");
console.log(meses);
const eliminados = meses.splice(2, 2); // desde índice 2, elimina 2
console.log(eliminados, meses);        // ["marzo","abril"] ["enero","febrero","mayo","junio"]

// Eliminar por valor con indexOf + splice
const colores = ["rojo", "verde", "azul"];
const indice = colores.indexOf("verde");
if (indice !== -1) colores.splice(indice, 1);
console.log(colores); // ["rojo","azul"]

// --- Vaciar un array ------------------------------------------------------------------------------
let lista1 = [1, 2, 3];
lista1 = [];            // reasigna (otras referencias al array viejo NO se vacían)
const lista2 = [1, 2, 3];
lista2.length = 0;      // vacía el mismo array (afecta todas las referencias)
console.log(lista1, lista2);

// ===================================================================================================
//  VERSIONES INMUTABLES ⭐ (no tocan el original)
// ===================================================================================================
const original = ["🍎", "🍌", "🍇"];

// Agregar al final / inicio
const alFinal = [...original, "🍉"];
const alInicio = ["🍓", ...original];
console.log(alFinal, alInicio);

// Insertar en una posición
const insertado = [...original.slice(0, 1), "🥭", ...original.slice(1)];
console.log(insertado); // ["🍎","🥭","🍌","🍇"]

// Eliminar por índice
const sinSegundo = original.filter((_, i) => i !== 1);
console.log(sinSegundo); // ["🍎","🍇"]

// Eliminar por valor
const sinUvas = original.filter((fruta) => fruta !== "🍇");
console.log(sinUvas);

// Métodos modernos que no mutan (ES2023: Chrome/Edge/Firefox actuales y Node 20+)
if (Array.prototype.toSpliced) {
    console.log(original.toSpliced(1, 1, "🍍")); // ["🍎","🍍","🍇"]
}

console.log("Original intacto:", original); // ["🍎","🍌","🍇"] ✅

// --- Con arrays de objetos (caso React) ----------------------------------------------------------------
const tareas = [
    { id: 1, texto: "Estudiar arrays" },
    { id: 2, texto: "Hacer ejercicios" },
];
const conNueva = [...tareas, { id: 3, texto: "Aprender React" }];
const sinLaDos = conNueva.filter((t) => t.id !== 2);
console.log(sinLaDos);
// En React:
//   setTareas([...tareas, nuevaTarea]);
//   setTareas(tareas.filter((t) => t.id !== idAEliminar));


/* ============================================================
 *  EJERCICIOS  (soluciones en soluciones/07-arrays.js)
 * ============================================================
 *  1. Dado `const cola = []`, simula una fila de banco: agrega 3 clientes con
 *     push y atiéndelos en orden con shift, imprimiendo a quién se atiende.
 *  2. Dado `const dias = ["lun", "mar", "jue"]`, inserta "mie" en su lugar
 *     con splice.
 *  3. Haz lo mismo que el ejercicio 2 pero SIN mutar `dias` (usa slice y spread).
 *  4. Dado un array de productos { id, nombre }, escribe
 *     `eliminarProducto(productos, id)` que devuelva un array nuevo sin ese id.
 */
