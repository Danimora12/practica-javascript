/**
 * ============================================================
 *  03-01 · OPERADORES ARITMÉTICOS Y DE ASIGNACIÓN
 * ============================================================
 *  +  suma (y concatenación de strings)   -  resta
 *  *  multiplicación                       /  división
 *  %  módulo (residuo)                     ** potencia
 *  ++ incremento                           -- decremento
 *
 *  Asignación: =  +=  -=  *=  /=  %=  **=
 */

let a = 10;
let b = 3;

// --- Aritméticos ---------------------------------------------------
console.log("Suma:", a + b);           // 13
console.log("Resta:", a - b);          // 7
console.log("Multiplicación:", a * b); // 30
console.log("División:", a / b);       // 3.3333...
console.log("Módulo:", a % b);         // 1 → residuo de 10 / 3
console.log("Potencia:", a ** b);      // 1000

// Usos típicos del módulo %
console.log("¿10 es par?", 10 % 2 === 0);  // true
console.log("¿7 es par?", 7 % 2 === 0);    // false
// Alternar filas de una tabla: índice % 2 → 0, 1, 0, 1...

// División entera
console.log(Math.floor(a / b)); // 3

// --- + con strings: concatena --------------------------------------
console.log("Hola" + " " + "mundo");  // "Hola mundo"
console.log("Total: " + 5 + 5);       // "Total: 55" ⚠️ se evalúa de izquierda a derecha
console.log("Total: " + (5 + 5));     // "Total: 10" ✅
console.log(`Total: ${5 + 5}`);       // "Total: 10" ✅ template literal (más legible)

// --- Precedencia (orden de evaluación) -----------------------------
console.log(2 + 3 * 4);     // 14 → * antes que +
console.log((2 + 3) * 4);   // 20 → los paréntesis mandan
// Regla: si dudas, usa paréntesis. Hacen el código más claro.

// --- Incremento y decremento ---------------------------------------
let contador = 0;
contador++;               // contador = contador + 1
contador++;
contador--;
console.log("Contador:", contador); // 1

// Postfijo vs prefijo (diferencia sutil)
let x = 5;
console.log(x++); // 5 → devuelve el valor ANTES de incrementar
console.log(x);   // 6
let y = 5;
console.log(++y); // 6 → incrementa y DESPUÉS devuelve
// 💡 Para evitar confusiones, usa ++ solo en su propia línea.

// --- Operadores de asignación --------------------------------------
let saldo = 1000;
saldo += 500;   // saldo = saldo + 500   → 1500
saldo -= 200;   // saldo = saldo - 200   → 1300
saldo *= 2;     // saldo = saldo * 2     → 2600
saldo /= 4;     // saldo = saldo / 4     → 650
saldo %= 600;   // saldo = saldo % 600   → 50
saldo **= 2;    // saldo = saldo ** 2    → 2500
console.log("Saldo:", saldo);

let mensaje = "Hola";
mensaje += ", Daniel"; // también concatena strings
console.log(mensaje);

// --- Casos raros -----------------------------------------------------
console.log(0 / 0);          // NaN
console.log(5 / 0);          // Infinity
console.log(-5 % 3);         // -2 (el signo sigue al dividendo)
console.log("10" - "4");     // 6 (coerción a número)


/* ============================================================
 *  EJERCICIOS  (soluciones en soluciones/03-operadores.js)
 * ============================================================
 *  1. Convierte 125 minutos a "2 horas y 5 minutos" usando / y %.
 *  2. Calcula el total de una compra: 3 productos de ₡2500 con 13% de IVA.
 *     Usa operadores de asignación (+=, *=).
 *  3. Predice: let n = 3; console.log(n++ + ++n); ¿Qué imprime y por qué?
 */
