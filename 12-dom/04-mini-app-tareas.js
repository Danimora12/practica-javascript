/**
 * ============================================================
 *  12-04 · MINI PROYECTO: APP DE TAREAS (todo lo aprendido junto)
 * ============================================================
 *  ⚠️ SOLO NAVEGADOR: ábrelo desde index.html.
 *
 *  Usa: objetos, arrays inmutables (map/filter/spread), destructuring,
 *  template literals, funciones, eventos, delegación, DOM y localStorage.
 *
 *  Arquitectura "tipo React" hecha a mano:
 *    estado  →  render(estado)  →  eventos  →  setEstado(nuevo)  →  render...
 *
 *  Cuando pases a React, esta misma app se reduce a ~40 líneas y el
 *  render/setEstado lo hace React por ti. ¡Buen primer proyecto para migrar!
 */

// ==========================================================================================
//  1. ESTADO
// ==========================================================================================
const CLAVE_STORAGE = "practica-js-tareas";

function cargarTareas() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_STORAGE)) ?? [];
    } catch {
        return [];
    }
}

let estado = {
    tareas: cargarTareas(),
    filtro: "todas", // "todas" | "pendientes" | "hechas"
};

function setEstado(cambios) {
    estado = { ...estado, ...cambios };       // nuevo objeto (inmutable)
    try {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(estado.tareas));
    } catch {
        /* sin almacenamiento disponible: la app sigue funcionando en memoria */
    }
    render();                                 // cada cambio vuelve a dibujar
}

// ==========================================================================================
//  2. ACCIONES (funciones puras que calculan el nuevo estado)
// ==========================================================================================
const agregarTarea = (tareas, texto) => [...tareas, { id: Date.now(), texto, hecha: false }];
const alternarTarea = (tareas, id) => tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t));
const eliminarTarea = (tareas, id) => tareas.filter((t) => t.id !== id);
const limpiarHechas = (tareas) => tareas.filter((t) => !t.hecha);

function tareasVisibles({ tareas, filtro }) {
    if (filtro === "pendientes") return tareas.filter((t) => !t.hecha);
    if (filtro === "hechas") return tareas.filter((t) => t.hecha);
    return tareas;
}

// ==========================================================================================
//  3. INTERFAZ (estructura fija)
// ==========================================================================================
const app = document.querySelector("#app");
app.innerHTML = `
  <style>
    .todo { max-width: 460px; font-family: system-ui, sans-serif; }
    .todo form { display: flex; gap: 8px; }
    .todo input[type=text] { flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 6px; }
    .todo button { padding: 6px 10px; border: 1px solid #ccc; border-radius: 6px; background: #fff; cursor: pointer; }
    .todo ul { list-style: none; padding: 0; }
    .todo li { display: flex; align-items: center; gap: 8px; padding: 8px; border-bottom: 1px solid #eee; }
    .todo li span { flex: 1; }
    .todo li.hecha span { text-decoration: line-through; color: #888; }
    .todo .filtros button.activo { background: #2563eb; color: #fff; border-color: #2563eb; }
    .todo footer { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; }
    .todo .vacio { color: #888; text-align: center; padding: 16px; }
  </style>
  <section class="todo">
    <h2>📝 Mis tareas</h2>
    <form id="form-tarea">
      <input type="text" id="input-tarea" placeholder="¿Qué necesitas hacer?" maxlength="80" />
      <button>Agregar</button>
    </form>
    <p id="error" style="color:crimson; min-height:1em; margin:4px 0"></p>
    <ul id="lista-tareas"></ul>
    <footer>
      <small id="resumen"></small>
      <div class="filtros">
        <button data-filtro="todas">Todas</button>
        <button data-filtro="pendientes">Pendientes</button>
        <button data-filtro="hechas">Hechas</button>
      </div>
      <button id="limpiar">Limpiar hechas</button>
    </footer>
  </section>
`;

const $ = (selector) => app.querySelector(selector); // atajo
const form = $("#form-tarea");
const input = $("#input-tarea");
const error = $("#error");
const lista = $("#lista-tareas");
const resumen = $("#resumen");
const filtros = $(".filtros");

// ==========================================================================================
//  4. RENDER: estado → HTML
// ==========================================================================================
function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;          // textContent escapa < > & → evita XSS
    return div.innerHTML;
}

function render() {
    const visibles = tareasVisibles(estado);

    lista.innerHTML = visibles.length
        ? visibles
              .map(
                  ({ id, texto, hecha }) => `
            <li data-id="${id}" class="${hecha ? "hecha" : ""}">
              <input type="checkbox" data-accion="alternar" ${hecha ? "checked" : ""} />
              <span>${escaparHTML(texto)}</span>
              <button data-accion="eliminar" aria-label="Eliminar">🗑️</button>
            </li>`
              )
              .join("")
        : `<li class="vacio">No hay tareas ${estado.filtro !== "todas" ? estado.filtro : ""}</li>`;

    const pendientes = estado.tareas.filter((t) => !t.hecha).length;
    resumen.textContent = `${pendientes} pendiente${pendientes === 1 ? "" : "s"} de ${estado.tareas.length}`;

    filtros.querySelectorAll("button").forEach((btn) => {
        btn.classList.toggle("activo", btn.dataset.filtro === estado.filtro);
    });
}

// ==========================================================================================
//  5. EVENTOS → setEstado
// ==========================================================================================
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    if (!texto) {
        error.textContent = "Escribe algo antes de agregar";
        return;
    }
    if (estado.tareas.some((t) => t.texto.toLowerCase() === texto.toLowerCase())) {
        error.textContent = "Esa tarea ya existe";
        return;
    }
    error.textContent = "";
    setEstado({ tareas: agregarTarea(estado.tareas, texto) });
    input.value = "";
    input.focus();
});

// Delegación: un solo listener para todos los checkbox y botones de la lista
lista.addEventListener("click", (e) => {
    const accion = e.target.dataset.accion;
    const li = e.target.closest("li[data-id]");
    if (!accion || !li) return;
    const id = Number(li.dataset.id);

    if (accion === "alternar") setEstado({ tareas: alternarTarea(estado.tareas, id) });
    if (accion === "eliminar") setEstado({ tareas: eliminarTarea(estado.tareas, id) });
});

filtros.addEventListener("click", (e) => {
    const filtro = e.target.dataset.filtro;
    if (filtro) setEstado({ filtro });
});

$("#limpiar").addEventListener("click", () => {
    setEstado({ tareas: limpiarHechas(estado.tareas) });
});

// Datos de ejemplo la primera vez
if (estado.tareas.length === 0) {
    setEstado({
        tareas: [
            { id: 1, texto: "Terminar 07-arrays", hecha: true },
            { id: 2, texto: "Practicar async/await", hecha: false },
            { id: 3, texto: "Crear mi primer proyecto con Vite + React", hecha: false },
        ],
    });
} else {
    render();
}

console.log("App de tareas lista. Estado actual:", estado);


/* ============================================================
 *  RETOS (sin solución: son para ti)
 * ============================================================
 *  1. Doble clic sobre el texto de una tarea para editarla.
 *  2. Mostrar la fecha de creación de cada tarea (el id es un timestamp).
 *  3. Agregar prioridad (alta/media/baja) con un <select> y ordenar por prioridad.
 *  4. Cuando termines 1–3: rehaz esta app en React con Vite y compara.
 */
