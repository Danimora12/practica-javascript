/**
 * ============================================================
 *  02-06 · ENUMERAR (recorrer) PROPIEDADES DE UN OBJETO
 * ============================================================
 *  Formas de recorrer un objeto:
 *   for...in               → recorre las LLAVES
 *   Object.keys(obj)       → array de llaves
 *   Object.values(obj)     → array de valores
 *   Object.entries(obj)    → array de pares [llave, valor]
 *
 *  Los arrays que devuelven keys/values/entries se pueden combinar con
 *  map, filter, etc. (07-arrays). Es lo más usado en código moderno.
 */

const producto = {
    nombre: "Teclado",
    precio: 25000,
    stock: 12,
    categoria: "Periféricos",
};

// --- for...in -----------------------------------------------------
for (const llave in producto) {
    console.log(`${llave}: ${producto[llave]}`); // corchetes porque la llave es variable
}

// --- Object.keys / values / entries -------------------------------
console.log(Object.keys(producto));    // ["nombre", "precio", "stock", "categoria"]
console.log(Object.values(producto));  // ["Teclado", 25000, 12, "Periféricos"]
console.log(Object.entries(producto)); // [["nombre","Teclado"], ["precio",25000], ...]

console.log("Cantidad de propiedades:", Object.keys(producto).length);

// --- for...of + entries + destructuring (forma moderna) ✅ --------
for (const [llave, valor] of Object.entries(producto)) {
    console.log(`→ ${llave} = ${valor}`);
}

// --- Ejemplo real: sumar valores numéricos ------------------------
const ventasPorMes = { enero: 120000, febrero: 95000, marzo: 143000 };
let totalVentas = 0;
for (const monto of Object.values(ventasPorMes)) {
    totalVentas += monto;
}
console.log("Total trimestre:", totalVentas);

// --- Ejemplo real: validar un formulario --------------------------
const formulario = { nombre: "Daniel", email: "", telefono: "" };
const camposVacios = Object.keys(formulario).filter((campo) => formulario[campo] === "");
console.log("Campos vacíos:", camposVacios); // ["email", "telefono"]

// --- Verificar si una propiedad existe ----------------------------
console.log("precio" in producto);              // true
console.log(Object.hasOwn(producto, "color"));  // false
console.log(producto.color !== undefined);      // false (menos confiable si el valor puede ser undefined)

// --- De entries de vuelta a objeto --------------------------------
const preciosConIva = Object.fromEntries(
    Object.entries({ cafe: 2000, pan: 1000 }).map(([item, precio]) => [item, precio * 1.13])
);
console.log(preciosConIva);

// --- ¿Objeto vacío? -----------------------------------------------
const vacio = {};
console.log("¿Vacío?", Object.keys(vacio).length === 0); // true
// ⚠️ `if (vacio)` es true: un objeto vacío es "truthy".


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Dado `const notas = { mate: 85, ciencias: 92, historia: 78 }`,
 *     imprime cada materia con su nota usando for...of + Object.entries.
 *  2. Calcula el promedio de esas notas usando Object.values.
 *  3. Escribe `contarPropiedades(obj)` que devuelva cuántas propiedades tiene.
 */
