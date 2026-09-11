/**
 * ============================================================
 *  06-03 · PARÁMETROS: POR DEFECTO, REST Y OBJETOS
 * ============================================================
 *  (repaso y ampliación de 01-tipos/09-argumentos.js)
 *
 *  function f(a = 10)        → valor por defecto si llega undefined
 *  function f(...resto)      → junta los argumentos sobrantes en un array
 *  function f({ a, b = 2 })  → recibir un objeto y extraer propiedades
 */

// --- Valores por defecto -------------------------------------------------------
function crearSaludo(nombre = "invitado", idioma = "es") {
    const saludos = { es: "Hola", en: "Hello", nl: "Hallo" };
    return `${saludos[idioma] ?? saludos.es}, ${nombre}`;
}
console.log(crearSaludo());               // "Hola, invitado"
console.log(crearSaludo("Daniel", "nl")); // "Hallo, Daniel"
console.log(crearSaludo(undefined, "en")); // "Hello, invitado" → undefined activa el default
console.log(crearSaludo(null, "en"));      // "Hello, null" ⚠️ null NO activa el default

// El default puede usar parámetros anteriores o llamar funciones
const calcularPrecio = (base, impuesto = base * 0.13, fecha = new Date().getFullYear()) =>
    `Base ${base} + impuesto ${impuesto} (${fecha})`;
console.log(calcularPrecio(1000));

// --- Rest parameters ------------------------------------------------------------
function promedio(...notas) {
    if (notas.length === 0) return 0;
    const suma = notas.reduce((acc, n) => acc + n, 0);
    return suma / notas.length;
}
console.log(promedio(80, 90, 100)); // 90
console.log(promedio());            // 0

// Parámetros fijos + rest (rest SIEMPRE al final)
function crearEquipo(nombre, lider, ...miembros) {
    return { nombre, lider, miembros, total: miembros.length + 1 };
}
console.log(crearEquipo("Frontend", "Ana", "Luis", "Daniel", "Sofía"));

// --- Rest (en la definición) vs spread (en la llamada) --------------------------
const valores = [4, 9, 2];
console.log(Math.max(...valores)); // spread: "desarma" el array en argumentos
console.log(promedio(...valores)); // rest dentro de promedio lo vuelve a juntar

// --- Parámetro objeto + destructuring + defaults ⭐ -------------------------------
// Problema: muchos parámetros posicionales son difíciles de leer
function crearNotificacionMal(mensaje, tipo, duracion, cerrable, icono) {
    return { mensaje, tipo, duracion, cerrable, icono };
}
console.log(crearNotificacionMal("Guardado", "exito", 3000, true, "✅")); // ¿qué era el 3000? ¿y true?

// Solución: un objeto con nombres
function crearNotificacion({ mensaje, tipo = "info", duracion = 3000, cerrable = true } = {}) {
    return { mensaje, tipo, duracion, cerrable };
}
console.log(crearNotificacion({ mensaje: "Guardado", tipo: "exito" })); // orden no importa
console.log(crearNotificacion({ duracion: 5000, mensaje: "Error de red", tipo: "error" }));
console.log(crearNotificacion()); // el `= {}` evita error si no se pasa nada

// 💡 Así se definen los componentes de React:
//    function Notificacion({ mensaje, tipo = "info", duracion = 3000 }) { ... }
//    <Notificacion mensaje="Guardado" tipo="exito" />

// --- Funciones con opciones + rest de objeto ------------------------------------
function Boton({ texto, variante = "primario", ...resto }) {
    return `Botón "${texto}" (${variante}) props extra: ${JSON.stringify(resto)}`;
}
console.log(Boton({ texto: "Enviar", disabled: true, id: "btn-enviar" }));


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. `formatearNombre(nombre, apellido = "", mayusculas = false)` que devuelva
 *     el nombre completo, en mayúsculas si el tercer parámetro es true.
 *  2. `maximoYMinimo(...numeros)` que devuelva { max, min }.
 *  3. `crearTarjeta({ titulo, descripcion = "Sin descripción", destacada = false })`
 *     que devuelva un string con los datos. Llámala con distintos objetos.
 */
