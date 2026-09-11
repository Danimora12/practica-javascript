/**
 * ============================================================
 *  06-01 · DECLARACIÓN vs EXPRESIÓN DE FUNCIÓN y HOISTING
 * ============================================================
 *  EXPRESIÓN   → código que PRODUCE un valor:  2 + 2,  "hola",  miFuncion()
 *  DECLARACIÓN → código que CREA algo con nombre (let, const, function, class)
 *
 *  Formas de crear funciones:
 *   1) Declaración:   function sumar(a, b) { return a + b; }
 *   2) Expresión:     const sumar = function (a, b) { return a + b; };
 *   3) Arrow:         const sumar = (a, b) => a + b;     (06-funciones/02)
 *
 *  HOISTING ("elevación"): JS "sube" las declaraciones al inicio de su
 *  alcance antes de ejecutar. Las declaraciones `function` se pueden usar
 *  ANTES de escribirse; las expresiones asignadas a const/let NO.
 */

// --- Expresiones vs declaraciones (sentencias) ----------------------------
let resultado = 5 * 2;      // `5 * 2` es una EXPRESIÓN (produce 10)
                            // `let resultado = ...` es una DECLARACIÓN
if (resultado > 5) {        // `if` es una SENTENCIA (statement): controla el flujo, no produce valor
    console.log("Mayor a 5");
}
// 💡 En JSX solo caben EXPRESIONES dentro de { }: por eso se usa el ternario y no if.

// --- 1) Declaración de función ---------------------------------------------
console.log(saludar("Ana")); // ✅ funciona ANTES de la definición (hoisting)

function saludar(nombre) {
    return `Hola, ${nombre}`;
}

// --- 2) Expresión de función --------------------------------------------------
// console.log(despedir("Ana")); // ❌ ReferenceError: Cannot access 'despedir' before initialization

const despedir = function (nombre) {
    return `Adiós, ${nombre}`;
};
console.log(despedir("Ana")); // ✅ después de definirla

// Expresión con nombre (útil para ver el nombre en errores y para recursión)
const factorial = function calcular(n) {
    return n <= 1 ? 1 : n * calcular(n - 1);
};
console.log(factorial(5)); // 120

// --- 3) Arrow function (adelanto) ----------------------------------------------
const duplicar = (n) => n * 2;
console.log(duplicar(21));

// --- Hoisting de variables -------------------------------------------------------
console.log(conVar); // undefined → var se eleva, pero SIN su valor 😬
var conVar = "hola";

// console.log(conLet); // ❌ ReferenceError (zona muerta temporal)
let conLet = "hola";
console.log(conLet);

// --- Funciones anónimas ------------------------------------------------------------
// Una función sin nombre, normalmente pasada directo como argumento:
setTimeout(function () {
    console.log("Anónima ejecutada después de 0 ms");
}, 0);

// IIFE: función que se ejecuta inmediatamente (patrón antiguo para aislar variables)
(function () {
    const privado = "no contamina el alcance global";
    console.log("IIFE:", privado);
})();

/*
 *  ¿Cuál usar?
 *  - Declaración `function`: funciones "principales" de un archivo.
 *  - Arrow `const x = () => {}`: callbacks y la mayoría del código moderno.
 *  - En React verás ambas:
 *        function App() { ... }               // componente como declaración
 *        const Boton = ({ texto }) => { ... } // componente como arrow
 *  Lo importante: sé consistente en un mismo proyecto.
 */


/* ============================================================
 *  EJERCICIOS  (soluciones en soluciones/06-funciones.js)
 * ============================================================
 *  1. Escribe la misma función `cuadrado(n)` de las 3 formas: declaración,
 *     expresión y arrow. Llama a las 3.
 *  2. Llama a una función declarada ANTES de su definición y a una expresión
 *     antes de la suya. Anota en un comentario qué pasa y por qué.
 *  3. Clasifica como expresión o sentencia: `a + b`, `if (x) {}`,
 *     `edad >= 18 ? "si" : "no"`, `for (...) {}`, `sumar(1, 2)`.
 */
