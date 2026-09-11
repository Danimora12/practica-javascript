/**
 * ============================================================
 *  04 · TIPADO DINÁMICO
 * ============================================================
 *  - Tipado ESTÁTICO (Java, C#): el tipo se declara y no cambia.
 *        String nombre = "Hola"; nombre = 42; // ❌ error al compilar
 *  - Tipado DINÁMICO (JavaScript, Python): el tipo lo tiene el VALOR,
 *    no la variable. Una variable puede cambiar de tipo.
 *
 *  Ventaja: rapidez y flexibilidad.
 *  Riesgo: errores que solo aparecen al ejecutar (por eso existe TypeScript,
 *  que agrega tipos estáticos encima de JS; es muy usado con React).
 */

// --- Tu código original ----------------------------------------
let numero = 42;
let nombre = "Hola Mundo";
let verdadero = true;
let undef;
let nula = null;

console.log(typeof numero);    // "number"
console.log(typeof nombre);    // "string"
console.log(typeof verdadero); // "boolean"
console.log(typeof undef);     // "undefined"
console.log(typeof nula);      // "object" ⚠️ bug histórico de JS: null NO es un objeto

// --- Una variable puede cambiar de tipo -------------------------
let dato = 42;
console.log(dato, typeof dato);   // 42 "number"
dato = "ahora soy texto";
console.log(dato, typeof dato);   // "string"
dato = false;
console.log(dato, typeof dato);   // "boolean"

// --- typeof con no-primitivos -----------------------------------
console.log(typeof { a: 1 });       // "object"
console.log(typeof [1, 2, 3]);      // "object" ⚠️ los arrays son objetos
console.log(typeof function () {}); // "function"
console.log(Array.isArray([1, 2])); // true → forma correcta de detectar arrays
console.log(nula === null);         // true → forma correcta de detectar null

// --- Coerción: JS convierte tipos "por su cuenta" --------------
console.log("5" + 1);    // "51"  → con + y un string, CONCATENA
console.log("5" - 1);    // 4     → con -, *, / convierte a número
console.log("5" * "2");  // 10
console.log(true + 1);   // 2     → true se vuelve 1
console.log([] + {});    // "[object Object]" 🙃
console.log(5 == "5");   // true  → == convierte tipos (evítalo)
console.log(5 === "5");  // false → === compara tipo y valor (úsalo siempre)

// --- Conversión EXPLÍCITA (la forma recomendada) ----------------
let edadTexto = "27";
let edadNumero = Number(edadTexto);
console.log(edadNumero + 1);          // 28 ✅
console.log(parseInt("27 años"));     // 27 → lee números al inicio del texto
console.log(parseFloat("3.5kg"));     // 3.5
console.log(Number("abc"));           // NaN
console.log(String(123) + "!");       // "123!"
console.log(Boolean(""), Boolean("hola"), Boolean(0), Boolean(5)); // false true false true

// 💡 Caso real: los valores de un <input> en HTML SIEMPRE llegan como string.
//    Si el usuario escribe 5 y 3 y haces a + b, obtienes "53". Convierte con Number().


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea `let valor = 10` e imprime su typeof. Reasígnalo a "10", luego a
 *     true, e imprime el typeof después de cada cambio.
 *  2. Tienes const a = "8" y const b = "2" (como si vinieran de un input).
 *     Imprime la suma correcta (10), no "82".
 *  3. Predice el resultado ANTES de ejecutar:
 *       "10" / 2,  "10" + 2,  null + 1,  undefined + 1
 */
