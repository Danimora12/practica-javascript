/**
 * ============================================================
 *  02-07 · CLONAR OBJETOS
 * ============================================================
 *  Como los objetos se copian por referencia (ver 05), para tener una
 *  copia independiente hay que CLONAR.
 *
 *   { ...obj }             → spread (lo más usado) — copia SUPERFICIAL
 *   Object.assign({}, obj) → forma antigua          — copia SUPERFICIAL
 *   structuredClone(obj)   → copia PROFUNDA (moderna, nativa)
 *
 *  Superficial = copia el primer nivel; los objetos internos se siguen
 *  compartiendo por referencia.
 */

const original = {
    nombre: "Daniel",
    edad: 30,
    direccion: { provincia: "Cartago", canton: "Central" },
};

// --- ❌ Esto NO es clonar ------------------------------------------
const mismaReferencia = original;
console.log("¿Es clon?", mismaReferencia !== original); // false

// --- Object.assign ------------------------------------------------
const copiaAssign = Object.assign({}, original);
copiaAssign.nombre = "Ana";
console.log(original.nombre, copiaAssign.nombre); // Daniel Ana ✅

// También sirve para combinar varios objetos:
const combinado = Object.assign({}, { a: 1 }, { b: 2 }, { a: 99 });
console.log(combinado); // { a: 99, b: 2 } → el último gana

// --- Spread (...) ✅ la forma más común ----------------------------
const copiaSpread = { ...original };
const conCambios = { ...original, edad: 31, profesion: "Dev" };
console.log(copiaSpread);
console.log(conCambios);

// --- ⚠️ La trampa de la copia superficial --------------------------
copiaSpread.direccion.provincia = "San José"; // cambia un objeto INTERNO
console.log("Original afectado:", original.direccion.provincia); // "San José" 😬
original.direccion.provincia = "Cartago"; // lo restauramos

// Solución 1: copiar también el nivel interno (patrón típico en React)
const copiaCorrecta = {
    ...original,
    direccion: { ...original.direccion, provincia: "Heredia" },
};
console.log(original.direccion.provincia, "|", copiaCorrecta.direccion.provincia); // Cartago | Heredia ✅

// Solución 2: structuredClone → copia profunda de todo
const copiaProfunda = structuredClone(original);
copiaProfunda.direccion.canton = "Paraíso";
console.log(original.direccion.canton, "|", copiaProfunda.direccion.canton); // Central | Paraíso ✅
// ⚠️ structuredClone no copia funciones (métodos).

// --- Clonar arrays -------------------------------------------------
const numeros = [1, 2, 3];
const copiaNumeros = [...numeros];
copiaNumeros.push(4);
console.log(numeros, copiaNumeros);

// --- Truco antiguo (con limitaciones) ------------------------------
const copiaJSON = JSON.parse(JSON.stringify(original));
console.log(copiaJSON);
// ⚠️ Pierde funciones, undefined, fechas (las vuelve string). Prefiere structuredClone.


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Dado `const perfil = { user: "dani", config: { tema: "claro" } }`,
 *     crea una copia con tema "oscuro" SIN afectar el original, usando spread
 *     en ambos niveles. Verifica imprimiendo los dos.
 *  2. Haz lo mismo con structuredClone.
 *  3. Combina `const base = { rol: "user", activo: true }` con
 *     `const extra = { rol: "admin" }` en un objeto nuevo. ¿Qué rol queda?
 */
