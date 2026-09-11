/**
 * ============================================================
 *  04-01 · IF / ELSE IF / ELSE
 * ============================================================
 *  if (condición) { ... }            → se ejecuta si la condición es truthy
 *  else if (otraCondición) { ... }   → se evalúa solo si lo anterior falló
 *  else { ... }                      → si nada se cumplió
 *
 *  Buenas prácticas:
 *   - Usa siempre llaves { }, aunque sea una sola línea.
 *   - Prefiere "guard clauses" (return temprano) a los if anidados.
 */

// --- Básico ----------------------------------------------------------
const hora = 14;

if (hora < 12) {
    console.log("Buenos días");
} else if (hora < 19) {
    console.log("Buenas tardes");
} else {
    console.log("Buenas noches");
}

// --- El orden importa: se ejecuta SOLO el primer bloque que se cumple ---
const nota = 95;
if (nota >= 70) {
    console.log("Aprobado");        // entra aquí...
} else if (nota >= 90) {
    console.log("Excelente");       // ...y esto nunca se ejecuta ⚠️
}

// Corregido: de la condición más específica a la más general
if (nota >= 90) {
    console.log("Excelente");
} else if (nota >= 70) {
    console.log("Aprobado");
} else {
    console.log("Reprobado");
}

// --- Condiciones combinadas ------------------------------------------
const edad = 22;
const tieneEntrada = true;
if (edad >= 18 && tieneEntrada) {
    console.log("Puede entrar al concierto");
}

// --- ❌ If anidados ("pirámide") -------------------------------------
function procesarPagoAnidado(usuario, monto) {
    if (usuario) {
        if (usuario.activo) {
            if (monto > 0) {
                if (usuario.saldo >= monto) {
                    return "Pago realizado";
                } else {
                    return "Saldo insuficiente";
                }
            } else {
                return "Monto inválido";
            }
        } else {
            return "Usuario inactivo";
        }
    } else {
        return "Usuario no encontrado";
    }
}

// --- ✅ Guard clauses: validar y salir temprano -----------------------
function procesarPago(usuario, monto) {
    if (!usuario) return "Usuario no encontrado";
    if (!usuario.activo) return "Usuario inactivo";
    if (monto <= 0) return "Monto inválido";
    if (usuario.saldo < monto) return "Saldo insuficiente";

    return "Pago realizado"; // el "camino feliz" queda al final y sin sangría
}

const cliente = { activo: true, saldo: 10000 };
console.log(procesarPagoAnidado(cliente, 5000), "|", procesarPago(cliente, 5000));
console.log(procesarPago(cliente, 50000));
console.log(procesarPago(null, 100));
// 💡 En React verás: if (cargando) return <Spinner />; al inicio de un componente.

// --- if vs ternario ----------------------------------------------------
const stock = 0;
// Para ELEGIR UN VALOR → ternario
const etiqueta = stock > 0 ? "Disponible" : "Agotado";
console.log(etiqueta);
// Para EJECUTAR ACCIONES → if
if (stock === 0) {
    console.log("Notificar al proveedor");
}

// --- Rangos -------------------------------------------------------------
function clasificarTemperatura(grados) {
    if (grados < 0) return "Congelado";
    if (grados < 15) return "Frío";
    if (grados < 25) return "Agradable";
    return "Caluroso";
}
console.log(clasificarTemperatura(-3), clasificarTemperatura(20), clasificarTemperatura(31));


/* ============================================================
 *  EJERCICIOS  (soluciones en soluciones/04-control-de-flujo.js)
 * ============================================================
 *  1. `calcularDescuento(total)`: 0% si total < 10000, 5% hasta 50000,
 *     10% si es mayor. Devuelve el total con descuento.
 *  2. `validarPassword(pass)` con guard clauses: "Muy corta" si < 8
 *     caracteres, "Falta un número" si no incluye dígitos (usa /\d/.test(pass)),
 *     y "Válida" en otro caso.
 *  3. FizzBuzz de un número: "Fizz" si es múltiplo de 3, "Buzz" de 5,
 *     "FizzBuzz" de ambos, o el número si no.
 */
