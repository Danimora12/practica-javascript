/**
 * ============================================================
 *  02-05 · VALORES vs REFERENCIAS  ⭐ MUY IMPORTANTE PARA REACT
 * ============================================================
 *  PRIMITIVOS (string, number, boolean, null, undefined...)
 *    → se copian por VALOR: cada variable tiene su propia copia.
 *
 *  OBJETOS (objetos, arrays, funciones)
 *    → se copian por REFERENCIA: las variables apuntan al MISMO objeto
 *      en memoria. Si lo cambias desde una, se ve desde la otra.
 *
 *  React decide si volver a pintar comparando referencias (===).
 *  Si mutas un objeto, la referencia es la misma → React NO se entera.
 */

// --- Primitivos: copia por valor ----------------------------------
let a = 10;
let b = a;   // b recibe una COPIA del 10
b = 20;
console.log("a:", a, "| b:", b); // a: 10 | b: 20 → independientes

// --- Objetos: copia por referencia --------------------------------
let obj1 = { valor: 10 };
let obj2 = obj1;     // obj2 apunta al MISMO objeto
obj2.valor = 20;
console.log("obj1:", obj1, "| obj2:", obj2); // ambos { valor: 20 } 😮

// --- Arrays: igual que objetos ------------------------------------
const lista1 = [1, 2, 3];
const lista2 = lista1;
lista2.push(4);
console.log("lista1:", lista1); // [1, 2, 3, 4]

// --- Comparar objetos ---------------------------------------------
console.log(5 === 5);                     // true (mismo valor)
console.log({ x: 1 } === { x: 1 });       // false → dos objetos distintos en memoria
console.log([1, 2] === [1, 2]);           // false
console.log(obj1 === obj2);               // true  → misma referencia
// Comparar contenido "a mano" (solo para casos simples):
console.log(JSON.stringify({ x: 1 }) === JSON.stringify({ x: 1 })); // true

// --- Pasar a una función ------------------------------------------
function incrementarPrimitivo(numero) {
    numero++;              // cambia la copia local
}
let contador = 0;
incrementarPrimitivo(contador);
console.log("contador:", contador); // 0 → no cambió

function incrementarObjeto(objeto) {
    objeto.valor++;        // cambia el objeto ORIGINAL
}
const estado = { valor: 0 };
incrementarObjeto(estado);
console.log("estado:", estado); // { valor: 1 } → sí cambió (efecto secundario)

// --- La forma "React" de cambiar datos: crear uno NUEVO -----------
const original = { nombre: "Ana", edad: 25 };
const actualizado = { ...original, edad: 26 }; // spread: copia + cambio (ver 08-es6-moderno/02)
console.log(original, actualizado);
console.log("¿Misma referencia?", original === actualizado); // false → React detecta el cambio ✅

const numeros = [1, 2, 3];
const conNuevo = [...numeros, 4];   // array NUEVO en vez de push
console.log(numeros, conNuevo);

/*
 *  En React:
 *   ❌ usuario.edad = 26; setUsuario(usuario);          // misma referencia → no re-renderiza
 *   ✅ setUsuario({ ...usuario, edad: 26 });             // objeto nuevo → re-renderiza
 *   ❌ tareas.push(nueva); setTareas(tareas);
 *   ✅ setTareas([...tareas, nueva]);
 */


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Predice y luego verifica:
 *       const x = { n: 1 }; const y = x; y.n = 5; console.log(x.n);
 *  2. Dado `const carrito = { items: 2, total: 5000 }`, crea `carritoNuevo`
 *     con total 7000 SIN modificar `carrito`. Demuestra que son distintos con ===.
 *  3. Escribe `agregarItem(lista, item)` que devuelva un array NUEVO con el
 *     item al final, sin mutar la lista original.
 */
