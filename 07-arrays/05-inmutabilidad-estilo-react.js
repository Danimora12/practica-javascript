/**
 * ============================================================
 *  07-05 · INMUTABILIDAD: ACTUALIZAR DATOS "ESTILO REACT"  ⭐⭐⭐
 * ============================================================
 *  React vuelve a pintar un componente cuando el estado CAMBIA de
 *  referencia. Por eso NUNCA se modifica el estado directamente:
 *  siempre se crea un objeto/array NUEVO con los cambios.
 *
 *  Este archivo es la "chuleta" de los patrones que usarás a diario.
 *  (Aquí usamos una función setEstado de mentira para simularlo.)
 */

// --- Simulador mínimo de useState -----------------------------------------------------------------
function crearEstado(valorInicial) {
    let estado = valorInicial;
    const getEstado = () => estado;
    const setEstado = (nuevo) => {
        const siguiente = typeof nuevo === "function" ? nuevo(estado) : nuevo;
        const cambio = siguiente !== estado; // React compara por referencia (Object.is)
        console.log(cambio ? "🔄 re-render" : "⛔ SIN re-render (misma referencia)");
        estado = siguiente;
    };
    return [getEstado, setEstado];
}

// ==========================================================================================
//  ARRAYS
// ==========================================================================================
const [getTareas, setTareas] = crearEstado([
    { id: 1, texto: "Aprender map", hecha: true },
    { id: 2, texto: "Aprender filter", hecha: false },
]);

// ❌ Mutar + setear la misma referencia
const tareasMutadas = getTareas();
tareasMutadas.push({ id: 99, texto: "Mutación", hecha: false });
setTareas(tareasMutadas); // ⛔ React no se entera
setTareas((prev) => prev.filter((t) => t.id !== 99)); // limpiamos el ejemplo

// ✅ 1. AGREGAR
setTareas((prev) => [...prev, { id: 3, texto: "Aprender reduce", hecha: false }]);

// ✅ 2. ELIMINAR
setTareas((prev) => prev.filter((t) => t.id !== 1));

// ✅ 3. ACTUALIZAR UN ELEMENTO (map + spread)
setTareas((prev) => prev.map((t) => (t.id === 2 ? { ...t, texto: "Dominar filter" } : t)));

// ✅ 4. TOGGLE (alternar un booleano)
setTareas((prev) => prev.map((t) => (t.id === 3 ? { ...t, hecha: !t.hecha } : t)));

// ✅ 5. INSERTAR EN UNA POSICIÓN
setTareas((prev) => [...prev.slice(0, 1), { id: 4, texto: "Insertada", hecha: false }, ...prev.slice(1)]);

// ✅ 6. ORDENAR (sobre una copia)
setTareas((prev) => [...prev].sort((a, b) => a.texto.localeCompare(b.texto)));

console.log("Tareas finales:", getTareas());

// ==========================================================================================
//  OBJETOS
// ==========================================================================================
const [getPerfil, setPerfil] = crearEstado({
    nombre: "Daniel",
    email: "d@correo.com",
    preferencias: { tema: "claro", idioma: "es" },
    habilidades: ["SQL", "Power BI"],
});

// ❌ Mutar
getPerfil().nombre = "Otro";
setPerfil(getPerfil()); // ⛔
setPerfil((prev) => ({ ...prev, nombre: "Daniel" }));

// ✅ Cambiar una propiedad
setPerfil((prev) => ({ ...prev, email: "daniel@nuevo.com" }));

// ✅ Cambiar una propiedad DINÁMICA (formularios: onChange con name del input)
const evento = { target: { name: "nombre", value: "Daniel Mora" } };
setPerfil((prev) => ({ ...prev, [evento.target.name]: evento.target.value }));

// ✅ Objeto ANIDADO: copiar cada nivel que cambia
setPerfil((prev) => ({
    ...prev,
    preferencias: { ...prev.preferencias, tema: "oscuro" },
}));

// ✅ Array dentro de un objeto
setPerfil((prev) => ({ ...prev, habilidades: [...prev.habilidades, "JavaScript"] }));

// ✅ Eliminar una propiedad (destructuring + rest)
setPerfil((prev) => {
    const { email, ...sinEmail } = prev;
    return sinEmail;
});

console.log("Perfil final:", getPerfil());

// ==========================================================================================
//  CARRITO DE COMPRAS (ejemplo integrador)
// ==========================================================================================
const [getCarrito, setCarrito] = crearEstado([]);

function agregarAlCarrito(producto) {
    setCarrito((prev) => {
        const existe = prev.find((item) => item.id === producto.id);
        if (existe) {
            return prev.map((item) =>
                item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
            );
        }
        return [...prev, { ...producto, cantidad: 1 }];
    });
}

function quitarDelCarrito(id) {
    setCarrito((prev) =>
        prev
            .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
            .filter((item) => item.cantidad > 0)
    );
}

const cafe = { id: 1, nombre: "Café", precio: 6500 };
const pan = { id: 2, nombre: "Pan", precio: 1500 };
agregarAlCarrito(cafe);
agregarAlCarrito(cafe);
agregarAlCarrito(pan);
quitarDelCarrito(2);

const total = getCarrito().reduce((acc, item) => acc + item.precio * item.cantidad, 0);
console.log("Carrito:", getCarrito(), "Total:", total);

/*
 *  CHULETA
 *  | Acción            | Array                                    | Objeto                           |
 *  |-------------------|------------------------------------------|----------------------------------|
 *  | Agregar           | [...arr, nuevo]                          | { ...obj, nuevaProp: v }         |
 *  | Eliminar          | arr.filter(x => x.id !== id)             | const { prop, ...resto } = obj   |
 *  | Actualizar        | arr.map(x => x.id === id ? {...x, c} : x)| { ...obj, prop: nuevoValor }     |
 *  | Anidado           | —                                        | { ...obj, sub: { ...obj.sub, c } }|
 *  | Ordenar           | [...arr].sort(fn)                        | —                                |
 *  ❌ Evitar sobre el estado: push, pop, splice, sort, reverse, obj.prop = x, delete
 */


/* ============================================================
 *  EJERCICIOS
 * ============================================================
 *  Parte de:  let contactos = [
 *               { id: 1, nombre: "Ana", favorito: false },
 *               { id: 2, nombre: "Luis", favorito: true },
 *             ];
 *  Escribe funciones que DEVUELVAN un array nuevo (sin mutar):
 *  1. agregarContacto(contactos, nombre) → con id = Date.now()
 *  2. eliminarContacto(contactos, id)
 *  3. toggleFavorito(contactos, id)
 *  4. renombrarContacto(contactos, id, nuevoNombre)
 *  Verifica al final que el array original no cambió.
 */
