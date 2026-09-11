/**
 * ============================================================
 *  08-02 · SPREAD y REST (los tres puntos ...)
 * ============================================================
 *  Misma sintaxis, dos usos opuestos:
 *
 *  SPREAD → "DESPARRAMA" un array/objeto en sus elementos.
 *           Se usa al CREAR arrays/objetos o al LLAMAR funciones.
 *              [...arr, 4]     { ...obj, a: 1 }     Math.max(...nums)
 *
 *  REST   → "JUNTA" varios elementos en un array/objeto.
 *           Se usa en PARÁMETROS o al DESTRUCTURAR.
 *              function f(...args)     const { a, ...resto } = obj
 */

// ==========================================================================================
//  SPREAD con arrays
// ==========================================================================================
const frutas = ["🍎", "🍌"];
const verduras = ["🥕", "🥦"];

const copia = [...frutas];                     // copiar
const mercado = [...frutas, ...verduras];      // combinar
const conExtra = ["🍇", ...frutas, "🍉"];      // insertar
console.log(copia, mercado, conExtra);
console.log(copia === frutas);                 // false → array nuevo

// En llamadas a funciones
const temperaturas = [22, 31, 18, 27];
console.log(Math.max(...temperaturas), Math.min(...temperaturas));

// String → array de caracteres
console.log([..."React"]);

// Set → array (quitar duplicados)
console.log([...new Set(["a", "b", "a", "c", "b"])]);

// ==========================================================================================
//  SPREAD con objetos
// ==========================================================================================
const base = { tema: "claro", idioma: "es", notificaciones: true };

const copiaObj = { ...base };
const personalizado = { ...base, tema: "oscuro" };              // sobrescribir
const extendido = { ...base, fuente: "grande" };                // agregar
const combinado = { ...base, ...{ idioma: "en", zona: "UTC-6" } };
console.log(copiaObj, personalizado, extendido, combinado);

// ⚠️ El ORDEN importa: lo que va después gana
console.log({ tema: "oscuro", ...base }); // tema: "claro" (base lo pisó)
console.log({ ...base, tema: "oscuro" }); // tema: "oscuro" ✅

// Valores por defecto + opciones del usuario (patrón muy común)
function configurar(opcionesUsuario) {
    const defaults = { tamano: "md", color: "azul", redondeado: true };
    return { ...defaults, ...opcionesUsuario };
}
console.log(configurar({ color: "verde" }));

// ⚠️ Spread es copia SUPERFICIAL (ver 02-Dinamico/07)
const perfil = { nombre: "Ana", redes: { github: "ana-dev" } };
const perfilCopia = { ...perfil };
perfilCopia.redes.github = "cambiado";
console.log(perfil.redes.github); // "cambiado" 😬
perfil.redes.github = "ana-dev";

// ==========================================================================================
//  REST en parámetros
// ==========================================================================================
function registrarVenta(vendedor, ...montos) {
    const total = montos.reduce((acc, m) => acc + m, 0);
    return `${vendedor} vendió ₡${total} en ${montos.length} ventas`;
}
console.log(registrarVenta("Daniel", 5000, 12000, 3500));

// ==========================================================================================
//  REST en destructuring
// ==========================================================================================
const [ganador, ...participantes] = ["Ana", "Luis", "Sofía"];
console.log(ganador, participantes);

const { password, ...usuarioSeguro } = { id: 1, email: "a@a.com", password: "123456" };
console.log(usuarioSeguro); // sin password ✅

// ==========================================================================================
//  En React (patrones que verás)
// ==========================================================================================
/*
 *  // Actualizar estado
 *  setUsuario({ ...usuario, nombre: "Nuevo" });
 *  setLista([...lista, nuevoItem]);
 *
 *  // Pasar todas las props a un hijo
 *  <Tarjeta {...producto} />        // igual a <Tarjeta nombre={...} precio={...} />
 *
 *  // Separar props propias de las que se pasan al elemento HTML
 *  function Boton({ variante, ...resto }) {
 *      return <button className={variante} {...resto} />;
 *  }
 */
function Tarjeta(props) {
    return `Tarjeta → ${JSON.stringify(props)}`;
}
const producto = { nombre: "Café", precio: 6500 };
console.log(Tarjeta({ ...producto, destacado: true }));


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Combina `const a = [1, 2]` y `const b = [3, 4]` en un array nuevo con
 *     un 0 al inicio.
 *  2. Dado `const usuario = { nombre: "Ana", rol: "user" }`, crea `admin`
 *     con rol "admin" y una propiedad nueva `permisos: ["todo"]`.
 *  3. Escribe `unirTextos(separador, ...textos)` que una los textos.
 *  4. Dado un objeto con { id, token, nombre, email }, crea uno nuevo sin
 *     `token` usando rest.
 */
