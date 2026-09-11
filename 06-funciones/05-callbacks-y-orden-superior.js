/**
 * ============================================================
 *  06-05 · CALLBACKS Y FUNCIONES DE ORDEN SUPERIOR
 * ============================================================
 *  CALLBACK: una función que se pasa como argumento a otra función, para
 *  que esta la ejecute ("te llamo de vuelta") cuando corresponda.
 *
 *  FUNCIÓN DE ORDEN SUPERIOR: una función que RECIBE funciones y/o
 *  DEVUELVE funciones. Ej: map, filter, setTimeout, addEventListener.
 *
 *  ⭐ En React pasas callbacks todo el tiempo: onClick={manejarClick},
 *     onChange, y funciones de un componente padre a un hijo por props.
 */

// --- Callback síncrono ----------------------------------------------------------------
function procesarNombre(nombre, callback) {
    const limpio = nombre.trim();
    return callback(limpio);
}
console.log(procesarNombre("  daniel ", (n) => n.toUpperCase()));
console.log(procesarNombre("  daniel ", (n) => n.length));

// --- Pasar una función con nombre (sin paréntesis) ------------------------------------
function gritar(texto) {
    return `${texto.toUpperCase()}!!!`;
}
console.log(procesarNombre(" hola ", gritar));     // ✅ pasamos la función
// console.log(procesarNombre(" hola ", gritar())); // ❌ la ejecuta YA, sin argumento → TypeError

// --- Crear nuestro propio "map" para entender cómo funciona ----------------------------
function miMap(array, transformar) {
    const resultado = [];
    for (const elemento of array) {
        resultado.push(transformar(elemento));
    }
    return resultado;
}
console.log(miMap([1, 2, 3], (n) => n * 10));  // [10, 20, 30]

function miFilter(array, condicion) {
    const resultado = [];
    for (const elemento of array) {
        if (condicion(elemento)) resultado.push(elemento);
    }
    return resultado;
}
console.log(miFilter([5, 12, 8, 20], (n) => n > 10)); // [12, 20]

// --- Los métodos reales hacen lo mismo (07-arrays/03) ------------------------------------
console.log([1, 2, 3].map((n) => n * 10), [5, 12, 8, 20].filter((n) => n > 10));

// --- Callback asíncrono: se ejecuta DESPUÉS -------------------------------------------------
console.log("1. Antes del setTimeout");
setTimeout(() => {
    console.log("3. Dentro del setTimeout (se ejecuta al final)");
}, 0);
console.log("2. Después del setTimeout");

// --- Callback como "evento": avisar cuando algo pasa ---------------------------------------
function descargarArchivo(nombre, alTerminar, alFallar) {
    const exito = nombre.endsWith(".pdf");
    if (exito) {
        alTerminar(`${nombre} descargado`);
    } else {
        alFallar(`Formato no soportado: ${nombre}`);
    }
}
descargarArchivo(
    "factura.pdf",
    (msg) => console.log("✅", msg),
    (err) => console.log("❌", err)
);
descargarArchivo(
    "virus.exe",
    (msg) => console.log("✅", msg),
    (err) => console.log("❌", err)
);

// --- Función que DEVUELVE funciones ------------------------------------------------------------
function crearValidador(minimo) {
    return (texto) => texto.length >= minimo;
}
const validarPassword = crearValidador(8);
const validarUsuario = crearValidador(3);
console.log(validarPassword("123"), validarUsuario("dani")); // false true

// --- Composición: combinar funciones pequeñas -----------------------------------------------------
const quitarEspacios = (s) => s.trim();
const minusculas = (s) => s.toLowerCase();
const reemplazarEspacios = (s) => s.replaceAll(" ", "-");
const componer = (...fns) => (valor) => fns.reduce((acc, fn) => fn(acc), valor);
const slug = componer(quitarEspacios, minusculas, reemplazarEspacios);
console.log(slug("  Mi Primer Proyecto React  ")); // "mi-primer-proyecto-react"

// --- Patrón React (comentado): padre pasa un callback al hijo ---------------------------------------
/*
 *  function Padre() {
 *      const manejarEliminar = (id) => setTareas(tareas.filter((t) => t.id !== id));
 *      return <Tarea id={1} onEliminar={manejarEliminar} />;
 *  }
 *  function Tarea({ id, onEliminar }) {
 *      return <button onClick={() => onEliminar(id)}>Eliminar</button>;
 *  }
 */
// Simulación sin JSX:
function Tarea({ id, onEliminar }) {
    return { clic: () => onEliminar(id) };
}
let tareas = [{ id: 1 }, { id: 2 }];
const botonTarea = Tarea({ id: 1, onEliminar: (id) => (tareas = tareas.filter((t) => t.id !== id)) });
botonTarea.clic();
console.log("Tareas después de eliminar:", tareas);


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Escribe `repetir(veces, callback)` que ejecute el callback `veces` veces
 *     pasándole el número de vuelta. Ej: repetir(3, (i) => console.log(i)).
 *  2. Implementa `miFind(array, condicion)` que devuelva el primer elemento
 *     que cumpla la condición, o undefined.
 *  3. Crea `calcular(a, b, operacion)` y pásale 4 callbacks distintos
 *     (suma, resta, multiplicación, potencia).
 */
