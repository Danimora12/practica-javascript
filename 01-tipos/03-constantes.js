/**
 * ============================================================
 *  03 · CONSTANTES (const)
 * ============================================================
 *  const crea una variable que NO se puede REASIGNAR.
 *  - Debe inicializarse en la misma línea.
 *  - Tiene alcance de bloque (igual que let).
 *  - OJO: const NO hace que un objeto/array sea inmutable; solo impide
 *    cambiar A QUÉ apunta la variable.
 *
 *  Regla de oro moderna: const por defecto, let solo si reasignas.
 */

// --- Tu código original ----------------------------------------
const nombre = "Hola JS";
// nombre = "Chanchito Feliz";
//   ❌ TypeError: Assignment to constant variable.
//      Esta línea detenía el resto del archivo, por eso quedó comentada.
//      Descoméntala para ver el error en la consola.

console.log(nombre);

// --- const debe inicializarse -----------------------------------
// const pais;  // ❌ SyntaxError: Missing initializer in const declaration
const pais = "Costa Rica";
console.log(pais);

// --- const con objetos: el CONTENIDO sí puede cambiar ----------
const usuario = { nombre: "Daniel", rol: "dev" };
usuario.rol = "senior dev";   // ✅ permitido: cambias una propiedad
console.log(usuario);
// usuario = { nombre: "Otro" }; // ❌ TypeError: no puedes reasignar la variable

const tareas = ["estudiar"];
tareas.push("practicar");     // ✅ permitido: modificas el array
console.log(tareas);
// tareas = [];               // ❌ TypeError

// 💡 En React esto es clave: `const [tareas, setTareas] = useState([])`.
//    Aunque `tareas` sea const, podrías mutarlo por error con push. React
//    NO detecta ese cambio. Se actualiza creando un array nuevo (ver 07-arrays/05).

// --- Congelar un objeto -----------------------------------------
const config = Object.freeze({ tema: "oscuro" });
config.tema = "claro"; // se ignora en silencio (en modo estricto lanzaría error)
console.log(config.tema); // "oscuro"

// --- Convención para valores fijos de configuración -------------
const IVA = 0.13;                 // UPPER_SNAKE_CASE para constantes "reales"
const API_URL = "https://jsonplaceholder.typicode.com";
console.log(`Precio con IVA: ${1000 * (1 + IVA)}`, API_URL);

// --- Alcance de bloque ------------------------------------------
{
    const secreto = 123;
    console.log("Dentro del bloque:", secreto);
}
// console.log(secreto); // ❌ ReferenceError


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Declara una constante PI_APROX = 3.14 y calcula el área de un
 *     círculo de radio 5 (área = PI * r * r).
 *  2. Crea `const carrito = []`. Agrégale 2 productos con push e imprímelo.
 *     Luego escribe en un comentario por qué eso NO da error.
 *  3. Descomenta la línea `nombre = "Chanchito Feliz"` de arriba, lee el
 *     error en la consola y vuelve a comentarla.
 */
