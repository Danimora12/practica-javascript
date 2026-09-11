/**
 * ============================================================
 *  04-03 · BUCLES (loops)
 * ============================================================
 *  for          → cuando sabes cuántas veces repetir (con índice)
 *  while        → mientras una condición sea true
 *  do...while   → igual, pero se ejecuta al menos UNA vez
 *  for...of     → recorre VALORES de arrays, strings, Map, Set ✅
 *  for...in     → recorre LLAVES de un objeto
 *
 *  break    → sale del bucle
 *  continue → salta a la siguiente vuelta
 *
 *  💡 En React casi no escribirás bucles: usarás .map() para convertir un
 *     array en elementos (07-arrays/03). Aun así, entenderlos es básico.
 */

// --- for clásico ---------------------------------------------------------
for (let i = 0; i < 5; i++) {
    //   inicio;   condición; paso
    console.log("Vuelta", i);
}

// Recorrer un array con índice
const frutas = ["manzana", "banano", "mango"];
for (let i = 0; i < frutas.length; i++) {
    console.log(`${i + 1}. ${frutas[i]}`);
}

// Hacia atrás
for (let i = 3; i > 0; i--) {
    console.log("Cuenta regresiva:", i);
}

// --- while -------------------------------------------------------------
let intentos = 0;
while (intentos < 3) {
    console.log("Intento #", intentos + 1);
    intentos++; // ⚠️ sin esto el bucle sería INFINITO y congelaría la pestaña
}

// Ejemplo: ¿cuántos años para duplicar un ahorro al 8% anual?
let ahorro = 100000;
let anios = 0;
while (ahorro < 200000) {
    ahorro *= 1.08;
    anios++;
}
console.log(`Se duplica en ${anios} años`);

// --- do...while ---------------------------------------------------------
let numero = 10;
do {
    console.log("do...while se ejecuta al menos una vez, numero =", numero);
    numero++;
} while (numero < 5); // la condición es false desde el inicio

// --- for...of ✅ (valores) ------------------------------------------------
for (const fruta of frutas) {
    console.log("Fruta:", fruta);
}
for (const letra of "Hola") {
    console.log("Letra:", letra);
}
// ¿Necesitas el índice? usa entries()
for (const [indice, fruta] of frutas.entries()) {
    console.log(indice, fruta);
}

// --- for...in (llaves de un objeto) --------------------------------------
const persona = { nombre: "Daniel", ciudad: "Cartago", edad: 30 };
for (const llave in persona) {
    console.log(`${llave} → ${persona[llave]}`);
}
// ⚠️ No uses for...in con arrays: recorre llaves como strings ("0", "1"...).

// --- break y continue ----------------------------------------------------
const numeros = [3, 8, -1, 12, 5, 20];

for (const n of numeros) {
    if (n < 0) {
        console.log("Número negativo encontrado, me detengo");
        break;          // termina el bucle completo
    }
    console.log("Procesando", n);
}

for (const n of numeros) {
    if (n % 2 !== 0) continue; // salta los impares
    console.log("Par:", n);
}

// --- Acumuladores: patrón muy común ------------------------------------
const precios = [2500, 1200, 3800, 900];
let total = 0;
let masCaro = precios[0];
for (const precio of precios) {
    total += precio;
    if (precio > masCaro) masCaro = precio;
}
console.log("Total:", total, "| Más caro:", masCaro);

// --- Bucles anidados -------------------------------------------------------
for (let fila = 1; fila <= 3; fila++) {
    let linea = "";
    for (let col = 1; col <= 3; col++) {
        linea += `${fila * col}\t`;
    }
    console.log(linea);
}

// --- Lo mismo sin bucle (adelanto) -------------------------------------------
console.log(precios.reduce((acc, p) => acc + p, 0));   // total
console.log(frutas.map((f) => f.toUpperCase()));        // transformar
// 💡 En JSX: {frutas.map(f => <li key={f}>{f}</li>)}


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Imprime la tabla de multiplicar del 7 (7 x 1 ... 7 x 10) con for.
 *  2. Dado un array de números, cuenta cuántos son pares usando for...of.
 *  3. Con while, simula lanzar un dado (Math.floor(Math.random() * 6) + 1)
 *     hasta que salga 6. Imprime cuántos lanzamientos hicieron falta.
 *  4. Dado `const inventario = { cafe: 10, te: 0, azucar: 5 }`, imprime solo
 *     los productos con stock 0 usando for...in.
 */
