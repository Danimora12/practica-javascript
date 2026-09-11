/**
 * ============================================================
 *  06 · OBJETOS
 * ============================================================
 *  Un objeto agrupa datos relacionados en pares LLAVE: VALOR.
 *  Las llaves se llaman "propiedades". Si el valor es una función,
 *  se llama "método".
 *
 *  En React TODO son objetos: las props, el estado, las respuestas de APIs.
 */

// --- Tu código original ----------------------------------------
let nombre = "Tanjiro";
let anime = "Demon Slayer";
let edad = 16; // ⚠️ antes era "16" (string). Una edad debería ser number.

let personaje = {
    nombre: "Tanjiro", // par llave-valor
    anime: "Demon Slayer",
    edad: 16,
}; // objeto literal
console.log(personaje);
console.log(personaje.nombre);     // notación de PUNTO
console.log(personaje["anime"]);   // notación de CORCHETES

personaje.edad = 13; // cambiar un valor

let llave = "edad";
personaje[llave] = 16; // ✅ los corchetes sirven para llaves DINÁMICAS (guardadas en una variable)
// personaje.llave = 16 → crearía una propiedad llamada literalmente "llave" ❌

delete personaje.anime; // eliminar una propiedad

console.log(personaje);

// --- Shorthand: si la variable se llama igual que la llave ------
// Aprovechamos las variables `nombre`, `anime` y `edad` de arriba:
let personaje2 = { nombre, anime, edad }; // igual a { nombre: nombre, anime: anime, edad: edad }
console.log(personaje2);

// --- Agregar propiedades nuevas ---------------------------------
personaje2.respiracion = "Agua";
console.log(personaje2);

// --- Acceder a algo que no existe -------------------------------
console.log(personaje2.hermana);          // undefined (no da error)
// console.log(personaje2.hermana.nombre); // ❌ TypeError: Cannot read properties of undefined
console.log(personaje2.hermana?.nombre);  // undefined ✅ optional chaining (ver 03-operadores/03)

// --- Objetos anidados -------------------------------------------
let usuario = {
    nombre: "Daniel",
    direccion: {
        provincia: "Cartago",
        pais: "Costa Rica",
    },
    habilidades: ["SQL", "Power BI", "JavaScript"],
};
console.log(usuario.direccion.provincia);  // "Cartago"
console.log(usuario.habilidades[2]);       // "JavaScript"

// --- Métodos: funciones dentro de un objeto --------------------
let calculadora = {
    marca: "Casio",
    sumar(a, b) {            // forma corta de escribir un método
        return a + b;
    },
    describir() {
        return `Calculadora ${this.marca}`; // this = el objeto que llama al método
    },
};
console.log(calculadora.sumar(2, 3));
console.log(calculadora.describir());

// --- ¿Existe una propiedad? -------------------------------------
console.log("nombre" in usuario);             // true
console.log(Object.hasOwn(usuario, "edad"));  // false

// --- Arrays de objetos: el formato más común de datos -----------
let productos = [
    { id: 1, nombre: "Café", precio: 2500 },
    { id: 2, nombre: "Pan", precio: 1200 },
];
console.log(productos[0].nombre); // "Café"
console.table(productos);         // tabla en la consola del navegador


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea un objeto `libro` con titulo, autor, anio y disponible (boolean).
 *     Imprime el título con notación de punto y el autor con corchetes.
 *  2. Cambia `disponible` a false, agrega la propiedad `paginas` y elimina `anio`.
 *  3. Crea `const campo = "autor"` y úsalo para leer libro[campo].
 *  4. Agrega un método `resumen()` que devuelva "Titulo - Autor" usando this.
 */
