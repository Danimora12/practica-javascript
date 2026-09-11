/**
 * ============================================================
 *  06-06 · THIS, CALL, APPLY Y BIND
 * ============================================================
 *  `this` depende de CÓMO se llama la función, no de dónde se escribió:
 *
 *   obj.metodo()          → this = obj
 *   funcion()             → this = undefined (modo estricto) o el objeto global
 *   new Constructor()     → this = el objeto nuevo
 *   arrow () => {}        → NO tiene this propio: usa el de afuera
 *   fn.call(obj, a, b)    → this = obj, ejecuta YA
 *   fn.apply(obj, [a, b]) → igual que call, pero argumentos en array
 *   fn.bind(obj)          → devuelve una función NUEVA con this fijo
 *
 *  💡 React moderno (componentes función + hooks) casi no usa `this`.
 *     Lo verás en código con clases antiguas y en librerías. Aquí va lo esencial.
 */

// --- this en un método ---------------------------------------------------------------
const usuario = {
    nombre: "Daniel",
    saludar() {
        return `Hola, soy ${this.nombre}`;
    },
};
console.log(usuario.saludar()); // this = usuario ✅

// --- Perder el this: el error más común -----------------------------------------------
const saludarSuelto = usuario.saludar; // copiamos la función, sin el objeto
try {
    console.log(saludarSuelto()); // this ya no es usuario → undefined o error
} catch (error) {
    console.log("Error:", error.message);
}
// Lo mismo pasa al pasar un método como callback:
// setTimeout(usuario.saludar, 0) → this se pierde

// --- bind: fijar el this ------------------------------------------------------------------
const saludarFijo = usuario.saludar.bind(usuario);
console.log(saludarFijo()); // ✅ "Hola, soy Daniel"
setTimeout(usuario.saludar.bind(usuario), 0);  // ✅
setTimeout(() => console.log("Con arrow:", usuario.saludar()), 0); // ✅ alternativa más común

// --- call y apply: ejecutar con un this específico ----------------------------------------
function presentar(saludo, puntuacion) {
    return `${saludo}, soy ${this.nombre}${puntuacion}`;
}
const ana = { nombre: "Ana" };
const luis = { nombre: "Luis" };

console.log(presentar.call(ana, "Hola", "!"));     // argumentos separados
console.log(presentar.apply(luis, ["Buenas", "."])); // argumentos en array

// bind también puede "pre-cargar" argumentos
const presentarAnaFormal = presentar.bind(ana, "Mucho gusto");
console.log(presentarAnaFormal("."));

// --- this en arrow vs función normal dentro de un método -------------------------------------
const temporizador = {
    segundos: 3,
    iniciarMal() {
        const self = this; // truco antiguo antes de las arrow
        [1, 2].forEach(function () {
            // aquí `this` NO es temporizador
            console.log("function normal → self.segundos:", self.segundos);
        });
    },
    iniciarBien() {
        [1, 2].forEach(() => {
            console.log("arrow → this.segundos:", this.segundos); // ✅ hereda el this del método
        });
    },
};
temporizador.iniciarMal();
temporizador.iniciarBien();

// --- this con new y clases -------------------------------------------------------------------
class Contador {
    constructor() {
        this.valor = 0;
        // En componentes de clase de React se hacía esto para no perder el this:
        this.incrementar = this.incrementar.bind(this);
    }
    incrementar() {
        this.valor++;
        return this.valor;
    }
}
const c = new Contador();
const incrementarSuelto = c.incrementar;
console.log("Clase + bind:", incrementarSuelto(), incrementarSuelto()); // 1 2 ✅

/*
 *  Resumen práctico:
 *   - Métodos de objeto → sintaxis método normal: metodo() { ... }
 *   - Callbacks dentro de métodos → arrow functions
 *   - ¿Pasas un método como callback? → envuélvelo: () => obj.metodo()
 */


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea `const perro = { nombre: "Firulais", ladrar() {...} }` que devuelva
 *     "<nombre> dice guau". Guarda `perro.ladrar` en una variable, llámala y
 *     observa el problema. Arréglalo con bind.
 *  2. Crea una función `describir(ciudad)` que use this.nombre y llámala con
 *     call para 2 objetos distintos.
 *  3. Dentro de un método, usa setTimeout con una arrow para imprimir una
 *     propiedad del objeto.
 */
