/**
 * ============================================================
 *  12-02 · EVENTOS
 * ============================================================
 *  ⚠️ SOLO NAVEGADOR: ábrelo desde index.html.
 *
 *  elemento.addEventListener("evento", callback)
 *
 *  Eventos comunes: click, input, change, submit, keydown, mouseover,
 *  focus, blur, DOMContentLoaded
 *
 *  El callback recibe el objeto EVENTO (e):
 *    e.target            → el elemento que disparó el evento
 *    e.target.value      → valor de un input
 *    e.preventDefault()  → evita el comportamiento por defecto (ej. recargar al enviar un form)
 *
 *  💡 En React: <button onClick={manejarClick}>, <input onChange={manejarCambio}>
 */

const app = document.querySelector("#app");
app.innerHTML = `
  <section style="display:grid; gap:16px; max-width:420px">
    <div>
      <button id="btn-contador">Clics: 0</button>
      <button id="btn-reset">Reiniciar</button>
    </div>

    <div>
      <input id="nombre" placeholder="Escribe tu nombre" />
      <p id="saludo">Hola, desconocido</p>
      <small id="contador-letras">0 / 20</small>
    </div>

    <form id="formulario" style="display:grid; gap:6px">
      <input name="email" type="email" placeholder="Email" />
      <select name="plan">
        <option value="basico">Básico</option>
        <option value="pro">Pro</option>
      </select>
      <label><input name="acepta" type="checkbox" /> Acepto términos</label>
      <button type="submit">Enviar</button>
      <p id="resultado-form"></p>
    </form>

    <ul id="menu" style="cursor:pointer">
      <li data-opcion="inicio">🏠 Inicio</li>
      <li data-opcion="perfil">👤 Perfil</li>
      <li data-opcion="salir">🚪 Salir</li>
    </ul>
    <p id="teclas">Presiona una tecla…</p>
  </section>
`;

// --- click + "estado" -------------------------------------------------------------------------------------------------
let clics = 0; // el "estado"
const btnContador = document.querySelector("#btn-contador");
const btnReset = document.querySelector("#btn-reset");

btnContador.addEventListener("click", () => {
    clics++;                                    // 1. cambia el estado
    btnContador.textContent = `Clics: ${clics}`; // 2. actualiza la interfaz A MANO
});
btnReset.addEventListener("click", () => {
    clics = 0;
    btnContador.textContent = `Clics: ${clics}`; // ⚠️ hay que acordarse de actualizar en cada lugar
});
// 💡 React: const [clics, setClics] = useState(0); → la interfaz se actualiza sola.

// --- input: reaccionar mientras se escribe ------------------------------------------------------------------------------------
const inputNombre = document.querySelector("#nombre");
const saludo = document.querySelector("#saludo");
const contadorLetras = document.querySelector("#contador-letras");

inputNombre.addEventListener("input", (e) => {
    const valor = e.target.value;
    saludo.textContent = `Hola, ${valor.trim() || "desconocido"}`;
    contadorLetras.textContent = `${valor.length} / 20`;
    contadorLetras.style.color = valor.length > 20 ? "crimson" : "";
});

// --- submit de un formulario ------------------------------------------------------------------------------------------------------
const formulario = document.querySelector("#formulario");
const resultadoForm = document.querySelector("#resultado-form");

formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // ⚠️ sin esto la página se recarga

    const datos = new FormData(formulario);
    const valores = {
        email: datos.get("email"),
        plan: datos.get("plan"),
        acepta: datos.get("acepta") === "on",
    };
    console.log("Formulario enviado:", valores);

    if (!valores.email.includes("@")) {
        resultadoForm.textContent = "❌ Email inválido";
        return;
    }
    if (!valores.acepta) {
        resultadoForm.textContent = "❌ Debes aceptar los términos";
        return;
    }
    resultadoForm.textContent = `✅ Registrado ${valores.email} en plan ${valores.plan}`;
    formulario.reset();
});

// --- Delegación de eventos: UN listener en el padre ---------------------------------------------------------------------------------
const menu = document.querySelector("#menu");
menu.addEventListener("click", (e) => {
    const item = e.target.closest("li"); // el <li> clicado (aunque cliques el emoji)
    if (!item) return;
    console.log("Opción elegida:", item.dataset.opcion);
    [...menu.children].forEach((li) => (li.style.fontWeight = li === item ? "bold" : "normal"));
});
// Ventaja: funciona también con <li> que se agreguen después.

// --- Teclado ------------------------------------------------------------------------------------------------------------------------------
const teclas = document.querySelector("#teclas");
document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return; // ignorar mientras se escribe en inputs
    teclas.textContent = `Tecla: "${e.key}" | Ctrl: ${e.ctrlKey} | Shift: ${e.shiftKey}`;
});

// --- Quitar un listener -----------------------------------------------------------------------------------------------------------------------
function soloUnaVez() {
    console.log("Este mensaje aparece solo en el primer clic del botón contador");
    btnContador.removeEventListener("click", soloUnaVez); // necesita la MISMA función (con nombre)
}
btnContador.addEventListener("click", soloUnaVez);
// Alternativa: addEventListener("click", fn, { once: true })

// --- Propagación (bubbling) ---------------------------------------------------------------------------------------------------------------------
// Un clic en un <li> también "sube" al <ul>, al <section>, al #app... por eso funciona la delegación.
// e.stopPropagation() lo detiene (úsalo con moderación).


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Agrega un botón "Modo oscuro" que alterne una clase en #app que cambie
 *     fondo y color de texto (usa classList.toggle y un <style> o style directo).
 *  2. Crea un input de tipo number y muestra debajo el precio con IVA mientras se escribe.
 *  3. Al presionar Enter en el input #nombre (evento "keydown", e.key === "Enter"),
 *     escribe "¡Bienvenido, <nombre>!" en #saludo, en negrita.
 */
