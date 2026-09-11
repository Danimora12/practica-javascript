/**
 * ============================================================
 *  07 · ARRAYS (arreglos)
 * ============================================================
 *  Un array es una LISTA ORDENADA de valores.
 *  - Los índices empiezan en 0.
 *  - Pueden crecer y pueden mezclar tipos (aunque no es buena práctica).
 *  - Técnicamente son objetos: typeof [] === "object".
 *
 *  Aquí va lo básico. Los métodos importantes (map, filter, find...)
 *  están en la carpeta 07-arrays.
 */

// --- Tu código original ----------------------------------------
let animales = ["chanchito", "caballo"]; // array literal

console.log(animales);
console.log(animales[0]);   // "chanchito"
animales[2] = "dragon";     // asigna en el índice 2
console.log(animales);

animales[10] = "pez";       // ⚠️ salta del 2 al 10: crea 7 "huecos" (empty items)
console.log(animales);      // [ 'chanchito', 'caballo', 'dragon', <7 empty items>, 'pez' ]

console.log(animales[7]);   // undefined → es un hueco
console.log(typeof animales); // "object"

// --- length -----------------------------------------------------
console.log(animales.length);                 // 11 (cuenta los huecos)
console.log(animales[animales.length - 1]);   // último elemento: "pez"
console.log(animales.at(-1));                 // forma moderna de obtener el último

// --- La forma correcta de agregar: push -------------------------
let frutas = ["manzana", "banano"];
frutas.push("mango");        // agrega al final → sin huecos
console.log(frutas, frutas.length);

let ultima = frutas.pop();   // quita y devuelve el último
console.log(ultima, frutas);

// --- Detectar si algo es un array -------------------------------
console.log(Array.isArray(frutas));   // true
console.log(Array.isArray({ a: 1 })); // false

// --- Arrays de distintos tipos ----------------------------------
let mezcla = [1, "dos", true, null, { tres: 3 }, [4, 5]];
console.log(mezcla[4].tres, mezcla[5][1]); // 3 5
// 💡 Posible, pero en la práctica un array debería tener un solo "tipo" de elemento.

// --- Arrays de objetos (lo que más usarás en React) -------------
let tareas = [
    { id: 1, texto: "Estudiar JS", hecha: true },
    { id: 2, texto: "Practicar arrays", hecha: false },
];
console.log(tareas[1].texto);

// --- Recorrer un array (adelanto de 04-control-de-flujo/03) ----
for (let fruta of frutas) {
    console.log("Fruta:", fruta);
}

// --- Buscar si existe un valor ----------------------------------
console.log(frutas.includes("banano")); // true
console.log(frutas.indexOf("banano"));  // 1 (posición) | -1 si no existe


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea un array con 3 lenguajes de programación. Imprime el primero,
 *     el último (usando length) y la cantidad total.
 *  2. Agrega un lenguaje con push y verifica con includes que exista.
 *  3. Crea un array `contactos` con 2 objetos { nombre, telefono } e imprime
 *     el teléfono del segundo contacto.
 */
