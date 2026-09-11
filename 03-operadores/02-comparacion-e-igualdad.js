/**
 * ============================================================
 *  03-02 · COMPARACIÓN, IGUALDAD, TRUTHY Y FALSY
 * ============================================================
 *  >  >=  <  <=         → relacionales
 *  === !==              → igualdad ESTRICTA (tipo + valor) ✅ úsalos siempre
 *  ==  !=               → igualdad "suelta" (convierte tipos) ❌ evítalos
 *
 *  FALSY: valores que en un if se comportan como false:
 *    false, 0, -0, 0n, "" (string vacío), null, undefined, NaN
 *  TRUTHY: TODO lo demás (incluidos "0", "false", [], {})
 */

// --- Relacionales --------------------------------------------------
const edad = 20;
console.log(edad > 18, edad >= 20, edad < 18, edad <= 19); // true true false false

// Strings se comparan carácter por carácter (orden Unicode)
console.log("a" < "b");        // true
console.log("Zapato" < "auto"); // true ⚠️ las mayúsculas van antes que las minúsculas
console.log("10" < "9");       // true ⚠️ comparación de texto, no numérica
console.log(10 < 9);           // false

// --- === vs == ------------------------------------------------------
console.log(1 === 1);         // true
console.log(1 === "1");       // false → distinto tipo
console.log(1 == "1");        // true  → convierte "1" a 1
console.log(0 == false);      // true  😬
console.log("" == 0);         // true  😬
console.log(null == undefined);  // true
console.log(null === undefined); // false
console.log(NaN === NaN);     // false → NaN no es igual ni a sí mismo. Usa Number.isNaN()

console.log(5 !== "5");       // true
console.log(5 != "5");        // false

// --- Objetos: se compara la referencia (ver 02-Dinamico/05) --------
console.log({} === {});       // false
const ref = {};
console.log(ref === ref);     // true

// --- Truthy y falsy -------------------------------------------------
const valores = [false, 0, "", null, undefined, NaN, "0", "false", [], {}, -1, " "];
for (const valor of valores) {
    const etiqueta = typeof valor === "string" ? `"${valor}"` : valor; // comillas para ver los strings
    console.log(etiqueta, "→", valor ? "truthy" : "falsy");
}

// --- Uso práctico ---------------------------------------------------
const nombreUsuario = "";
if (!nombreUsuario) {
    console.log("El nombre es obligatorio");
}

const carrito = [];
if (carrito) {
    console.log("⚠️ Un array vacío es TRUTHY: este if SIEMPRE entra");
}
if (carrito.length === 0) {
    console.log("✅ Así se verifica si el array está vacío");
}

// --- Trampa famosa en React ------------------------------------------
const cantidadMensajes = 0;
// En JSX: {cantidadMensajes && <Badge />}  → pinta un "0" en pantalla 😬
console.log(cantidadMensajes && "Badge");     // 0
// Correcto: {cantidadMensajes > 0 && <Badge />}
console.log(cantidadMensajes > 0 && "Badge"); // false (React no pinta false)


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Escribe `esMayorDeEdad(edad)` que devuelva true si edad >= 18.
 *  2. Clasifica como truthy o falsy (primero adivina): "", " ", 0, "0", [], null.
 *  3. ¿Por qué "10" < "9" es true? Arréglalo para que compare como números.
 */
