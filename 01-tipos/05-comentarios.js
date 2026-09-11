/**
 * ============================================================
 *  05 · COMENTARIOS
 * ============================================================
 *  Los comentarios los ignora JS. Sirven para explicar el código.
 *
 *  //        → una línea
 *  /* ... *\/ → varias líneas (bloque)
 *  /** ... *\/ → JSDoc: documentación que VS Code muestra al pasar el mouse
 *
 *  Atajo en VS Code: Ctrl + K, Ctrl + C (comentar) / Ctrl + K, Ctrl + U (descomentar)
 *                     o Ctrl + / para alternar.
 */

// --- Tu código original ----------------------------------------
// Comentario de una sola línea
/*
    Comentario de bloque:
    puede ocupar
    varias
    líneas
*/
/**
 * Comentario estilo JSDoc:
 * cada línea empieza con *
 */

let numero = 42;

console.log(numero);

// --- JSDoc en la práctica ---------------------------------------
/**
 * Calcula el precio final aplicando IVA.
 * @param {number} precio - Precio sin impuesto.
 * @param {number} [iva=0.13] - Porcentaje de IVA (opcional).
 * @returns {number} Precio con impuesto incluido.
 */
function precioConIva(precio, iva = 0.13) {
    return precio * (1 + iva);
}
// 👉 Pasa el mouse sobre `precioConIva` aquí abajo en VS Code: verás la descripción.
console.log(precioConIva(1000));

// --- Buenas prácticas -------------------------------------------
// ❌ Comentario inútil: repite lo que el código ya dice
let total = 0; // asigna 0 a total

// ✅ Comentario útil: explica el POR QUÉ
// Se redondea a 2 decimales porque la pasarela de pago rechaza más decimales.
let monto = Math.round(1234.5678 * 100) / 100;
console.log(total, monto);

// ✅ Marcadores habituales (extensiones como "Todo Tree" los resaltan)
// TODO: validar que el monto no sea negativo
// FIXME: falla cuando el precio viene como string

// 💡 En JSX (React) los comentarios se escriben así: {/* comentario */}


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Escribe una función `saludar(nombre)` documentada con JSDoc
 *     (@param y @returns) y verifica que VS Code muestre la ayuda.
 *  2. Comenta y descomenta un bloque de 3 líneas usando el atajo del teclado.
 */
