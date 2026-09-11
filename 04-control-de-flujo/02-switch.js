/**
 * ============================================================
 *  04-02 · SWITCH (y la alternativa con objetos)
 * ============================================================
 *  switch compara UN valor contra varios casos usando ===.
 *  - break → sale del switch (si lo olvidas, sigue al siguiente caso).
 *  - default → cuando ningún caso coincide.
 *
 *  Útil cuando comparas una variable contra muchos valores fijos.
 *  💡 En React lo verás en los "reducers" (useReducer): switch (action.type)
 */

// --- Básico ------------------------------------------------------------
const dia = 3;
let nombreDia;

switch (dia) {
    case 1:
        nombreDia = "Lunes";
        break;
    case 2:
        nombreDia = "Martes";
        break;
    case 3:
        nombreDia = "Miércoles";
        break;
    default:
        nombreDia = "Día no válido";
}
console.log(nombreDia);

// --- ⚠️ Olvidar el break ------------------------------------------------
const color = "rojo";
switch (color) {
    case "rojo":
        console.log("Es rojo");
    // sin break → "cae" al siguiente caso (fall-through)
    case "azul":
        console.log("Es azul 😬 (esto no debería imprimirse)");
        break;
}

// --- Agrupar casos (fall-through intencional) ---------------------------
function tipoDeDia(dia) {
    switch (dia) {
        case "sábado":
        case "domingo":
            return "Fin de semana";   // return también sale del switch
        case "lunes":
        case "martes":
        case "miércoles":
        case "jueves":
        case "viernes":
            return "Día laboral";
        default:
            return "No es un día";
    }
}
console.log(tipoDeDia("domingo"), "|", tipoDeDia("martes"));

// --- switch usa === (tipo estricto) --------------------------------------
const valor = "1";
switch (valor) {
    case 1:
        console.log("número 1");
        break;
    case "1":
        console.log("string '1' ✅");
        break;
}

// --- switch(true) para rangos (posible, pero if/else suele ser más claro) -
const puntos = 82;
switch (true) {
    case puntos >= 90:
        console.log("A");
        break;
    case puntos >= 80:
        console.log("B");
        break;
    default:
        console.log("C");
}

// --- Patrón de reducer (así se ve en React con useReducer) --------------
function carritoReducer(estado, accion) {
    switch (accion.type) {
        case "agregar":
            return { ...estado, items: estado.items + 1 };
        case "quitar":
            return { ...estado, items: Math.max(0, estado.items - 1) };
        case "vaciar":
            return { ...estado, items: 0 };
        default:
            return estado;
    }
}
let estado = { items: 0 };
estado = carritoReducer(estado, { type: "agregar" });
estado = carritoReducer(estado, { type: "agregar" });
estado = carritoReducer(estado, { type: "quitar" });
console.log("Carrito:", estado);

// --- Alternativa: objeto como "tabla de búsqueda" ✅ ---------------------
// Cuando cada caso solo devuelve un valor, un objeto es más corto y legible.
const ESTADOS_PEDIDO = {
    pendiente: "⏳ Pendiente de pago",
    pagado: "💳 Pagado",
    enviado: "🚚 En camino",
    entregado: "✅ Entregado",
};
function describirEstado(estadoPedido) {
    return ESTADOS_PEDIDO[estadoPedido] ?? "❓ Estado desconocido";
}
console.log(describirEstado("enviado"), "|", describirEstado("perdido"));


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. `precioPlan(plan)` con switch: "basico" → 5000, "pro" → 12000,
 *     "empresa" → 30000, otro → 0.
 *  2. Reescribe el ejercicio 1 usando un objeto en vez de switch.
 *  3. `calculadora(a, b, operador)` con switch para "+", "-", "*", "/".
 *     Si divide entre 0, devuelve "No se puede dividir entre 0".
 */
