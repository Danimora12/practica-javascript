/**
 * ============================================================
 *  11-01 · SÍNCRONO vs ASÍNCRONO
 * ============================================================
 *  SÍNCRONO: una línea tras otra; cada una espera a que termine la anterior.
 *  ASÍNCRONO: algo se inicia ahora y TERMINA DESPUÉS, sin bloquear el resto
 *  (pedir datos a un servidor, temporizadores, leer archivos, eventos).
 *
 *  JS tiene UN solo hilo. Para no congelarse usa el EVENT LOOP:
 *   1. Ejecuta todo el código síncrono (call stack).
 *   2. Cuando está libre, ejecuta las MICROTAREAS (promesas: then, await).
 *   3. Luego las TAREAS (setTimeout, eventos) de una en una.
 *
 *  ⭐ En React: cargar datos de una API es asíncrono → estados de
 *     "cargando", "error" y "datos".
 */

// --- Síncrono: orden predecible ------------------------------------------------------------
console.log("A");
console.log("B");
console.log("C");

// --- setTimeout: programar algo para "después" -----------------------------------------------
console.log("1. Pido un café");
setTimeout(() => {
    console.log("3. ☕ Café listo (2 segundos después)");
}, 2000);
console.log("2. Mientras tanto, reviso el celular");

// --- Incluso con 0 ms, espera a que termine el código síncrono -----------------------------------
setTimeout(() => console.log("setTimeout 0ms → después de todo lo síncrono"), 0);
console.log("Este log síncrono sale ANTES que el setTimeout de 0 ms");

// --- Microtareas (promesas) antes que tareas (setTimeout) ------------------------------------------
setTimeout(() => console.log("🟠 tarea: setTimeout"), 0);
Promise.resolve().then(() => console.log("🟢 microtarea: promesa"));
console.log("🔵 síncrono");
// Orden: 🔵 → 🟢 → 🟠

// --- Bloquear el hilo (lo que NO hay que hacer) ---------------------------------------------------------
function tareaPesada() {
    const inicio = Date.now();
    while (Date.now() - inicio < 300) {
        // bucle que ocupa el hilo 300 ms: la página no responde clics mientras tanto
    }
    return "Tarea pesada terminada";
}
console.log(tareaPesada());

// --- setInterval: repetir cada cierto tiempo ---------------------------------------------------------------
let segundos = 0;
const intervalo = setInterval(() => {
    segundos++;
    console.log(`⏱️ ${segundos}s`);
    if (segundos === 3) {
        clearInterval(intervalo); // ⚠️ siempre detén los intervalos
        console.log("Intervalo detenido");
    }
}, 1000);

// --- clearTimeout: cancelar antes de que ocurra -----------------------------------------------------------------
const recordatorio = setTimeout(() => console.log("Esto nunca se imprime"), 1500);
clearTimeout(recordatorio);
// 💡 En React, useEffect devuelve una función de limpieza que hace esto:
//    useEffect(() => { const id = setInterval(...); return () => clearInterval(id); }, []);

// --- Simular una petición a un servidor ---------------------------------------------------------------------------
function obtenerUsuarioSimulado(id, callback) {
    console.log(`Buscando usuario ${id}...`);
    setTimeout(() => {
        callback({ id, nombre: "Daniel" });
    }, 1000);
}
obtenerUsuarioSimulado(1, (usuario) => {
    console.log("Usuario recibido:", usuario);
});
console.log("La app sigue funcionando mientras llega el usuario");


/* ============================================================
 *  EJERCICIOS  (soluciones en soluciones/11-asincronia.js)
 * ============================================================
 *  1. Antes de ejecutar, escribe en qué orden se imprimen:
 *       console.log(1); setTimeout(() => console.log(2), 0);
 *       Promise.resolve().then(() => console.log(3)); console.log(4);
 *  2. Crea una cuenta regresiva de 5 a 0 con setInterval que al final
 *     imprima "🚀 Despegue" y se detenga.
 *  3. Crea `esperar(ms, mensaje)` que imprima el mensaje después de ms milisegundos.
 */
