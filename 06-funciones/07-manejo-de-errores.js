/**
 * ============================================================
 *  06-07 · MANEJO DE ERRORES: try / catch / finally / throw
 * ============================================================
 *  try     → código que podría fallar
 *  catch   → qué hacer si falla (recibe el error)
 *  finally → se ejecuta SIEMPRE (falle o no)
 *  throw   → lanzar un error propio
 *
 *  Un error no capturado DETIENE el programa. Capturarlo permite
 *  mostrar un mensaje amigable y seguir funcionando.
 *
 *  ⭐ En React: try/catch con async/await al hacer fetch (11-asincronia).
 */

// --- Error sin capturar (comentado porque detendría el archivo) ------------------------
// const datos = undefined;
// datos.nombre; // ❌ TypeError: Cannot read properties of undefined

// --- try / catch -------------------------------------------------------------------------
try {
    const datos = undefined;
    console.log(datos.nombre);
    console.log("Esta línea nunca se ejecuta");
} catch (error) {
    console.log("Se capturó un error:");
    console.log("  nombre:", error.name);     // "TypeError"
    console.log("  mensaje:", error.message);
}
console.log("✅ El programa sigue ejecutándose");

// --- Tipos de error comunes ------------------------------------------------------------
const pruebas = [
    () => variableInexistente,            // ReferenceError
    () => null.propiedad,                 // TypeError
    () => JSON.parse("{ esto no es json"), // SyntaxError
    () => new Array(-1),                  // RangeError
];
for (const prueba of pruebas) {
    try {
        prueba();
    } catch (error) {
        console.log(`${error.name}: ${error.message}`);
    }
}

// --- throw: lanzar tus propios errores ---------------------------------------------------
function dividir(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("Ambos argumentos deben ser números");
    }
    if (b === 0) {
        throw new Error("No se puede dividir entre cero");
    }
    return a / b;
}

try {
    console.log(dividir(10, 2));
    console.log(dividir(10, 0));
} catch (error) {
    console.log("❌", error.message);
}

// --- finally ------------------------------------------------------------------------------
function cargarDatos(debeFallar) {
    let cargando = true;
    try {
        if (debeFallar) throw new Error("Servidor no responde");
        return "Datos cargados";
    } catch (error) {
        return `Error: ${error.message}`;
    } finally {
        cargando = false;
        console.log("finally → cargando =", cargando); // se ejecuta incluso con return
    }
}
console.log(cargarDatos(false));
console.log(cargarDatos(true));
// 💡 En React: finally { setCargando(false) } para ocultar el spinner pase lo que pase.

// --- Errores personalizados ----------------------------------------------------------------
class ErrorValidacion extends Error {
    constructor(campo, mensaje) {
        super(mensaje);
        this.name = "ErrorValidacion";
        this.campo = campo;
    }
}

function validarRegistro({ email, password }) {
    if (!email?.includes("@")) throw new ErrorValidacion("email", "Email inválido");
    if ((password ?? "").length < 8) throw new ErrorValidacion("password", "Mínimo 8 caracteres");
    return "Registro válido";
}

for (const intento of [
    { email: "dani@correo.com", password: "12345678" },
    { email: "dani.correo.com", password: "12345678" },
    { email: "dani@correo.com", password: "123" },
]) {
    try {
        console.log("✅", validarRegistro(intento));
    } catch (error) {
        if (error instanceof ErrorValidacion) {
            console.log(`⚠️ Campo "${error.campo}": ${error.message}`);
        } else {
            throw error; // si no es un error que esperamos, lo relanzamos
        }
    }
}

// --- Errores en JSON (muy común con APIs) ---------------------------------------------------
function parsearSeguro(texto, valorPorDefecto = null) {
    try {
        return JSON.parse(texto);
    } catch {
        return valorPorDefecto; // catch sin (error) si no lo necesitas
    }
}
console.log(parsearSeguro('{"ok": true}'), parsearSeguro("basura", {}));

// --- Buenas prácticas -----------------------------------------------------------------------
// ❌ catch vacío: esconde bugs
// try { algo(); } catch (e) {}
// ✅ Captura solo donde puedas HACER algo (mostrar mensaje, reintentar, valor por defecto).
// ✅ Usa console.error para errores: aparece en rojo en la consola.
console.error("Ejemplo de console.error (no es un error real)");


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. `obtenerElemento(array, indice)` que lance un RangeError si el índice
 *     está fuera del rango. Llámala dentro de try/catch.
 *  2. `convertirANumero(texto)` que lance un error si el resultado es NaN.
 *  3. `retirar(saldo, monto)` que lance errores distintos para monto negativo
 *     y saldo insuficiente, y use finally para imprimir "Operación finalizada".
 */
