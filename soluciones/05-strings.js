/**
 * SOLUCIONES · 05-strings
 */

console.log("===== 01-template-literals =====");
{
    // 1
    const pelicula = { titulo: "Inception", anio: 2010, rating: 8.8 };
    console.log(`${pelicula.titulo} (${pelicula.anio}) - ⭐ ${pelicula.rating}/10`);

    // 2
    function generarFactura(cliente, items) {
        const lineas = items.map((item) => `  - ${item.nombre}: ₡${item.precio}`).join("\n");
        const total = items.reduce((acc, item) => acc + item.precio, 0);
        return `Factura para: ${cliente}
${lineas}
Total: ₡${total}`;
    }
    console.log(generarFactura("Daniel", [{ nombre: "Café", precio: 6500 }, { nombre: "Pan", precio: 1500 }]));

    // 3
    const categoria = "tecnologia";
    const pagina = 2;
    console.log(`https://api.tienda.com/productos?categoria=${categoria}&pagina=${pagina}`);
}

console.log("===== 02-metodos-de-string =====");
{
    // 1
    const contarPalabras = (frase) => (frase.trim() === "" ? 0 : frase.trim().split(/\s+/).length);
    console.log(contarPalabras("  Hola   mundo desde JS "), contarPalabras("")); // 4 0

    // 2
    function esPalindromo(palabra) {
        const limpia = palabra.toLowerCase();
        return limpia === limpia.split("").reverse().join("");
    }
    console.log(esPalindromo("Reconocer"), esPalindromo("React")); // true false

    // 3
    const iniciales = (nombreCompleto) =>
        nombreCompleto
            .split(" ")
            .map((parte) => parte[0].toUpperCase())
            .join("");
    console.log(iniciales("Daniel Mora Víquez")); // "DMV"

    // 4
    const truncar = (texto, max) => (texto.length > max ? `${texto.slice(0, max)}...` : texto);
    console.log(truncar("Hola mundo", 4), truncar("Hola", 10));
}

console.log("===== 03-math-numeros-y-fechas =====");
{
    // 1
    const formatearColones = (monto) =>
        new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC" }).format(monto);
    console.log(formatearColones(1500000));

    // 2
    function calcularEdad(fechaNacimiento) {
        const nacimiento = new Date(fechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const yaCumplio =
            hoy.getMonth() > nacimiento.getMonth() ||
            (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() >= nacimiento.getDate());
        if (!yaCumplio) edad--;
        return edad;
    }
    console.log(calcularEdad("1995-06-20T12:00:00"));

    // 3
    const generarCodigo = () => String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
    console.log(generarCodigo(), generarCodigo());
}
