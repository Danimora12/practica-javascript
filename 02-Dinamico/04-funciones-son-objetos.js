/**
 * ============================================================
 *  02-04 · LAS FUNCIONES SON OBJETOS
 * ============================================================
 *  En JS las funciones son "ciudadanos de primera clase": se pueden
 *  - guardar en variables,
 *  - pasar como argumento a otra función,
 *  - devolver desde otra función,
 *  - tener propiedades, igual que cualquier objeto.
 *
 *  Esto es la base de los callbacks, map/filter, los eventos del DOM
 *  y los hooks de React (useEffect(() => {...})).
 */

function saludar(nombre) {
    return `Hola, ${nombre}`;
}

// --- Tienen propiedades como un objeto ---------------------------
console.log(saludar.name);   // "saludar"
console.log(saludar.length); // 1 → cantidad de parámetros declarados
saludar.vecesUsada = 0;      // podemos agregarle propiedades (poco común)
console.log(typeof saludar, saludar instanceof Object); // "function" true

// --- Guardarlas en variables -------------------------------------
const otroNombre = saludar;  // SIN paréntesis: copiamos la función, no la ejecutamos
console.log(otroNombre("Ana"));

// --- Guardarlas en objetos y arrays ------------------------------
const operaciones = {
    sumar: (a, b) => a + b,
    restar: (a, b) => a - b,
};
console.log(operaciones.sumar(5, 3), operaciones["restar"](5, 3));

const pasos = [
    () => console.log("Paso 1: validar"),
    () => console.log("Paso 2: guardar"),
    () => console.log("Paso 3: notificar"),
];
for (const paso of pasos) paso();

// --- Pasarlas como argumento (callback) -------------------------
function ejecutarDosVeces(fn) {
    fn();
    fn();
}
ejecutarDosVeces(() => console.log("¡Me ejecutaron!"));

// --- Devolverlas desde otra función ------------------------------
function crearMultiplicador(factor) {
    return function (numero) {
        return numero * factor;
    };
}
const doble = crearMultiplicador(2);
const triple = crearMultiplicador(3);
console.log(doble(10), triple(10)); // 20 30

// --- saludar vs saludar() -----------------------------------------
console.log(typeof saludar);        // "function" → la función en sí
console.log(typeof saludar("x"));   // "string"   → lo que DEVUELVE al ejecutarse
// 💡 Error típico en React: onClick={manejarClick()} la ejecuta al renderizar.
//    Lo correcto es onClick={manejarClick} (pasar la función, no ejecutarla).


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea `crearSaludo(saludo)` que devuelva una función que reciba un
 *     nombre. Ej: const hola = crearSaludo("Hola"); hola("Ana") → "Hola, Ana".
 *  2. Crea un objeto `conversor` con métodos colonesADolares y dolaresAColones
 *     (usa un tipo de cambio de 510).
 *  3. Escribe `aplicar(numero, fn)` que devuelva fn(numero) y úsala con doble y triple.
 */
