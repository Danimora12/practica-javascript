/**
 * ============================================================
 *  09-02 · HERENCIA Y PROTOTIPOS
 * ============================================================
 *  HERENCIA: una clase "hija" reutiliza y extiende a una clase "padre".
 *   class Hija extends Padre { constructor() { super(...) } }
 *   - super(...)          → llama al constructor del padre (obligatorio antes de usar this)
 *   - super.metodo()      → llama al método del padre
 *   - Sobrescribir        → definir un método con el mismo nombre
 *
 *  PROTOTIPOS: cada objeto tiene un enlace oculto a otro objeto (su prototipo).
 *  Si una propiedad no está en el objeto, JS la busca en el prototipo, luego en
 *  el prototipo del prototipo... (cadena de prototipos). Así funcionan
 *  las clases por debajo, y por eso [].map existe en todos los arrays.
 *
 *  💡 En React se prefiere COMPOSICIÓN (componentes dentro de componentes)
 *     sobre herencia. Aun así, entender esto te ayuda a leer JS.
 */

// --- Clase padre ----------------------------------------------------------------------------------------------------------
class Empleado {
    constructor(nombre, salarioBase) {
        this.nombre = nombre;
        this.salarioBase = salarioBase;
    }

    calcularSalario() {
        return this.salarioBase;
    }

    presentarse() {
        return `Soy ${this.nombre}, gano ₡${this.calcularSalario().toLocaleString("es-CR")}`;
    }
}

// --- Clases hijas --------------------------------------------------------------------------------------------------------------
class Desarrollador extends Empleado {
    constructor(nombre, salarioBase, lenguajes = []) {
        super(nombre, salarioBase); // ⚠️ antes de usar this
        this.lenguajes = lenguajes;
    }

    // Método nuevo
    programar() {
        return `${this.nombre} programa en ${this.lenguajes.join(", ")}`;
    }

    // Sobrescribir un método del padre
    presentarse() {
        return `${super.presentarse()} y sé ${this.lenguajes.length} lenguajes`;
    }
}

class Gerente extends Empleado {
    constructor(nombre, salarioBase, bono) {
        super(nombre, salarioBase);
        this.bono = bono;
    }

    calcularSalario() {
        return super.calcularSalario() + this.bono; // reutiliza la lógica del padre
    }
}

const dev = new Desarrollador("Daniel", 900000, ["JavaScript", "SQL"]);
const jefa = new Gerente("Laura", 1200000, 300000);

console.log(dev.presentarse());
console.log(dev.programar());
console.log(jefa.presentarse()); // usa calcularSalario de Gerente automáticamente

// --- Polimorfismo: mismo método, distinto comportamiento --------------------------------------------------------------------------
const planilla = [dev, jefa, new Empleado("Carlos", 600000)];
const totalPlanilla = planilla.reduce((acc, e) => acc + e.calcularSalario(), 0);
console.log("Total planilla: ₡" + totalPlanilla.toLocaleString("es-CR"));

// --- instanceof con herencia -------------------------------------------------------------------------------------------------------
console.log(dev instanceof Desarrollador, dev instanceof Empleado, dev instanceof Gerente); // true true false

// ==========================================================================================
//  PROTOTIPOS: lo que pasa por debajo
// ==========================================================================================
console.log(Object.getPrototypeOf(dev) === Desarrollador.prototype);            // true
console.log(Object.getPrototypeOf(Desarrollador.prototype) === Empleado.prototype); // true

// Cadena: dev → Desarrollador.prototype → Empleado.prototype → Object.prototype → null
console.log(Object.hasOwn(dev, "nombre"));      // true  → está en el objeto
console.log(Object.hasOwn(dev, "presentarse")); // false → viene del prototipo
console.log("presentarse" in dev);              // true  → `in` busca en toda la cadena

// Los tipos nativos funcionan igual
const numeros = [1, 2, 3];
console.log(Object.getPrototypeOf(numeros) === Array.prototype); // true
console.log(Object.hasOwn(numeros, "map"));                      // false → map vive en Array.prototype

// Crear objetos con un prototipo específico (sin clases)
const animalBase = {
    hablar() {
        return `${this.nombre} hace ${this.sonido}`;
    },
};
const gato = Object.create(animalBase);
gato.nombre = "Michi";
gato.sonido = "miau";
console.log(gato.hablar());

// ⚠️ Nunca modifiques prototipos nativos (Array.prototype.miMetodo = ...) en proyectos reales.

// ==========================================================================================
//  COMPOSICIÓN: la alternativa preferida en React
// ==========================================================================================
// En vez de "un Pato ES un Volador y un Nadador", combinamos capacidades:
const puedeVolar = (obj) => ({ ...obj, volar: () => `${obj.nombre} vuela` });
const puedeNadar = (obj) => ({ ...obj, nadar: () => `${obj.nombre} nada` });

const pato = puedeNadar(puedeVolar({ nombre: "Donald" }));
console.log(pato.volar(), "|", pato.nadar());
// En React: <Layout><Sidebar /><Contenido /></Layout> → componer piezas pequeñas.


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Crea `Vehiculo` (marca, modelo, describir()) y `Moto extends Vehiculo`
 *     con la propiedad `cilindrada`. Sobrescribe describir() usando super.
 *  2. Crea `Figura` con area() que devuelva 0, y las hijas `Circulo` y
 *     `Rectangulo` que la sobrescriban. Calcula la suma de áreas de un array
 *     de figuras mixtas.
 *  3. Verifica con Object.hasOwn qué propiedades son propias y cuáles heredadas.
 */
