/**
 * ============================================================
 *  08-01 · DESTRUCTURING (desestructuración)  ⭐⭐⭐ React lo usa en todo
 * ============================================================
 *  Sintaxis para "sacar" valores de objetos o arrays en variables.
 *
 *  Objetos → por NOMBRE de propiedad:   const { nombre, edad } = persona;
 *  Arrays  → por POSICIÓN:              const [primero, segundo] = lista;
 *
 *  En React:
 *    function Tarjeta({ titulo, descripcion }) { ... }   ← props
 *    const [contador, setContador] = useState(0);          ← hooks
 */

// ==========================================================================================
//  OBJETOS
// ==========================================================================================
const usuario = {
    id: 7,
    nombre: "Daniel",
    email: "d@correo.com",
    rol: "admin",
    direccion: { provincia: "Cartago", pais: "Costa Rica" },
};

// --- Antes ------------------------------------------------------------------------------------------
const nombreViejo = usuario.nombre;
const emailViejo = usuario.email;

// --- Con destructuring ---------------------------------------------------------------------------------
const { nombre, email } = usuario;
console.log(nombre, email, nombreViejo === nombre, emailViejo === email);

// --- Renombrar ---------------------------------------------------------------------------------------------
const { rol: tipoUsuario } = usuario;  // lee `rol` y lo guarda en `tipoUsuario`
console.log(tipoUsuario);

// --- Valor por defecto -----------------------------------------------------------------------------------------
const { telefono = "Sin teléfono", activo = true } = usuario;
console.log(telefono, activo);

// --- Renombrar + defecto --------------------------------------------------------------------------------------------
const { avatar: foto = "default.png" } = usuario;
console.log(foto);

// --- Anidado ---------------------------------------------------------------------------------------------------------
const { direccion: { provincia, pais } } = usuario;
console.log(provincia, pais);
// ⚠️ `direccion` NO queda como variable aquí, solo provincia y pais.

// --- Rest: el resto de propiedades -------------------------------------------------------------------------------------
const { id, ...datosPublicos } = usuario;
console.log(id, datosPublicos); // útil para quitar propiedades sin mutar

// ==========================================================================================
//  ARRAYS
// ==========================================================================================
const colores = ["rojo", "verde", "azul", "amarillo"];

const [primero, segundo] = colores;
console.log(primero, segundo); // rojo verde

const [, , tercero] = colores;  // saltar posiciones con comas
console.log(tercero);           // azul

const [principal, ...otros] = colores;
console.log(principal, otros);  // rojo ["verde","azul","amarillo"]

const [a = 1, b = 2] = [10];    // defaults
console.log(a, b);              // 10 2

// --- Intercambiar variables (truco) --------------------------------------------------------------------------------------
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1

// --- Así funciona useState ------------------------------------------------------------------------------------------------
function useStateFalso(inicial) {
    let valor = inicial;
    const setValor = (nuevo) => { valor = nuevo; };
    return [valor, setValor]; // devuelve un array de 2 elementos
}
const [contador, setContador] = useStateFalso(0); // ← destructuring de array
console.log(contador, typeof setContador);
// Se usa array (y no objeto) para que TÚ elijas los nombres:
const [tema, setTema] = useStateFalso("claro");
console.log(tema, typeof setTema);

// ==========================================================================================
//  EN PARÁMETROS DE FUNCIONES ⭐
// ==========================================================================================
// Sin destructuring
function mostrarTarjeta1(props) {
    return `${props.titulo}: ${props.descripcion}`;
}
// Con destructuring (así se escriben los componentes)
function mostrarTarjeta2({ titulo, descripcion = "—", destacada = false }) {
    return `${destacada ? "⭐ " : ""}${titulo}: ${descripcion}`;
}
console.log(mostrarTarjeta1({ titulo: "JS", descripcion: "Lenguaje" }));
console.log(mostrarTarjeta2({ titulo: "React", destacada: true }));

// En callbacks de arrays
const productos = [
    { nombre: "Café", precio: 6500 },
    { nombre: "Pan", precio: 1500 },
];
console.log(productos.map(({ nombre, precio }) => `${nombre}: ₡${precio}`));

// Con Object.entries
const inventario = { cafe: 20, pan: 0 };
for (const [producto, stock] of Object.entries(inventario)) {
    console.log(`${producto} → ${stock}`);
}

// Respuestas de API
const respuesta = { data: { items: [{ id: 1 }, { id: 2 }], total: 2 }, status: 200 };
const { data: { items, total }, status } = respuesta;
console.log(status, total, items);

// ⚠️ Destructurar undefined da error:
// const { algo } = undefined; // TypeError
const { algo } = respuesta.noExiste ?? {}; // ✅ protección
console.log(algo);


/* ============================================================
 *  EJERCICIOS  (soluciones en soluciones/08-es6-moderno.js)
 * ============================================================
 *  1. Dado `const pelicula = { titulo: "Coco", anio: 2017, director: { nombre: "Lee Unkrich" } }`,
 *     extrae titulo, anio (renombrado a `estreno`) y el nombre del director.
 *  2. Dado `const puntajes = [98, 87, 75, 60]`, extrae el primero, el segundo
 *     y el resto en un array.
 *  3. Escribe `function Perfil({ nombre, ciudad = "Desconocida", ...extra })`
 *     que devuelva un string con nombre, ciudad y cuántas propiedades extra hay.
 *  4. Simula: `const [nombre, setNombre] = useStateFalso("Ana")` e imprime ambos.
 */
