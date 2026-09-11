/**
 * ============================================================
 *  05-02 · MÉTODOS DE STRING
 * ============================================================
 *  Los strings son INMUTABLES: ningún método cambia el original,
 *  todos devuelven un string NUEVO.
 *
 *  Más usados:
 *   length, toUpperCase, toLowerCase, trim, includes, startsWith,
 *   endsWith, indexOf, slice, replace, replaceAll, split, padStart,
 *   repeat, at
 */

const texto = "  JavaScript es genial  ";

// --- Largo y acceso ---------------------------------------------------------
console.log(texto.length);         // 24 (cuenta espacios)
console.log("Hola"[0]);            // "H"
console.log("Hola".at(-1));        // "a" (último)

// --- Mayúsculas / minúsculas / espacios -------------------------------------
console.log(texto.toUpperCase());
console.log(texto.toLowerCase());
console.log(`[${texto.trim()}]`);      // quita espacios al inicio y final
console.log(`[${texto.trimStart()}]`);
console.log(texto);                    // el original no cambió

// --- Buscar -----------------------------------------------------------------
const frase = "Aprender JavaScript para usar React";
console.log(frase.includes("React"));        // true
console.log(frase.includes("react"));        // false ⚠️ distingue mayúsculas
console.log(frase.startsWith("Aprender"));   // true
console.log(frase.endsWith("React"));        // true
console.log(frase.indexOf("Java"));          // 9 (posición) | -1 si no existe

// --- Extraer ----------------------------------------------------------------
console.log(frase.slice(9, 19));  // "JavaScript" (desde 9 hasta 19 sin incluirlo)
console.log(frase.slice(-5));     // "React" (los últimos 5)
console.log(frase.slice(0, 8));   // "Aprender"

// --- Reemplazar -------------------------------------------------------------
const mensaje = "Hola mundo, mundo cruel";
console.log(mensaje.replace("mundo", "JS"));     // solo la PRIMERA coincidencia
console.log(mensaje.replaceAll("mundo", "JS"));  // todas

// --- Dividir y unir ---------------------------------------------------------
const csv = "Daniel,Cartago,Developer";
const partes = csv.split(",");         // string → array
console.log(partes);                   // ["Daniel", "Cartago", "Developer"]
console.log(partes.join(" | "));       // array → string
console.log("hola".split(""));         // ["h", "o", "l", "a"]
console.log("uno dos  tres".split(" "));

// --- Rellenar y repetir -----------------------------------------------------
console.log("7".padStart(3, "0"));            // "007"
console.log("5".padStart(2, "0") + ":" + "3".padStart(2, "0")); // "05:03"
console.log("-".repeat(20));

// --- Encadenar métodos ------------------------------------------------------
const entradaUsuario = "   DANIEL.Mora@Correo.COM ";
const emailLimpio = entradaUsuario.trim().toLowerCase();
console.log(emailLimpio); // "daniel.mora@correo.com"

// --- Ejemplos prácticos -----------------------------------------------------
// 1) Capitalizar
function capitalizar(palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
}
console.log(capitalizar("cARTAGO")); // "Cartago"

// 2) Crear un "slug" para URLs
function crearSlug(titulo) {
    return titulo
        .toLowerCase()
        .trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita tildes
        .replaceAll(" ", "-");
}
console.log(crearSlug("Cómo Aprender React Rápido")); // "como-aprender-react-rapido"

// 3) Buscador que ignora mayúsculas ⭐ (patrón típico en React con un input)
const productos = ["Café Britt", "Pan Integral", "Café de Tarrazú", "Té verde"];
const busqueda = "CAFÉ";
const resultados = productos.filter((p) => p.toLowerCase().includes(busqueda.toLowerCase()));
console.log(resultados); // ["Café Britt", "Café de Tarrazú"]

// 4) Ocultar parte de un dato
const tarjeta = "4111222233334444";
console.log(tarjeta.slice(-4).padStart(tarjeta.length, "*")); // "************4444"


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. `contarPalabras(frase)` → cantidad de palabras (usa trim y split).
 *  2. `esPalindromo(palabra)` → true si se lee igual al revés
 *     (pista: split(""), reverse(), join("")). Prueba con "Reconocer".
 *  3. `iniciales("Daniel Mora Víquez")` → "DMV".
 *  4. `truncar(texto, max)` → si el texto es más largo que max, córtalo y
 *     agrega "...". Ej: truncar("Hola mundo", 4) → "Hola..."
 */
