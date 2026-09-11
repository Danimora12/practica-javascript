/**
 * ============================================================
 *  08-03 · OBJETOS MODERNOS: SHORTHAND, PROPIEDADES COMPUTADAS,
 *          ENCADENAMIENTO OPCIONAL Y MÁS
 * ============================================================
 *  { nombre }            → shorthand (nombre: nombre)
 *  { saludar() {} }      → método corto
 *  { [variable]: valor } → propiedad COMPUTADA (nombre dinámico)
 *
 *  ⭐ La propiedad computada es la base de los formularios en React:
 *     setForm({ ...form, [e.target.name]: e.target.value })
 */

// --- Shorthand de propiedades ---------------------------------------------------------------------------
const nombre = "Daniel";
const edad = 30;
const ciudad = "Cartago";

const antes = { nombre: nombre, edad: edad, ciudad: ciudad };
const ahora = { nombre, edad, ciudad };
console.log(antes, ahora);

// Combinado con propiedades normales
const perfil = { nombre, edad, profesion: "Developer" };
console.log(perfil);

// --- Métodos cortos ----------------------------------------------------------------------------------------
const calculadora = {
    // antes: sumar: function (a, b) { return a + b; }
    sumar(a, b) {
        return a + b;
    },
    restar: (a, b) => a - b, // arrow como propiedad (no usa this)
};
console.log(calculadora.sumar(2, 3), calculadora.restar(5, 1));

// --- Propiedades computadas ----------------------------------------------------------------------------------
const campo = "email";
const usuario = {
    [campo]: "d@correo.com",       // la llave es el VALOR de `campo`
    [`${campo}Verificado`]: false, // se puede construir con template literals
};
console.log(usuario); // { email: "d@correo.com", emailVerificado: false }

// --- Simulación de un formulario React -------------------------------------------------------------------------
let formulario = { nombre: "", email: "", mensaje: "" };

function manejarCambio(evento) {
    const { name, value } = evento.target;          // destructuring
    formulario = { ...formulario, [name]: value };  // spread + propiedad computada
}

// Simulamos que el usuario escribe en 3 inputs distintos con UNA sola función
manejarCambio({ target: { name: "nombre", value: "Daniel" } });
manejarCambio({ target: { name: "email", value: "d@correo.com" } });
manejarCambio({ target: { name: "mensaje", value: "Hola!" } });
console.log(formulario);
// En JSX:
//   <input name="email" value={form.email} onChange={manejarCambio} />

// --- Crear objetos dinámicamente desde arrays -------------------------------------------------------------------
const idiomas = ["es", "en", "nl"];
const traducciones = idiomas.reduce((acc, codigo) => ({ ...acc, [codigo]: `saludo_${codigo}` }), {});
console.log(traducciones);

// --- Object.entries / fromEntries: transformar objetos ------------------------------------------------------------
const precios = { cafe: 6500, pan: 1500, te: 1200 };
const preciosConDescuento = Object.fromEntries(
    Object.entries(precios).map(([producto, precio]) => [producto, precio * 0.9])
);
console.log(preciosConDescuento);

// --- Optional chaining + nullish (repaso rápido) -------------------------------------------------------------------
const respuesta = { usuario: { preferencias: null } };
const tema = respuesta.usuario?.preferencias?.tema ?? "claro";
console.log(tema);

// --- Getters en objetos literales -----------------------------------------------------------------------------------
const carrito = {
    items: [{ precio: 1000 }, { precio: 2500 }],
    get total() {                        // se usa como propiedad, sin ()
        return this.items.reduce((acc, i) => acc + i.precio, 0);
    },
};
console.log(carrito.total); // 3500

// --- Métodos de objeto útiles ---------------------------------------------------------------------------------------------
console.log(Object.keys(perfil), Object.values(perfil));
console.log(Object.entries(perfil).length);
console.log(structuredClone(perfil)); // copia profunda


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Con las variables `titulo = "Nota"`, `contenido = "..."` y `fecha = new Date()`,
 *     crea un objeto usando shorthand.
 *  2. Escribe `actualizarCampo(objeto, campo, valor)` que devuelva un objeto
 *     nuevo con ese campo actualizado (spread + propiedad computada).
 *  3. Dado `const claves = ["rojo", "verde"]`, crea { rojo: 0, verde: 0 } con reduce.
 *  4. Agrega un getter `nombreCompleto` a un objeto { nombre, apellido }.
 */
