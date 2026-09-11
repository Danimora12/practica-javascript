/**
 * ============================================================
 *  02 · TIPOS PRIMITIVOS
 * ============================================================
 *  Un primitivo es un valor simple (no es un objeto). JS tiene 7:
 *
 *   string     → texto:            "Hola", 'Hola', `Hola`
 *   number     → números:          42, 3.14, -7, NaN, Infinity
 *   boolean    → verdadero/falso:  true, false
 *   undefined  → "todavía no tiene valor" (lo pone JS)
 *   null       → "vacío a propósito" (lo pones TÚ)
 *   bigint     → enteros enormes:  123n
 *   symbol     → identificador único (uso avanzado)
 *
 *  Todo lo que NO es primitivo es un OBJETO (objetos, arrays, funciones...).
 */

// --- Tu código original ----------------------------------------
let numero = 1;
let texto = "Hola JS";
let verdadero = true;
// let undefined;
//   ❌ En el navegador esta línea rompe TODO el archivo:
//      "SyntaxError: Identifier 'undefined' has already been declared".
//      `undefined` ya existe como valor global. Nunca lo uses como nombre.
let undef = undefined;
let nulo = null;
console.log(numero, texto, verdadero, undef, nulo);

// --- string -----------------------------------------------------
let comillasDobles = "Hola";
let comillasSimples = 'Hola';
let backticks = `Hola ${texto}`; // template literal: permite insertar variables (ver 05-strings)
console.log(comillasDobles, comillasSimples, backticks);
console.log("Largo del texto:", texto.length);

// --- number -----------------------------------------------------
// En JS no hay "int" y "float" separados: todo es number.
let entero = 42;
let decimal = 3.14;
let negativo = -10;
console.log(entero, decimal, negativo);

console.log(0.1 + 0.2);          // 0.30000000000000004 ⚠️ imprecisión de decimales (pasa en casi todos los lenguajes)
console.log((0.1 + 0.2).toFixed(2)); // "0.30" → redondea (devuelve string)
console.log(10 / 0);             // Infinity
console.log("hola" * 3);         // NaN → "Not a Number": una operación numérica inválida
console.log(typeof NaN);         // "number" 🙃 (sí, NaN es de tipo number)
console.log(Number.isNaN("hola" * 3)); // true → forma correcta de verificar NaN

// --- boolean ----------------------------------------------------
let estaLogueado = false;
let esMayorDeEdad = 20 >= 18; // las comparaciones devuelven booleanos
console.log(estaLogueado, esMayorDeEdad);

// --- undefined vs null -----------------------------------------
let sinAsignar;             // JS le pone undefined automáticamente
let usuarioSeleccionado = null; // tú dices explícitamente "no hay nada"
console.log(sinAsignar, usuarioSeleccionado);
// 💡 En React verás mucho: const [usuario, setUsuario] = useState(null)

// --- bigint y symbol (solo para que los reconozcas) -------------
let muyGrande = 9007199254740993n;
let id = Symbol("id");
console.log(typeof muyGrande, typeof id);

// --- Los primitivos son INMUTABLES ------------------------------
let saludo = "hola";
saludo.toUpperCase();          // crea un string NUEVO, no cambia `saludo`
console.log(saludo);           // "hola"
saludo = saludo.toUpperCase(); // hay que reasignar para guardar el cambio
console.log(saludo);           // "HOLA"


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea una variable de cada tipo: string, number, boolean, undefined
 *     y null. Imprime cada una junto a su typeof.
 *  2. Calcula 0.1 + 0.2 y muestra el resultado redondeado a 1 decimal.
 *  3. ¿Qué imprime "5" * "2"? ¿Y "cinco" * 2? Explica en un comentario por qué.
 */
