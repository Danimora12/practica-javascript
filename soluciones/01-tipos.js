/**
 * SOLUCIONES · 01-tipos
 * Intenta resolver los ejercicios ANTES de mirar aquí.
 * Cada solución va entre { } para que las variables no choquen entre sí.
 */

console.log("===== 01-variables =====");
{
    // 1
    let miNombre = "Daniel";
    let carrera = "Ingeniería Informática";
    console.log(miNombre, "-", carrera);

    // 2
    let contador = 0;
    contador = contador + 1;
    contador = contador + 1;
    contador = contador + 1;
    console.log("contador:", contador); // 3

    // 3 → válidos: precioTotal, _temp, $boton
    //     inválidos: 1erLugar (empieza con número), total-venta (guion), class (reservada)
}

console.log("===== 02-primitivos =====");
{
    // 1
    const texto = "hola";
    const numero = 7;
    const booleano = true;
    let indefinido;
    const nulo = null;
    for (const valor of [texto, numero, booleano, indefinido, nulo]) {
        console.log(valor, "→", typeof valor);
    }

    // 2
    console.log((0.1 + 0.2).toFixed(1)); // "0.3"

    // 3
    console.log("5" * "2");   // 10 → * convierte los strings a número
    console.log("cinco" * 2); // NaN → "cinco" no se puede convertir a número
}

console.log("===== 03-constantes =====");
{
    // 1
    const PI_APROX = 3.14;
    const radio = 5;
    console.log("Área:", PI_APROX * radio * radio); // 78.5

    // 2
    const carrito = [];
    carrito.push("café");
    carrito.push("pan");
    console.log(carrito);
    // No da error porque const impide REASIGNAR la variable (carrito = [...]),
    // pero no impide modificar el CONTENIDO del array.
}

console.log("===== 04-tipado-dinamico =====");
{
    // 1
    let valor = 10;
    console.log(typeof valor); // number
    valor = "10";
    console.log(typeof valor); // string
    valor = true;
    console.log(typeof valor); // boolean

    // 2
    const a = "8";
    const b = "2";
    console.log(Number(a) + Number(b)); // 10

    // 3
    console.log("10" / 2);     // 5
    console.log("10" + 2);     // "102"
    console.log(null + 1);     // 1   (null → 0)
    console.log(undefined + 1); // NaN (undefined → NaN)
}

console.log("===== 05-comentarios =====");
{
    /**
     * Devuelve un saludo personalizado.
     * @param {string} nombre - Nombre de la persona.
     * @returns {string} Saludo.
     */
    function saludar(nombre) {
        return `Hola, ${nombre}`;
    }
    console.log(saludar("Daniel"));
}

console.log("===== 06-objetos =====");
{
    // 1
    const libro = {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        anio: 1967,
        disponible: true,
    };
    console.log(libro.titulo, "|", libro["autor"]);

    // 2
    libro.disponible = false;
    libro.paginas = 471;
    delete libro.anio;

    // 3
    const campo = "autor";
    console.log(libro[campo]);

    // 4
    libro.resumen = function () {
        return `${this.titulo} - ${this.autor}`;
    };
    console.log(libro.resumen(), libro);
}

console.log("===== 07-arrays =====");
{
    // 1
    const lenguajes = ["JavaScript", "Python", "SQL"];
    console.log(lenguajes[0], lenguajes[lenguajes.length - 1], lenguajes.length);

    // 2
    lenguajes.push("TypeScript");
    console.log(lenguajes.includes("TypeScript")); // true

    // 3
    const contactos = [
        { nombre: "Ana", telefono: "8888-1111" },
        { nombre: "Luis", telefono: "8888-2222" },
    ];
    console.log(contactos[1].telefono);
}

console.log("===== 08-funciones =====");
{
    // 1
    function areaRectangulo(base, altura) {
        return base * altura;
    }
    console.log(areaRectangulo(5, 3)); // 15

    // 2
    function esPar(numero) {
        return numero % 2 === 0;
    }
    console.log(esPar(4), esPar(7)); // true false

    // 3
    function saludarUsuario(nombre) {
        return `Hola, ${nombre}!`;
    }
    console.log(saludarUsuario("Ana"), saludarUsuario("Luis"));
}

console.log("===== 09-argumentos =====");
{
    // 1
    function promedio(...notas) {
        let suma = 0;
        for (const nota of notas) suma += nota;
        return suma / notas.length;
    }
    console.log(promedio(80, 90, 100)); // 90

    // 2
    function crearUsuario(nombre, rol = "lector") {
        return { nombre, rol };
    }
    console.log(crearUsuario("Ana"), crearUsuario("Luis", "admin"));

    // 3
    function suma(a, b) {
        return a + b;
    }
    console.log(suma("5", 6)); // "56" → con + y un string, JS concatena en vez de sumar
}
