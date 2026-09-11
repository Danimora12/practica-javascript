/**
 * ============================================================
 *  12-03 · CREAR, INSERTAR Y ELIMINAR ELEMENTOS
 * ============================================================
 *  ⚠️ SOLO NAVEGADOR: ábrelo desde index.html.
 *
 *  document.createElement("etiqueta") → crea un elemento (aún no visible)
 *  padre.append(hijo)                  → lo inserta al final
 *  padre.prepend(hijo)                 → al inicio
 *  elemento.remove()                   → lo elimina
 *  padre.replaceChildren(...hijos)     → reemplaza todo el contenido
 *
 *  ⭐ Aquí verás el patrón "datos → render()": es EXACTAMENTE la idea de
 *     React, pero hecha a mano.
 */

const app = document.querySelector("#app");
app.innerHTML = ""; // limpiamos

// --- Crear un elemento paso a paso -----------------------------------------------------------------------------------
const titulo = document.createElement("h2");
titulo.textContent = "Catálogo de productos";
titulo.style.marginBottom = "8px";
app.append(titulo);

const descripcion = document.createElement("p");
descripcion.textContent = "Generado 100% con JavaScript";
descripcion.classList.add("descripcion");
titulo.after(descripcion); // insertar justo después de otro elemento

// --- Crear una lista desde un array (los datos mandan) ----------------------------------------------------------------------
const productos = [
    { id: 1, nombre: "Café Tarrazú", precio: 6500, stock: 20 },
    { id: 2, nombre: "Pan casero", precio: 1500, stock: 0 },
    { id: 3, nombre: "Queso Turrialba", precio: 4200, stock: 8 },
];

const lista = document.createElement("ul");
lista.style.listStyle = "none";
lista.style.padding = "0";
app.append(lista);

function crearTarjeta(producto) {
    const li = document.createElement("li");
    li.dataset.id = producto.id;
    li.style.cssText = "display:flex; justify-content:space-between; gap:12px; padding:8px; border:1px solid #ddd; border-radius:8px; margin:6px 0";

    const nombre = document.createElement("span");
    nombre.textContent = `${producto.nombre} — ₡${producto.precio.toLocaleString("es-CR")}`;
    if (producto.stock === 0) {
        nombre.style.textDecoration = "line-through";
        nombre.style.opacity = "0.6";
    }

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
        eliminarProducto(producto.id);
    });

    li.append(nombre, botonEliminar); // append acepta varios
    return li;
}

// --- render: dibuja la interfaz a partir de los datos ------------------------------------------------------------------------------
function render() {
    const tarjetas = productos.map(crearTarjeta);   // datos → elementos (como .map en JSX)
    lista.replaceChildren(...tarjetas);              // reemplaza lo anterior
    contador.textContent = `${productos.length} productos`;
}

function eliminarProducto(id) {
    const indice = productos.findIndex((p) => p.id === id);
    if (indice !== -1) productos.splice(indice, 1); // 1. cambiamos los datos
    render();                                        // 2. volvemos a dibujar
}

function agregarProducto(nombre, precio) {
    productos.push({ id: Date.now(), nombre, precio, stock: 1 });
    render();
}

// --- Formulario para agregar ------------------------------------------------------------------------------------------------------------
const form = document.createElement("form");
form.style.cssText = "display:flex; gap:6px; flex-wrap:wrap";
form.innerHTML = `
  <input name="nombre" placeholder="Producto" required />
  <input name="precio" type="number" placeholder="Precio" required min="1" />
  <button>Agregar</button>
`;
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const datos = new FormData(form);
    agregarProducto(datos.get("nombre"), Number(datos.get("precio")));
    form.reset();
});
lista.before(form);

const contador = document.createElement("small");
app.append(contador);

render(); // primer dibujo

// --- Otras formas de insertar ----------------------------------------------------------------------------------------------------------------
const aviso = document.createElement("p");
aviso.textContent = "📢 Aviso insertado al inicio con prepend";
aviso.style.background = "#fef9c3";
aviso.style.padding = "6px";
app.prepend(aviso);
setTimeout(() => aviso.remove(), 4000); // se elimina a los 4 segundos

// insertAdjacentHTML: insertar HTML en una posición
descripcion.insertAdjacentHTML("afterend", "<p><em>insertAdjacentHTML → afterend</em></p>");

// Clonar un elemento
const copiaTitulo = titulo.cloneNode(true);
copiaTitulo.textContent += " (copia)";
copiaTitulo.style.fontSize = "14px";
app.append(copiaTitulo);

/*
 *  VANILLA JS vs REACT
 *
 *  Aquí (a mano):                          En React:
 *   - createElement + append               - JSX: <li>{producto.nombre}</li>
 *   - llamar render() después de cada       - setProductos(...) y React
 *     cambio, y reemplazar TODO                 actualiza solo lo que cambió
 *   - addEventListener                      - onClick={...}
 *
 *   function Catalogo() {
 *       const [productos, setProductos] = useState([...]);
 *       return (
 *           <ul>
 *               {productos.map((p) => (
 *                   <li key={p.id}>
 *                       {p.nombre}
 *                       <button onClick={() => setProductos(productos.filter((x) => x.id !== p.id))}>
 *                           Eliminar
 *                       </button>
 *                   </li>
 *               ))}
 *           </ul>
 *       );
 *   }
 */


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Agrega un botón "Ordenar por precio" que ordene `productos` y llame a render().
 *  2. Muestra debajo de la lista el total del inventario (precio * stock).
 *  3. Agrega un input de búsqueda que filtre los productos mostrados por nombre
 *     (pista: render recibe el texto de búsqueda y filtra antes del map).
 */
