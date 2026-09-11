/**
 * ============================================================
 *  02-01 · DINAMISMO DE LOS OBJETOS
 * ============================================================
 *  Los objetos en JS son DINÁMICOS: después de crearlos puedes
 *  AGREGAR, MODIFICAR y ELIMINAR propiedades y métodos en cualquier
 *  momento, incluso si la variable es const.
 *
 *  Esto da mucha flexibilidad... y también bugs difíciles de rastrear.
 *  Por eso existen Object.freeze / Object.seal y, en React, la regla
 *  de "no mutar el estado".
 */

// --- Un objeto vacío que va creciendo ---------------------------
const usuario = {};
console.log("Inicio:", usuario);

usuario.nombre = "Daniel";          // agregar propiedad
usuario["email"] = "d@correo.com";  // agregar con corchetes
usuario.edad = 30;
console.log("Con datos:", usuario);

// --- Agregar un método en tiempo de ejecución -------------------
usuario.saludar = function () {
    return `Hola, soy ${this.nombre}`;
};
console.log(usuario.saludar());

// --- Modificar y eliminar ---------------------------------------
usuario.edad = 31;
delete usuario.email;
console.log("Modificado:", usuario);

// --- Propiedades con nombre dinámico ----------------------------
// Muy común en formularios: el nombre del campo viene de una variable.
const campo = "telefono";
usuario[campo] = "8888-8888";
console.log(usuario.telefono);

const preferencias = {};
const opciones = ["tema", "idioma", "notificaciones"];
const valores = ["oscuro", "es", true];
for (let i = 0; i < opciones.length; i++) {
    preferencias[opciones[i]] = valores[i];
}
console.log("Preferencias:", preferencias);

// --- const NO impide el dinamismo -------------------------------
const producto = { nombre: "Laptop" };
producto.precio = 450000; // ✅ se puede
// producto = {};         // ❌ TypeError: lo que no se puede es REASIGNAR
console.log(producto);

// --- Limitar el dinamismo ---------------------------------------
// Object.seal: NO agregar ni eliminar, SÍ modificar existentes
const sellado = Object.seal({ color: "rojo" });
sellado.color = "azul";   // ✅ cambia
sellado.tamano = "XL";    // ignorado
delete sellado.color;     // ignorado
console.log("Sellado:", sellado, Object.isSealed(sellado));

// Object.freeze: NO agregar, NO eliminar, NO modificar
const congelado = Object.freeze({ version: "1.0" });
congelado.version = "2.0"; // ignorado
congelado.autor = "yo";    // ignorado
console.log("Congelado:", congelado, Object.isFrozen(congelado));

// ⚠️ freeze es SUPERFICIAL: los objetos internos siguen siendo mutables
const app = Object.freeze({ config: { debug: false } });
app.config.debug = true; // ✅ cambia, porque config es otro objeto
console.log("Freeze superficial:", app);

// --- Riesgo del dinamismo: los typos no dan error ---------------
const cliente = { nombre: "Ana" };
cliente.nombr = "Ana María"; // typo → crea una propiedad NUEVA en vez de actualizar
console.log(cliente);        // { nombre: 'Ana', nombr: 'Ana María' } 😬
// 💡 TypeScript detecta este tipo de errores antes de ejecutar.


/* ============================================================
 *  EJERCICIOS  (soluciones en soluciones/02-Dinamico.js)
 * ============================================================
 *  1. Crea `const mascota = {}`. Agrégale nombre, especie y un método
 *     `presentarse()` que devuelva "Soy <nombre>, un <especie>".
 *  2. Elimina la especie y vuelve a llamar presentarse(). ¿Qué pasó?
 *  3. Dado `const claves = ["a", "b", "c"]`, crea un objeto
 *     { a: 0, b: 1, c: 2 } usando un for y corchetes.
 *  4. Congela un objeto e intenta cambiarlo. Verifica con Object.isFrozen.
 */
