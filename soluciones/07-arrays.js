/**
 * SOLUCIONES · 07-arrays
 */

console.log("===== 01-agregar-y-eliminar =====");
{
    // 1
    const cola = [];
    cola.push("Cliente 1", "Cliente 2", "Cliente 3");
    while (cola.length > 0) {
        console.log("Atendiendo a:", cola.shift());
    }

    // 2
    const dias = ["lun", "mar", "jue"];
    dias.splice(2, 0, "mie");
    console.log(dias);

    // 3
    const diasOriginal = ["lun", "mar", "jue"];
    const diasNuevo = [...diasOriginal.slice(0, 2), "mie", ...diasOriginal.slice(2)];
    console.log(diasOriginal, diasNuevo);

    // 4
    const eliminarProducto = (productos, id) => productos.filter((p) => p.id !== id);
    const productos = [{ id: 1, nombre: "Café" }, { id: 2, nombre: "Pan" }];
    console.log(eliminarProducto(productos, 1), productos);
}

const productos = [
    { id: 1, nombre: "Laptop", precio: 450000, categoria: "tecnologia" },
    { id: 2, nombre: "Silla", precio: 85000, categoria: "hogar" },
    { id: 3, nombre: "Mouse", precio: 12000, categoria: "tecnologia" },
];

console.log("===== 02-buscar-elementos =====");
{
    console.log(productos.find((p) => p.id === 3));                // 1
    console.log(productos.findIndex((p) => p.nombre === "Silla")); // 2 → 1
    console.log(productos.some((p) => p.precio > 400000));         // 3 → true
    console.log(productos.every((p) => p.precio > 10000));         // 4 → true
}

console.log("===== 03-map-filter-reduce =====");
{
    const estudiantes = [
        { nombre: "Ana", nota: 92, carrera: "Informática" },
        { nombre: "Luis", nota: 65, carrera: "Administración" },
        { nombre: "Sofía", nota: 78, carrera: "Informática" },
        { nombre: "Carlos", nota: 55, carrera: "Informática" },
    ];

    // 1
    console.log(estudiantes.map((e) => e.nombre.toUpperCase()));

    // 2
    const aprobados = estudiantes.filter((e) => e.nota >= 70);
    console.log(aprobados);

    // 3
    const promedio = estudiantes.reduce((acc, e) => acc + e.nota, 0) / estudiantes.length;
    console.log("Promedio:", promedio); // 72.5

    // 4
    const infoAprobados = estudiantes.filter((e) => e.carrera === "Informática" && e.nota >= 70);
    const promedioInfo = infoAprobados.reduce((acc, e) => acc + e.nota, 0) / infoAprobados.length;
    console.log("Promedio Informática aprobados:", promedioInfo); // 85

    // 5
    const porCarrera = estudiantes.reduce((acc, e) => {
        acc[e.carrera] = (acc[e.carrera] ?? 0) + 1;
        return acc;
    }, {});
    console.log(porCarrera); // { Informática: 3, Administración: 1 }
}

console.log("===== 04-ordenar-combinar-convertir =====");
{
    // 1
    const nums = [3, 20, 100, 7];
    const ordenados = [...nums].sort((a, b) => a - b);
    console.log(ordenados, nums);

    // 2
    const dosMasCaros = [...productos].sort((a, b) => b.precio - a.precio).slice(0, 2);
    console.log(dosMasCaros.map((p) => p.nombre)); // Laptop, Silla

    // 3
    const nombres = ["ana", "luis", "ana", "sofía", "luis"];
    console.log([...new Set(nombres)].sort((a, b) => a.localeCompare(b, "es")).join(" - "));

    // 4
    console.log(Array.from({ length: 10 }, (_, i) => i + 1));
}

console.log("===== 05-inmutabilidad-estilo-react =====");
{
    const contactos = [
        { id: 1, nombre: "Ana", favorito: false },
        { id: 2, nombre: "Luis", favorito: true },
    ];

    const agregarContacto = (lista, nombre) => [...lista, { id: Date.now(), nombre, favorito: false }];
    const eliminarContacto = (lista, id) => lista.filter((c) => c.id !== id);
    const toggleFavorito = (lista, id) => lista.map((c) => (c.id === id ? { ...c, favorito: !c.favorito } : c));
    const renombrarContacto = (lista, id, nuevoNombre) =>
        lista.map((c) => (c.id === id ? { ...c, nombre: nuevoNombre } : c));

    let resultado = agregarContacto(contactos, "Sofía");
    resultado = eliminarContacto(resultado, 2);
    resultado = toggleFavorito(resultado, 1);
    resultado = renombrarContacto(resultado, 1, "Ana María");

    console.log("Resultado:", resultado);
    console.log("Original intacto:", contactos);
}
