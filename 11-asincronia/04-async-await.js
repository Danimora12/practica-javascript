/**
 * ============================================================
 *  11-04 · ASYNC / AWAIT  ⭐ la forma moderna
 * ============================================================
 *  Azúcar sintáctico sobre las promesas: código asíncrono que se LEE
 *  como si fuera síncrono.
 *
 *  async function f() {}  → siempre devuelve una promesa
 *  await promesa          → pausa la función async hasta que la promesa termine
 *                           y devuelve su valor (o lanza su error)
 *  try / catch            → para manejar errores (en vez de .catch)
 *
 *  ⚠️ await solo funciona dentro de funciones async (o en el nivel superior
 *     de un módulo ES).
 */

// --- Utilidades simuladas (mismas de 03-promesas.js) ---------------------------------------------------
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const USUARIOS = [{ id: 1, nombre: "Daniel" }, { id: 2, nombre: "Ana" }];
const PEDIDOS = [{ id: 101, usuarioId: 1, productoId: 5 }, { id: 102, usuarioId: 2, productoId: 7 }];
const PRODUCTOS = [{ id: 5, nombre: "Laptop", precio: 450000 }, { id: 7, nombre: "Mouse", precio: 12000 }];

async function obtenerUsuario(id) {
    await esperar(300);
    const usuario = USUARIOS.find((u) => u.id === id);
    if (!usuario) throw new Error(`Usuario ${id} no existe`); // throw en async = reject
    return usuario;                                            // return en async = resolve
}
async function obtenerPedido(usuarioId) {
    await esperar(300);
    const pedido = PEDIDOS.find((p) => p.usuarioId === usuarioId);
    if (!pedido) throw new Error("Sin pedidos");
    return pedido;
}
async function obtenerProducto(id) {
    await esperar(300);
    const producto = PRODUCTOS.find((p) => p.id === id);
    if (!producto) throw new Error("Producto no encontrado");
    return producto;
}

// --- async siempre devuelve una promesa ----------------------------------------------------------------------
async function saludar() {
    return "Hola";
}
console.log(saludar());                  // Promise { 'Hola' }
saludar().then((v) => console.log(v));   // "Hola"

// --- El mismo flujo de los archivos anteriores, ahora con async/await ------------------------------------------
async function mostrarCompra(usuarioId) {
    try {
        const usuario = await obtenerUsuario(usuarioId);
        const pedido = await obtenerPedido(usuario.id);
        const producto = await obtenerProducto(pedido.productoId);
        console.log(`async/await → ${usuario.nombre} compró ${producto.nombre}`);
    } catch (error) {
        console.log("❌", error.message);
    } finally {
        console.log(`(fin de la consulta del usuario ${usuarioId})`);
    }
}

// Ejecutamos los ejemplos en orden con una función principal
async function main() {
    await mostrarCompra(1);
    await mostrarCompra(99);

    // --- Secuencial vs paralelo --------------------------------------------------------------------------------
    console.time("secuencial");
    const u1 = await obtenerUsuario(1);   // espera 300 ms
    const u2 = await obtenerUsuario(2);   // espera otros 300 ms
    console.timeEnd("secuencial");        // ~600 ms
    console.log(u1.nombre, u2.nombre);

    console.time("paralelo");
    const [p1, p2] = await Promise.all([obtenerUsuario(1), obtenerUsuario(2)]); // ambas a la vez
    console.timeEnd("paralelo");          // ~300 ms ✅
    console.log(p1.nombre, p2.nombre);
    // 💡 Si las tareas NO dependen entre sí, usa Promise.all.

    // --- await en bucles ------------------------------------------------------------------------------------------
    for (const id of [1, 2]) {
        const usuario = await obtenerUsuario(id); // uno por uno (en orden)
        console.log("for...of + await →", usuario.nombre);
    }
    // ⚠️ forEach NO espera a los await: usa for...of o Promise.all con map
    const nombres = await Promise.all([1, 2].map(async (id) => (await obtenerUsuario(id)).nombre));
    console.log("map + Promise.all →", nombres);

    // --- Patrón completo de carga de datos (lo que harás en React) -----------------------------------------------------
    const estado = { cargando: true, error: null, datos: null };
    console.log("Estado inicial:", estado);
    try {
        estado.datos = await obtenerUsuario(2);
    } catch (error) {
        estado.error = error.message;
    } finally {
        estado.cargando = false;
    }
    console.log("Estado final:", estado);
}

main();

/*
 *  En React se ve así:
 *
 *  function PerfilUsuario({ id }) {
 *      const [usuario, setUsuario] = useState(null);
 *      const [cargando, setCargando] = useState(true);
 *      const [error, setError] = useState(null);
 *
 *      useEffect(() => {
 *          const cargar = async () => {          // useEffect no puede ser async directamente
 *              try {
 *                  const datos = await obtenerUsuario(id);
 *                  setUsuario(datos);
 *              } catch (err) {
 *                  setError(err.message);
 *              } finally {
 *                  setCargando(false);
 *              }
 *          };
 *          cargar();
 *      }, [id]);
 *
 *      if (cargando) return <p>Cargando...</p>;
 *      if (error) return <p>Error: {error}</p>;
 *      return <h1>{usuario.nombre}</h1>;
 *  }
 */


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Reescribe con async/await:
 *       obtenerUsuario(2).then((u) => obtenerPedido(u.id)).then((p) => console.log(p));
 *  2. Crea `async function cuentaRegresiva(n)` que imprima de n a 1 con
 *     1 segundo entre números usando `await esperar(1000)`.
 *  3. Crea `async function obtenerVarios(ids)` que devuelva los nombres de
 *     todos los usuarios EN PARALELO; si alguno falla, devuelve [] e imprime el error.
 */
