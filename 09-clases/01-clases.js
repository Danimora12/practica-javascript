/**
 * ============================================================
 *  09-01 · CLASES
 * ============================================================
 *  `class` (ES6) es una sintaxis más clara para crear "moldes" de objetos.
 *  Por debajo usa las mismas constructor functions + prototipos
 *  de 02-Dinamico/03-consturctor.js.
 *
 *  - constructor() → se ejecuta al hacer `new`
 *  - métodos       → se guardan en el prototipo (compartidos)
 *  - get / set     → propiedades calculadas / validadas
 *  - static        → pertenecen a la clase, no a las instancias
 *  - #privado      → campos privados reales
 *
 *  💡 React moderno usa FUNCIONES, no clases. Aun así las verás en:
 *     código antiguo (class components), librerías, errores personalizados,
 *     y en la programación orientada a objetos en general.
 */

// --- Clase básica ----------------------------------------------------------------------------------------------
class Producto {
    constructor(nombre, precio, stock = 0) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    estaDisponible() {
        return this.stock > 0;
    }

    vender(cantidad) {
        if (cantidad > this.stock) {
            throw new Error(`Stock insuficiente de ${this.nombre}`);
        }
        this.stock -= cantidad;
        return this; // devolver this permite encadenar métodos
    }

    describir() {
        return `${this.nombre} - ₡${this.precio} (${this.stock} en stock)`;
    }
}

const cafe = new Producto("Café", 6500, 10);
const pan = new Producto("Pan", 1500);
console.log(cafe.describir());
console.log(pan.estaDisponible());       // false
cafe.vender(2).vender(3);                // encadenado
console.log(cafe.describir());           // 5 en stock
console.log(cafe instanceof Producto);   // true
console.log(typeof Producto);            // "function" → una clase ES una función

// ⚠️ Sin new da error claro (a diferencia de las constructor functions):
try {
    Producto("x", 1);
} catch (error) {
    console.log("Error:", error.message);
}

// --- Campos de clase, privados, getters y setters ------------------------------------------------------------
class CuentaBancaria {
    moneda = "₡";        // campo público con valor inicial
    #saldo = 0;          // campo PRIVADO: solo accesible dentro de la clase
    static cuentasCreadas = 0;

    constructor(titular) {
        this.titular = titular;
        CuentaBancaria.cuentasCreadas++;
    }

    get saldo() {                   // getter: se lee como propiedad → cuenta.saldo
        return `${this.moneda}${this.#saldo.toLocaleString("es-CR")}`;
    }

    set limiteDiario(valor) {       // setter: se asigna como propiedad → cuenta.limiteDiario = 5
        if (valor < 0) throw new Error("El límite no puede ser negativo");
        this._limite = valor;
    }

    depositar(monto) {
        if (monto <= 0) throw new Error("Monto inválido");
        this.#saldo += monto;
        this.#registrar("depósito", monto);
    }

    #registrar(tipo, monto) {       // método privado
        console.log(`[${this.titular}] ${tipo}: ${monto}`);
    }

    static compararTitulares(a, b) { // método estático: se llama desde la clase
        return a.titular.localeCompare(b.titular);
    }
}

const cuenta = new CuentaBancaria("Daniel");
cuenta.depositar(150000);
console.log(cuenta.saldo);           // "₡150 000"
// cuenta.#saldo;                    // ❌ SyntaxError: campo privado
cuenta.saldo = "hack";               // `saldo` solo tiene getter: la asignación se ignora
console.log(cuenta.saldo);           // sigue siendo "₡150 000" (en modo estricto daría TypeError)
cuenta.limiteDiario = 50000;
console.log(cuenta._limite);

const otra = new CuentaBancaria("Ana");
console.log("Cuentas creadas:", CuentaBancaria.cuentasCreadas);
console.log([cuenta, otra].sort(CuentaBancaria.compararTitulares).map((c) => c.titular));

// --- Métodos compartidos en el prototipo ---------------------------------------------------------------------
console.log(cafe.describir === pan.describir); // true

// --- this y métodos como callback (ver 06-funciones/06) ----------------------------------------------------------
const describirSuelto = cafe.describir;
try {
    describirSuelto();
} catch (error) {
    console.log("Perdí el this:", error.message); // en clases el código es estricto → error
}
console.log([cafe, pan].map((p) => p.describir())); // ✅ con arrow

// --- Class component de React (solo para reconocerlo) --------------------------------------------------------------
/*
 *  class Contador extends React.Component {
 *      state = { cuenta: 0 };
 *      incrementar = () => this.setState({ cuenta: this.state.cuenta + 1 });
 *      render() {
 *          return <button onClick={this.incrementar}>{this.state.cuenta}</button>;
 *      }
 *  }
 *
 *  // Hoy se escribe así:
 *  function Contador() {
 *      const [cuenta, setCuenta] = useState(0);
 *      return <button onClick={() => setCuenta(cuenta + 1)}>{cuenta}</button>;
 *  }
 */


/* ============================================================
 *  EJERCICIOS  (soluciones en soluciones/09-clases.js)
 * ============================================================
 *  1. Crea la clase `Tarea` con texto, completada (false por defecto) y los
 *     métodos completar() y toString().
 *  2. Crea `Temporizador` con un campo privado #segundos, un método tick()
 *     que sume 1 y un getter `tiempo` que devuelva "mm:ss".
 *  3. Agrega a `Tarea` un método estático `desdeTexto(texto)` que devuelva
 *     una nueva Tarea.
 */
