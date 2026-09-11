/**
 * ============================================================
 *  01 · VARIABLES
 * ============================================================
 *  Una variable es un NOMBRE que apunta a un VALOR guardado en memoria.
 *
 *  let   → se puede reasignar. Alcance de BLOQUE { }.
 *  const → NO se puede reasignar. Alcance de bloque. (ver 03-constantes.js)
 *  var   → forma antigua (antes de ES6/2015). Alcance de FUNCIÓN y
 *          comportamientos raros. En código moderno (y en React) NO se usa.
 *
 *  Regla práctica: usa const por defecto; usa let solo si vas a reasignar.
 */

// --- Tu código original ----------------------------------------
let nombre = "Hola JS";
let NombreCompleto;   // PascalCase (UpperCamelCase) → se reserva para CLASES y COMPONENTES de React
let nombreCompleto;   // camelCase → la convención para variables y funciones en JS ✅
let nombre_completo;  // snake_case → válido, pero no es la convención en JS
console.log(NombreCompleto); // undefined → declarada, pero sin valor asignado

let apellido;
console.log(apellido); // undefined

// --- Declarar vs asignar ---------------------------------------
let edad;               // 1) declaración (se crea el nombre)
edad = 30;              // 2) asignación (se le da un valor)
let ciudad = "Cartago"; // declaración + asignación en una sola línea
console.log(nombre, edad, ciudad);

// Reasignar un let
edad = 31;
console.log("Edad reasignada:", edad);

// Varias variables en una línea (válido, pero menos legible)
let x = 1, y = 2, z = 3;
console.log(x, y, z);

// --- Reglas para nombrar ---------------------------------------
// ✅ Puede empezar con letra, $ o _
let $precio = 100;
let _interno = true;
let usuario2 = "Ana";  // se permiten números, pero NO al inicio
console.log($precio, _interno, usuario2);

// ❌ let 2usuario = "Ana";  → SyntaxError: no puede empezar con número
// ❌ let mi-variable = 1;   → SyntaxError: el guion se lee como una resta
// ❌ let let = 5;           → SyntaxError: palabra reservada (let, const, if, class, return...)
// ⚠️ JS distingue mayúsculas: nombreCompleto y NombreCompleto son DOS variables distintas.
// 💡 Usa nombres descriptivos: `precioTotal` se entiende; `pt` no.

// --- let tiene alcance de BLOQUE --------------------------------
{
    let mensaje = "Solo existo dentro de estas llaves";
    console.log(mensaje);
}
// console.log(mensaje); // ❌ ReferenceError: mensaje is not defined

// --- var: por qué evitarlo --------------------------------------
if (true) {
    var seEscapa = "var ignora el bloque del if";
}
console.log(seEscapa); // funciona 😬 → fuente clásica de bugs. Con let daría error.

// --- No se puede declarar dos veces el mismo let ----------------
// let nombre = "otro"; // ❌ SyntaxError: Identifier 'nombre' has already been declared


/* ============================================================
 *  EJERCICIOS  (soluciones en soluciones/01-tipos.js)
 * ============================================================
 *  1. Declara una variable con tu nombre y otra con tu carrera. Imprímelas
 *     en un solo console.log.
 *  2. Declara `contador` en 0. Súmale 1 tres veces (reasignando) e imprime
 *     el resultado final.
 *  3. ¿Cuáles de estos nombres son válidos? Primero adivina, luego
 *     pruébalo descomentando uno por uno:
 *       precioTotal, 1erLugar, _temp, total-venta, $boton, class
 */
