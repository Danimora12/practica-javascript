/**
 * ============================================================
 *  11-05 · FETCH: PEDIR DATOS A UNA API REAL  ⭐
 * ============================================================
 *  fetch(url, opciones) → devuelve una promesa con un objeto Response.
 *
 *  Pasos:
 *   1. const respuesta = await fetch(url);
 *   2. Verificar respuesta.ok (fetch NO lanza error con 404 o 500 ⚠️)
 *   3. const datos = await respuesta.json();  // convertir el cuerpo a objeto JS
 *
 *  API de práctica gratuita: https://jsonplaceholder.typicode.com
 *  (usuarios, posts, todos... datos falsos pero con estructura real)
 *
 *  ⚠️ Necesita conexión a internet.
 */

const API = "https://jsonplaceholder.typicode.com";

// --- 1) GET con then (para ver la estructura) ----------------------------------------------------------------------
fetch(`${API}/users/1`)
    .then((respuesta) => respuesta.json())
    .then((usuario) => console.log("then → usuario 1:", usuario.name))
    .catch((error) => console.log("❌ Error (¿sin internet?):", error.message));
// ⚠️ Este ejemplo simple no revisa respuesta.ok: el ejemplo 2 muestra la forma correcta.

// --- 2) GET con async/await + manejo correcto de errores ✅ ----------------------------------------------------------
async function obtenerJSON(url) {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        // 404, 500, etc. llegan aquí: fetch solo lanza error si no hay red
        throw new Error(`HTTP ${respuesta.status} en ${url}`);
    }
    return respuesta.json();
}

async function mostrarUsuarios() {
    try {
        const usuarios = await obtenerJSON(`${API}/users`);
        console.log(`Se recibieron ${usuarios.length} usuarios`);
        console.table(
            usuarios.slice(0, 5).map(({ id, name, email, address }) => ({ id, name, email, ciudad: address.city }))
        );
    } catch (error) {
        console.log("❌", error.message);
    }
}

// --- 3) Error 404 -------------------------------------------------------------------------------------------------------------
async function probar404() {
    try {
        await obtenerJSON(`${API}/users/9999`);
    } catch (error) {
        console.log("❌ Esperado:", error.message);
    }
}

// --- 4) Parámetros de búsqueda (query string) ------------------------------------------------------------------------------------
async function tareasPendientes(userId) {
    const params = new URLSearchParams({ userId, completed: false });
    const tareas = await obtenerJSON(`${API}/todos?${params}`);
    console.log(`Usuario ${userId} tiene ${tareas.length} tareas pendientes`);
    return tareas;
}

// --- 5) POST: enviar datos ------------------------------------------------------------------------------------------------------------
async function crearPost(post) {
    const respuesta = await fetch(`${API}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post), // el cuerpo debe ser texto
    });
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    const creado = await respuesta.json();
    console.log("POST → creado con id", creado.id, creado); // la API simula la creación
    return creado;
}
// Otros métodos: PUT/PATCH (actualizar), DELETE (eliminar) → misma estructura con method distinto.

// --- 6) Peticiones en paralelo ---------------------------------------------------------------------------------------------------------
async function perfilCompleto(userId) {
    const [usuario, posts, albumes] = await Promise.all([
        obtenerJSON(`${API}/users/${userId}`),
        obtenerJSON(`${API}/posts?userId=${userId}`),
        obtenerJSON(`${API}/albums?userId=${userId}`),
    ]);
    console.log(`${usuario.name}: ${posts.length} posts y ${albumes.length} álbumes`);
}

// --- 7) Cancelar una petición (AbortController) ----------------------------------------------------------------------------------------------
async function peticionCancelable() {
    const controlador = new AbortController();
    setTimeout(() => controlador.abort(), 1); // cancelamos casi de inmediato
    try {
        await fetch(`${API}/photos`, { signal: controlador.signal });
        console.log("La petición terminó antes de cancelarse");
    } catch (error) {
        console.log("AbortController →", error.name); // "AbortError"
    }
}
// 💡 En React se usa en la limpieza de useEffect para no actualizar un componente desmontado.

// --- Ejecutar todo en orden -------------------------------------------------------------------------------------------------------------------
async function main() {
    await mostrarUsuarios();
    await probar404();
    await tareasPendientes(1);
    await crearPost({ title: "Aprendiendo fetch", body: "¡Funciona!", userId: 1 });
    await perfilCompleto(2);
    await peticionCancelable();
    console.log("✅ Fin de los ejemplos de fetch");
}
main().catch((error) => console.log("❌ Error general (¿sin internet?):", error.message));

/*
 *  Buenas prácticas para proyectos React:
 *  - Centraliza las llamadas en un archivo (ej. src/services/api.js) y expórtalas.
 *  - Guarda la URL base en una variable de entorno (import.meta.env.VITE_API_URL en Vite).
 *  - Maneja siempre 3 estados: cargando, error, datos.
 *  - Nunca pongas claves secretas de APIs en el frontend: cualquiera puede verlas.
 *  - Más adelante: librerías como TanStack Query simplifican caché y recargas.
 */


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  1. Obtén los posts del usuario 3 e imprime solo sus títulos.
 *  2. Crea `buscarUsuarioPorEmail(email)` que traiga /users y devuelva el
 *     usuario con ese email (o null). Prueba con "Sincere@april.biz".
 *  3. Obtén /todos, y con reduce cuenta cuántas tareas completadas y
 *     pendientes hay en total: { completadas: n, pendientes: m }.
 */
