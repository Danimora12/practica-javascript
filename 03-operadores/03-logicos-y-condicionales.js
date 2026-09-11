/**
 * ============================================================
 *  03-03 · OPERADORES LÓGICOS, TERNARIO, ?? y ?.
 * ============================================================
 *  &&  AND  → true si ambos son true
 *  ||  OR   → true si al menos uno es true
 *  !   NOT  → invierte
 *
 *  condicion ? siTrue : siFalse   → operador ternario
 *  a ?? b   → nullish coalescing: usa b solo si a es null/undefined
 *  a?.b     → optional chaining: no explota si a es null/undefined
 *
 *  ⭐ En JSX no puedes usar if dentro de las llaves {}, así que React
 *     usa MUCHO &&, ternario, ?? y ?.
 */

// --- Tabla básica ---------------------------------------------------
console.log(true && true, true && false);   // true false
console.log(true || false, false || false); // true false
console.log(!true, !false, !!"texto");      // false true true (!! convierte a boolean)

const edad = 25;
const tieneLicencia = true;
console.log("¿Puede conducir?", edad >= 18 && tieneLicencia);

const esAdmin = false;
const esEditor = true;
console.log("¿Puede editar?", esAdmin || esEditor);

// --- Cortocircuito: && y || devuelven un VALOR, no solo true/false ---
// && devuelve el primer valor falsy, o el último si todos son truthy
console.log("hola" && 42);        // 42
console.log(0 && "no llega");     // 0

// || devuelve el primer valor truthy, o el último si todos son falsy
console.log("" || "por defecto"); // "por defecto"
console.log("Ana" || "anónimo");  // "Ana"

// Ejecutar algo SOLO si se cumple una condición
const hayError = true;
hayError && console.log("Mostrando mensaje de error");
// 💡 En React: {hayError && <MensajeError />}

// --- Ternario -------------------------------------------------------
const puntos = 72;
const resultado = puntos >= 70 ? "Aprobado" : "Reprobado";
console.log(resultado);

const estaLogueado = false;
console.log(estaLogueado ? "Bienvenido" : "Inicia sesión");
// 💡 En React: {estaLogueado ? <Dashboard /> : <Login />}

// Ternarios anidados: posibles pero difíciles de leer ⚠️
const nota = 85;
const letra = nota >= 90 ? "A" : nota >= 80 ? "B" : "C";
console.log(letra); // mejor usar if/else o un objeto (04-control-de-flujo)

// --- ?? vs || --------------------------------------------------------
const cantidad = 0;
console.log(cantidad || 10);  // 10 ⚠️ trata el 0 como "vacío"
console.log(cantidad ?? 10);  // 0  ✅ solo reemplaza null/undefined

const titulo = "";
console.log(titulo || "Sin título"); // "Sin título"
console.log(titulo ?? "Sin título"); // "" (string vacío es válido para ??)

// --- Optional chaining ?. -------------------------------------------
const respuestaApi = {
    usuario: { nombre: "Daniel", perfil: null },
};
console.log(respuestaApi.usuario.nombre);            // "Daniel"
console.log(respuestaApi.usuario.perfil?.foto);      // undefined (sin error)
console.log(respuestaApi.carrito?.items?.length);    // undefined
console.log(respuestaApi.usuario.perfil?.foto ?? "avatar-default.png"); // combinación típica

// También con arrays y funciones
const lista = null;
console.log(lista?.[0]);            // undefined
const callback = undefined;
callback?.();                        // no se ejecuta y no da error

// --- Asignación lógica (ES2021) -------------------------------------
const opciones = { tema: null, idioma: "es" };
opciones.tema ??= "claro";   // asigna solo si es null/undefined
opciones.idioma ||= "en";    // asigna solo si es falsy
console.log(opciones);

// --- Precedencia: ! > && > || ----------------------------------------
console.log(true || false && false);   // true (&& se evalúa primero)
console.log((true || false) && false); // false


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea `puedeComprar(edad, saldo, precio)` que devuelva true si
 *     edad >= 18 Y saldo >= precio.
 *  2. Con un ternario, guarda "Envío gratis" si el total > 20000, si no
 *     "Envío ₡2000".
 *  3. Dado `const config = { reintentos: 0 }`, obtén los reintentos con
 *     valor por defecto 3 de forma que el 0 se respete.
 *  4. Dado `const pedido = { cliente: null }`, imprime pedido.cliente.nombre
 *     sin que explote, mostrando "Cliente desconocido" si no existe.
 */
