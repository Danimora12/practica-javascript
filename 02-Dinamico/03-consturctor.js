/**
 * ============================================================
 *  02-03 · CONSTRUCTOR FUNCTIONS (funciones constructoras)
 * ============================================================
 *  Otra forma de crear muchos objetos del mismo "molde".
 *  - Nombre en PascalCase: Usuario, Producto.
 *  - Se llaman con `new`.
 *  - Usan `this` en vez de devolver un objeto literal.
 *
 *  ¿Qué hace `new`?
 *   1. Crea un objeto vacío {}.
 *   2. Conecta ese objeto al prototipo de la función.
 *   3. Ejecuta la función con `this` apuntando a ese objeto.
 *   4. Devuelve el objeto automáticamente (no hace falta return).
 *
 *  Hoy se prefiere la sintaxis `class` (09-clases), que hace exactamente
 *  esto por debajo. Conviene entender esto para leer código existente.
 */

// --- Constructor básico ------------------------------------------
function Usuario(nombre, email) {
    this.nombre = nombre;
    this.email = email;
    this.activo = true;
}

const ana = new Usuario("Ana", "ana@correo.com");
const luis = new Usuario("Luis", "luis@correo.com");
console.log(ana);
console.log(luis.nombre, luis.activo);

// --- instanceof: ¿de qué molde salió? ---------------------------
console.log(ana instanceof Usuario); // true
console.log(ana.constructor.name);   // "Usuario"

// --- Métodos compartidos en el PROTOTIPO ------------------------
// Si pones el método dentro del constructor, cada objeto tendría su copia.
// En el prototipo existe UNA sola copia compartida por todas las instancias.
Usuario.prototype.saludar = function () {
    return `Hola, soy ${this.nombre}`;
};
Usuario.prototype.desactivar = function () {
    this.activo = false;
};

console.log(ana.saludar(), "|", luis.saludar());
console.log(ana.saludar === luis.saludar); // true ✅ misma función (a diferencia de la factory)

luis.desactivar();
console.log("Luis activo:", luis.activo, "| Ana activa:", ana.activo);

// --- ⚠️ Olvidar `new` --------------------------------------------
// const error = Usuario("X", "x@x.com");
//   → Sin new, `this` apunta al objeto global (window) y crea variables globales
//     "nombre", "email"... por accidente. `error` queda undefined (no hay return).
//     En modo estricto lanza TypeError. Las clases lo evitan: sin new dan error claro.

// --- Constructores que ya conoces -------------------------------
const fecha = new Date();
const lista = new Array(3).fill("x");
const mapa = new Map([["clave", "valor"]]);
console.log(fecha.getFullYear(), lista, mapa.get("clave"));

// --- Factory vs Constructor --------------------------------------
function crearPunto(x, y) {            // factory
    return { x, y };
}
function Punto(x, y) {                 // constructor
    this.x = x;
    this.y = y;
}
console.log(crearPunto(1, 2), new Punto(1, 2));

// --- Lo mismo con class (adelanto de 09-clases) ------------------
class UsuarioModerno {
    constructor(nombre) {
        this.nombre = nombre;
    }
    saludar() {                        // se guarda en el prototipo automáticamente
        return `Hola, soy ${this.nombre}`;
    }
}
console.log(new UsuarioModerno("Daniel").saludar());

/*
 *  Resumen
 *  | Factory                    | Constructor / class          |
 *  |----------------------------|------------------------------|
 *  | crearUsuario()             | new Usuario()                |
 *  | camelCase                  | PascalCase                   |
 *  | devuelve un objeto literal | usa this                     |
 *  | privacidad fácil (closure) | privacidad con #campo (class)|
 *  | métodos duplicados         | métodos compartidos          |
 */


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea el constructor `Producto(nombre, precio)` y agrega al prototipo
 *     un método `aplicarDescuento(porcentaje)` que actualice el precio.
 *  2. Crea 2 productos, aplica 10% de descuento a uno e imprime ambos.
 *  3. Verifica con instanceof que ambos son Producto.
 */
