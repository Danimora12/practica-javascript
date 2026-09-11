/**
 * ============================================================
 *  12-01 · DOM: SELECCIONAR Y MODIFICAR ELEMENTOS
 * ============================================================
 *  ⚠️ SOLO NAVEGADOR: ábrelo desde index.html (no funciona con Node).
 *
 *  DOM (Document Object Model) = el HTML convertido en objetos JS que
 *  puedes leer y cambiar. `document` es la raíz.
 *
 *  Seleccionar:
 *    document.querySelector("css")      → el PRIMER elemento que coincide
 *    document.querySelectorAll("css")   → TODOS (NodeList)
 *    document.getElementById("id")      → por id
 *
 *  ⭐ ¿Por qué aprender esto si voy a usar React? Porque React hace esto
 *     por ti. Entender el DOM te permite entender QUÉ automatiza React,
 *     depurar mejor y usar useRef cuando necesites tocar el DOM directamente.
 */

// El index.html de esta carpeta tiene un <div id="app">. Le metemos HTML de práctica:
const app = document.querySelector("#app");
app.innerHTML = `
  <h2 id="titulo">Título original</h2>
  <p class="descripcion">Primer párrafo</p>
  <p class="descripcion destacado">Segundo párrafo</p>
  <ul id="lista">
    <li>Uno</li><li>Dos</li><li>Tres</li>
  </ul>
  <a id="enlace" href="https://developer.mozilla.org">MDN</a>
  <input id="entrada" type="text" value="Texto inicial" />
  <img id="foto" alt="Foto" width="80" />
`;

// --- Seleccionar -------------------------------------------------------------------------------------------------
const titulo = document.querySelector("#titulo");        // por id (con #)
const primerParrafo = document.querySelector(".descripcion"); // por clase (con .) → el primero
const parrafos = document.querySelectorAll(".descripcion");   // todos
const items = document.querySelectorAll("#lista li");        // selector CSS descendiente
const mismoTitulo = document.getElementById("titulo");       // sin #

console.log(titulo, primerParrafo);
console.log("Párrafos:", parrafos.length, "| Items:", items.length);
console.log(titulo === mismoTitulo); // true
console.log(document.querySelector(".no-existe")); // null ⚠️ verifica antes de usar

// --- Leer y cambiar texto ------------------------------------------------------------------------------------------------
console.log("Texto:", titulo.textContent);
titulo.textContent = "Título cambiado desde JS ✨";

// innerHTML interpreta HTML (⚠️ nunca con texto que escribe el usuario: riesgo XSS)
primerParrafo.innerHTML = "Párrafo con <strong>negrita</strong>";

// --- Recorrer varios elementos ---------------------------------------------------------------------------------------------
items.forEach((item, i) => {
    item.textContent = `${i + 1}. ${item.textContent}`;
});
// NodeList → array para usar map/filter
const textos = [...items].map((li) => li.textContent);
console.log(textos);

// --- Clases CSS (classList) ✅ ----------------------------------------------------------------------------------------------------
const segundo = parrafos[1];
console.log(segundo.classList.contains("destacado")); // true
segundo.classList.remove("destacado");
segundo.classList.add("resaltado");
segundo.classList.toggle("activo"); // agrega si no está, quita si está
console.log(segundo.className);     // "descripcion resaltado activo"
// 💡 En React: <p className={activo ? "resaltado" : ""}>

// --- Estilos en línea ----------------------------------------------------------------------------------------------------------------
titulo.style.color = "#2563eb";
titulo.style.backgroundColor = "#eff6ff"; // camelCase en vez de background-color
titulo.style.padding = "8px 12px";
titulo.style.borderRadius = "8px";
// 💡 En React: style={{ backgroundColor: "#eff6ff" }}

// --- Atributos ----------------------------------------------------------------------------------------------------------------------------
const enlace = document.querySelector("#enlace");
console.log(enlace.getAttribute("href"));
enlace.setAttribute("target", "_blank");
enlace.textContent = "Documentación MDN (nueva pestaña)";

const foto = document.querySelector("#foto");
foto.src = "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" rx="12" fill="#f7df1e"/><text x="40" y="52" font-size="30" text-anchor="middle" font-family="Arial" font-weight="bold">JS</text></svg>'
);

// data-* attributes
titulo.dataset.seccion = "intro";           // crea data-seccion="intro"
console.log(titulo.outerHTML);

// --- Valores de inputs ---------------------------------------------------------------------------------------------------------------------
const entrada = document.querySelector("#entrada");
console.log("Valor del input:", entrada.value); // ⚠️ siempre string
entrada.value = "Nuevo valor desde JS";

// --- Navegar entre elementos ---------------------------------------------------------------------------------------------------------------------
const lista = document.querySelector("#lista");
console.log("Hijos:", lista.children.length);
console.log("Primer hijo:", lista.firstElementChild.textContent);
console.log("Padre:", lista.parentElement.id);
console.log("Hermano siguiente:", lista.nextElementSibling.id);
console.log("closest:", items[0].closest("#app").id); // sube hasta encontrar el selector


/* ============================================================
 *  EJERCICIOS  (soluciones en soluciones/12-dom.js)
 * ============================================================
 *  1. Cambia el texto de TODOS los <li> a mayúsculas.
 *  2. Agrega la clase "destacado" solo a los párrafos cuyo texto incluya "Segundo".
 *  3. Cambia el color de fondo de #app a un gris claro con style.
 *  4. Lee el valor del input, conviértelo a mayúsculas y ponlo en el título.
 */
