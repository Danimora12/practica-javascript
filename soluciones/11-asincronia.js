/**
 * SOLUCIONES · 11-asincronia
 * (se ejecutan en orden gracias a una función main async)
 */

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const USUARIOS = [{ id: 1, nombre: "Daniel" }, { id: 2, nombre: "Ana" }];
const PEDIDOS = [{ id: 101, usuarioId: 1, productoId: 5 }, { id: 102, usuarioId: 2, productoId: 7 }];

async function obtenerUsuario(id) {
    await esperar(200);
    const usuario = USUARIOS.find((u) => u.id === id);
    if (!usuario) throw new Error(`Usuario ${id} no existe`);
    return usuario;
}
async function obtenerPedido(usuarioId) {
    await esperar(200);
    const pedido = PEDIDOS.find((p) => p.usuarioId === usuarioId);
    if (!pedido) throw new Error("Sin pedidos");
    return pedido;
}

async function main() {
    console.log("===== 01-sincrono-vs-asincrono =====");
    // 1 → orden: 1, 4, 3, 2 (síncrono → microtarea → tarea)
    console.log(1);
    setTimeout(() => console.log(2), 0);
    Promise.resolve().then(() => console.log(3));
    console.log(4);
    await esperar(10);

    // 2
    await new Promise((terminar) => {
        let n = 5;
        const id = setInterval(() => {
            console.log(n);
            if (n === 0) {
                clearInterval(id);
                console.log("🚀 Despegue");
                terminar();
            }
            n--;
        }, 200); // 200 ms para no esperar tanto; el ejercicio pedía 1000
    });

    // 3
    function esperarMensaje(ms, mensaje) {
        setTimeout(() => console.log(mensaje), ms);
    }
    esperarMensaje(100, "Mensaje después de 100 ms");
    await esperar(150);

    console.log("===== 02-callbacks =====");
    await new Promise((terminar) => {
        function leerArchivo(nombre, callback) {
            setTimeout(() => {
                if (!nombre.endsWith(".txt")) return callback(new Error(`${nombre} no es .txt`));
                callback(null, `contenido de ${nombre}`);
            }, 500);
        }
        leerArchivo("a.txt", (errorA, contenidoA) => {
            if (errorA) return console.log("❌", errorA.message);
            leerArchivo("b.txt", (errorB, contenidoB) => {
                if (errorB) return console.log("❌", errorB.message);
                console.log(`${contenidoA} + ${contenidoB}`);
                terminar();
            });
        });
    });

    console.log("===== 03-promesas =====");
    // 1
    const verificarEdad = (edad) =>
        new Promise((resolve, reject) => {
            edad >= 18 ? resolve("Acceso permitido") : reject(new Error("Acceso denegado: menor de edad"));
        });
    await verificarEdad(20).then(console.log).catch((e) => console.log("❌", e.message));
    await verificarEdad(15).then(console.log).catch((e) => console.log("❌", e.message));

    // 2 (con 300 ms en vez de 1 s)
    await esperar(300)
        .then(() => console.log("uno"))
        .then(() => esperar(300))
        .then(() => console.log("dos"))
        .then(() => esperar(300))
        .then(() => console.log("tres"));

    // 3
    await Promise.all([obtenerUsuario(1), obtenerUsuario(2)]).then((usuarios) =>
        console.log(usuarios.map((u) => u.nombre).join(" y "))
    );

    console.log("===== 04-async-await =====");
    // 1
    const usuario = await obtenerUsuario(2);
    const pedido = await obtenerPedido(usuario.id);
    console.log(pedido);

    // 2
    async function cuentaRegresiva(n) {
        for (let i = n; i >= 1; i--) {
            console.log(i);
            await esperar(200); // 1000 en el enunciado
        }
    }
    await cuentaRegresiva(3);

    // 3
    async function obtenerVarios(ids) {
        try {
            const usuarios = await Promise.all(ids.map((id) => obtenerUsuario(id)));
            return usuarios.map((u) => u.nombre);
        } catch (error) {
            console.log("❌", error.message);
            return [];
        }
    }
    console.log(await obtenerVarios([1, 2]));
    console.log(await obtenerVarios([1, 99]));

    console.log("===== 05-fetch-api (necesita internet) =====");
    const API = "https://jsonplaceholder.typicode.com";
    async function obtenerJSON(url) {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        return respuesta.json();
    }
    try {
        // 1
        const posts = await obtenerJSON(`${API}/posts?userId=3`);
        console.log(posts.map((p) => p.title));

        // 2
        async function buscarUsuarioPorEmail(email) {
            const usuarios = await obtenerJSON(`${API}/users`);
            return usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
        }
        console.log((await buscarUsuarioPorEmail("Sincere@april.biz"))?.name);

        // 3
        const todos = await obtenerJSON(`${API}/todos`);
        const conteo = todos.reduce(
            (acc, t) => {
                t.completed ? acc.completadas++ : acc.pendientes++;
                return acc;
            },
            { completadas: 0, pendientes: 0 }
        );
        console.log(conteo);
    } catch (error) {
        console.log("❌ No se pudo conectar a la API:", error.message);
    }
}

main();
