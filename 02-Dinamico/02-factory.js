/**
 * ============================================================
 *  02-02 · FACTORY FUNCTIONS (funciones fábrica)
 * ============================================================
 *  Una factory function es una función normal que CREA y DEVUELVE
 *  un objeto. Sirve para no repetir el mismo objeto literal una y otra vez.
 *
 *  - Nombre en camelCase, normalmente con verbo: crearUsuario, crearProducto.
 *  - No usa `new`.
 *  - Permite datos PRIVADOS gracias a los closures.
 *
 *  💡 Mentalidad React: un componente es una "fábrica" que recibe datos
 *     (props) y devuelve algo nuevo (UI).
 */

// --- El problema: repetir código --------------------------------
const usuario1 = {
    nombre: "Ana",
    email: "ana@correo.com",
    saludar() { return `Hola, soy ${this.nombre}`; },
};
const usuario2 = {
    nombre: "Luis",
    email: "luis@correo.com",
    saludar() { return `Hola, soy ${this.nombre}`; }, // copiado y pegado 😩
};
console.log(usuario1.saludar(), "|", usuario2.saludar());

// --- La solución: una fábrica -----------------------------------
function crearUsuario(nombre, email) {
    return {
        nombre,  // shorthand de nombre: nombre
        email,
        saludar() {
            return `Hola, soy ${this.nombre}`;
        },
    };
}

const ana = crearUsuario("Ana", "ana@correo.com");
const luis = crearUsuario("Luis", "luis@correo.com");
const daniel = crearUsuario("Daniel", "d@correo.com");
console.log(ana.saludar(), "|", luis.saludar(), "|", daniel.saludar());

// --- Fábrica con valores por defecto y datos calculados --------
function crearProducto({ nombre, precio, stock = 0 }) {
    return {
        nombre,
        precio,
        stock,
        disponible: stock > 0,            // propiedad calculada al crear
        precioConIva: precio * 1.13,
    };
}
console.log(crearProducto({ nombre: "Café", precio: 2500, stock: 10 }));
console.log(crearProducto({ nombre: "Té", precio: 1800 }));

// --- Datos privados con closures --------------------------------
// `saldo` NO es propiedad del objeto: solo los métodos pueden verlo.
function crearCuenta(titular) {
    let saldo = 0; // variable privada

    return {
        titular,
        depositar(monto) {
            if (monto <= 0) return "Monto inválido";
            saldo += monto;
            return `Depositado ₡${monto}`;
        },
        consultarSaldo() {
            return saldo;
        },
    };
}

const cuenta = crearCuenta("Daniel");
console.log(cuenta.depositar(5000));
console.log(cuenta.depositar(-100));
console.log("Saldo:", cuenta.consultarSaldo()); // 5000
console.log("Acceso directo:", cuenta.saldo);   // undefined → protegido ✅

// --- Cada objeto es independiente --------------------------------
const otraCuenta = crearCuenta("Ana");
otraCuenta.depositar(100);
console.log(cuenta.consultarSaldo(), otraCuenta.consultarSaldo()); // 5000 100

// --- Desventaja ---------------------------------------------------
// Cada objeto recibe su PROPIA copia de los métodos:
console.log(ana.saludar === luis.saludar); // false → más memoria con miles de objetos.
// Las constructor functions / clases lo resuelven con el prototipo (ver 03-consturctor.js).


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea `crearLibro(titulo, autor, paginas)` que devuelva un objeto con
 *     esas propiedades y un método `esLargo()` (true si paginas > 300).
 *  2. Crea `crearContador()` con una variable privada `valor` y los métodos
 *     incrementar(), decrementar() y obtener(). Crea 2 contadores y
 *     demuestra que no comparten el valor.
 */
