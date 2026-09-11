/**
 * ============================================================
 *  06-02 · ARROW FUNCTIONS (funciones flecha)  ⭐ React las usa en todo
 * ============================================================
 *  Sintaxis corta de ES6:  (parámetros) => { cuerpo }
 *
 *  - Un parámetro: los paréntesis son opcionales   x => x * 2
 *  - Sin parámetros: paréntesis obligatorios        () => "hola"
 *  - Una sola expresión: RETURN IMPLÍCITO (sin llaves ni return)
 *  - Con llaves { }: necesitas return explícito
 *  - NO tienen su propio `this` ni `arguments` (06-funciones/06)
 */

// --- De función tradicional a arrow, paso a paso -----------------------------
const sumar1 = function (a, b) {
    return a + b;
};
const sumar2 = (a, b) => {
    return a + b;
};
const sumar3 = (a, b) => a + b;   // return implícito ✅
console.log(sumar1(2, 3), sumar2(2, 3), sumar3(2, 3));

// --- Variantes de parámetros -----------------------------------------------------
const saludar = () => "Hola!";
const doble = n => n * 2;            // Prettier suele poner paréntesis: (n) => n * 2
const presentar = (nombre, edad) => `${nombre} tiene ${edad} años`;
console.log(saludar(), doble(8), presentar("Daniel", 30));

// --- Cuerpo con varias líneas: llaves + return -----------------------------------
const calcularTotal = (precio, cantidad) => {
    const subtotal = precio * cantidad;
    const iva = subtotal * 0.13;
    return subtotal + iva;
};
console.log(calcularTotal(1000, 2));

// ⚠️ Error común: poner llaves y olvidar el return
const olvidoReturn = (x) => { x * 2 };
console.log(olvidoReturn(5)); // undefined

// --- Devolver un OBJETO con return implícito: envolver en paréntesis ----------
const crearUsuarioMal = (nombre) => { nombre: nombre };    // ❌ las { } se leen como bloque
const crearUsuario = (nombre) => ({ nombre, activo: true }); // ✅
console.log(crearUsuarioMal("Ana"), crearUsuario("Ana"));

// --- Arrow como callback: aquí brillan -----------------------------------------
const numeros = [1, 2, 3, 4, 5];

// Tradicional
const cuadrados1 = numeros.map(function (n) {
    return n * n;
});
// Arrow ✅
const cuadrados2 = numeros.map((n) => n * n);
console.log(cuadrados1, cuadrados2);

const pares = numeros.filter((n) => n % 2 === 0);
console.log("Pares:", pares);

setTimeout(() => console.log("Arrow en setTimeout"), 0);

// --- No tienen `arguments` (usa rest) ------------------------------------------
const sumarTodo = (...valores) => valores.reduce((acc, v) => acc + v, 0);
console.log(sumarTodo(1, 2, 3, 4));

// --- `this` en arrow: toma el del lugar donde se ESCRIBIÓ ----------------------
const persona = {
    nombre: "Daniel",
    saludarNormal() {
        return `Normal: ${this.nombre}`;        // this = persona ✅
    },
    saludarArrow: () => {
        return `Arrow: ${this?.nombre}`; // this NO es persona ⚠️ (es el this de afuera del objeto)
    },
    saludarConRetraso() {
        setTimeout(() => {
            console.log(`Retrasado: ${this.nombre}`); // ✅ arrow hereda this del método
        }, 0);
    },
};
console.log(persona.saludarNormal());
console.log(persona.saludarArrow());   // "Arrow: undefined" → no uses arrow como método de objeto
persona.saludarConRetraso();

// --- Cómo se ven en React (solo lectura, no se ejecuta) ----------------------
/*
 *  const Saludo = ({ nombre }) => <h1>Hola {nombre}</h1>;
 *
 *  <button onClick={() => setContador(contador + 1)}>+1</button>
 *
 *  useEffect(() => {
 *      fetch(url).then((res) => res.json()).then((data) => setDatos(data));
 *  }, []);
 *
 *  {tareas.map((tarea) => <li key={tarea.id}>{tarea.texto}</li>)}
 */


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Convierte a arrow con return implícito:
 *       function esMayor(edad) { return edad >= 18; }
 *  2. Crea `crearProducto(nombre, precio)` como arrow que devuelva un objeto
 *     con return implícito.
 *  3. Dado `const precios = [1000, 2500, 800]`, usa map con arrow para
 *     obtener los precios con 13% de IVA.
 *  4. ¿Por qué `saludarArrow` imprime undefined? Explícalo en un comentario.
 */
