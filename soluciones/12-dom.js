/**
 * SOLUCIONES · 12-dom
 * ⚠️ SOLO NAVEGADOR. Crea su propio HTML de práctica dentro de #app.
 */

const app = document.querySelector("#app");
app.innerHTML = `
  <section id="sol-01">
    <h3>01 · Seleccionar y modificar</h3>
    <h2 id="titulo">Título original</h2>
    <p class="descripcion">Primer párrafo</p>
    <p class="descripcion">Segundo párrafo</p>
    <ul id="lista"><li>Uno</li><li>Dos</li><li>Tres</li></ul>
    <input id="entrada" value="texto desde el input" />
  </section>
  <hr />
  <section id="sol-02">
    <h3>02 · Eventos</h3>
    <button id="modo-oscuro">Modo oscuro</button>
    <div>
      <input id="precio" type="number" placeholder="Precio sin IVA" />
      <p id="precio-iva">Con IVA: ₡0</p>
    </div>
    <input id="nombre" placeholder="Tu nombre + Enter" />
    <p id="saludo">Hola, desconocido</p>
  </section>
  <hr />
  <section id="sol-03">
    <h3>03 · Crear elementos</h3>
    <input id="buscar" placeholder="Buscar producto" />
    <button id="ordenar">Ordenar por precio</button>
    <ul id="productos"></ul>
    <p id="total-inventario"></p>
  </section>
`;

// ============================== 01 ==============================
// 1
document.querySelectorAll("#lista li").forEach((li) => {
    li.textContent = li.textContent.toUpperCase();
});
// 2
document.querySelectorAll(".descripcion").forEach((p) => {
    if (p.textContent.includes("Segundo")) p.classList.add("destacado");
});
// 3
app.style.backgroundColor = "#f3f4f6";
app.style.padding = "12px";
// 4
document.querySelector("#titulo").textContent = document.querySelector("#entrada").value.toUpperCase();

// ============================== 02 ==============================
// 1
const estiloOscuro = document.createElement("style");
estiloOscuro.textContent = `#app.oscuro { background-color: #111827 !important; color: #f9fafb; }`;
document.head.append(estiloOscuro);
document.querySelector("#modo-oscuro").addEventListener("click", () => {
    app.classList.toggle("oscuro");
});

// 2
const inputPrecio = document.querySelector("#precio");
const precioIva = document.querySelector("#precio-iva");
inputPrecio.addEventListener("input", (e) => {
    const precio = Number(e.target.value) || 0;
    precioIva.textContent = `Con IVA: ₡${(precio * 1.13).toLocaleString("es-CR")}`;
});

// 3
const inputNombre = document.querySelector("#nombre");
const saludo = document.querySelector("#saludo");
inputNombre.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const strong = document.createElement("strong");
    strong.textContent = `¡Bienvenido, ${inputNombre.value.trim() || "desconocido"}!`;
    saludo.replaceChildren(strong);
});

// ============================== 03 ==============================
const productos = [
    { id: 1, nombre: "Café Tarrazú", precio: 6500, stock: 20 },
    { id: 2, nombre: "Pan casero", precio: 1500, stock: 0 },
    { id: 3, nombre: "Queso Turrialba", precio: 4200, stock: 8 },
];
const listaProductos = document.querySelector("#productos");
const totalInventario = document.querySelector("#total-inventario");
const inputBuscar = document.querySelector("#buscar");

// 3 → render recibe el texto de búsqueda
function render(busqueda = "") {
    const visibles = productos.filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    listaProductos.replaceChildren(
        ...visibles.map((p) => {
            const li = document.createElement("li");
            li.textContent = `${p.nombre} — ₡${p.precio}`;
            return li;
        })
    );
    // 2
    const total = productos.reduce((acc, p) => acc + p.precio * p.stock, 0);
    totalInventario.textContent = `Total inventario: ₡${total.toLocaleString("es-CR")}`;
}

// 1
document.querySelector("#ordenar").addEventListener("click", () => {
    productos.sort((a, b) => a.precio - b.precio);
    render(inputBuscar.value);
});
inputBuscar.addEventListener("input", (e) => render(e.target.value));

render();
