/**
 * ============================================================
 *  08 · FUNCIONES
 * ============================================================
 *  Una función es un bloque de código REUTILIZABLE con nombre.
 *  1) Se DECLARA (se define qué hace).
 *  2) Se LLAMA/INVOCA con paréntesis: miFuncion()
 *
 *  - return devuelve un valor y TERMINA la función.
 *  - Si no hay return, la función devuelve undefined.
 *  - Nombres: verbos en camelCase → calcularTotal, obtenerUsuario.
 *
 *  💡 En React un COMPONENTE es simplemente una función que devuelve UI.
 */

// --- Tu código original ----------------------------------------
function saludar() {
    console.log("Hola Mundo");
}

saludar(); // sin () la función NO se ejecuta

function suma() {
    return 2 + 2;
}

// let resultado = suma()
console.log(suma());

// --- Hacerla útil: parámetros -----------------------------------
// suma() siempre da 4. Con parámetros sirve para cualquier número:
function sumar(a, b) {
    return a + b;
}
console.log(sumar(10, 5));  // 15
console.log(sumar(7, 3));   // 10

// --- console.log vs return --------------------------------------
function conLog(n) {
    console.log(n * 2);     // solo MUESTRA el valor
}
function conReturn(n) {
    return n * 2;           // DEVUELVE el valor para usarlo después
}
let a = conLog(5);          // imprime 10, pero a = undefined
let b = conReturn(5);       // b = 10
console.log("a:", a, "| b:", b, "| b + 1:", b + 1);

// --- return termina la función ----------------------------------
function verificarEdad(edad) {
    if (edad < 18) {
        return "Menor de edad";   // sale aquí
    }
    return "Mayor de edad";       // solo llega si no salió antes
}
console.log(verificarEdad(15), "|", verificarEdad(30));

// --- Funciones que usan otras funciones -------------------------
function calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
}
function calcularTotal(precio, cantidad) {
    const subtotal = calcularSubtotal(precio, cantidad);
    return subtotal * 1.13; // + IVA
}
console.log("Total:", calcularTotal(1000, 3));

// --- Una función = una responsabilidad --------------------------
// ✅ formatearPrecio solo formatea; no calcula ni imprime.
function formatearPrecio(monto) {
    return `₡${monto.toFixed(2)}`;
}
console.log(formatearPrecio(calcularTotal(1000, 3)));

// --- Adelanto: otras formas de escribir funciones ---------------
// (se explican en 06-funciones/01 y 06-funciones/02)
const multiplicar = function (x, y) { return x * y; }; // expresión de función
const dividir = (x, y) => x / y;                         // arrow function
console.log(multiplicar(4, 5), dividir(20, 4));


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea `areaRectangulo(base, altura)` que DEVUELVA el área. Imprime
 *     el resultado para 5 x 3.
 *  2. Crea `esPar(numero)` que devuelva true o false.
 *  3. Crea `saludarUsuario(nombre)` que devuelva "Hola, <nombre>!" y úsala
 *     con 2 nombres distintos.
 */
