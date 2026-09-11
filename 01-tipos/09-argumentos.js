/**
 * ============================================================
 *  09 · PARÁMETROS Y ARGUMENTOS
 * ============================================================
 *  PARÁMETRO → la variable que se define en la función:  function suma(a, b)
 *  ARGUMENTO → el valor real que se pasa al llamarla:     suma(5, 6)
 *
 *  - Si pasas MENOS argumentos, los que faltan quedan undefined.
 *  - Si pasas MÁS, los extra se ignoran (pero están en `arguments`).
 */

// --- Tu código original ----------------------------------------
function suma(a, b) { // parámetros
    console.log(arguments); // objeto "parecido a un array" con TODOS los argumentos recibidos
    return a + b;
}

let resultado = suma(5, 6); // argumentos
console.log(resultado);

console.log(typeof suma); // "function" → las funciones también son valores (objetos)

// --- Menos o más argumentos -------------------------------------
console.log(suma(5));          // 5 + undefined = NaN
console.log(suma(1, 2, 3, 4)); // 3 → el 3 y el 4 se ignoran

// --- arguments: la forma ANTIGUA de aceptar "n" argumentos -----
function sumarTodoAntiguo() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
console.log(sumarTodoAntiguo(1, 2, 3, 4)); // 10
// ⚠️ `arguments` NO existe en arrow functions y no es un array real.

// --- Rest parameters: la forma MODERNA ✅ -----------------------
function sumarTodo(...numeros) {         // numeros es un ARRAY real
    let total = 0;
    for (let n of numeros) total += n;
    return total;
}
console.log(sumarTodo(1, 2, 3, 4, 5));   // 15

// Rest debe ir al final: primero parámetros fijos, luego el resto
function registrar(nivel, ...mensajes) {
    console.log(`[${nivel}]`, mensajes.join(" | "));
}
registrar("INFO", "Servidor iniciado", "Puerto 3000");

// --- Valores por defecto ----------------------------------------
function saludar(nombre = "invitado", saludo = "Hola") {
    return `${saludo}, ${nombre}`;
}
console.log(saludar());                 // "Hola, invitado"
console.log(saludar("Daniel"));         // "Hola, Daniel"
console.log(saludar("Ana", "Buenas"));  // "Buenas, Ana"

// --- Pasar un objeto como argumento (patrón de React) -----------
// Cuando hay muchos parámetros, el ORDEN confunde. Mejor un objeto:
function crearBoton({ texto, color = "azul", deshabilitado = false }) {
    return `Botón "${texto}" (${color}) ${deshabilitado ? "deshabilitado" : "activo"}`;
}
console.log(crearBoton({ texto: "Enviar", color: "verde" }));
// 💡 Así reciben sus datos los componentes: function Boton({ texto, color }) { ... }
//    (esa sintaxis con llaves se llama destructuring → 08-es6-moderno/01)

// --- Funciones como argumentos (callbacks) ----------------------
function operar(x, y, operacion) {
    return operacion(x, y);
}
console.log(operar(8, 2, suma));                 // 10 (pasamos la función SIN paréntesis)
console.log(operar(8, 2, (x, y) => x * y));      // 16


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea `promedio(...notas)` que devuelva el promedio de cualquier
 *     cantidad de notas. Prueba con promedio(80, 90, 100).
 *  2. Crea `crearUsuario(nombre, rol = "lector")` que devuelva un objeto
 *     { nombre, rol }. Llámala con y sin rol.
 *  3. ¿Qué devuelve suma("5", 6)? ¿Por qué? Escribe la respuesta en un comentario.
 */
