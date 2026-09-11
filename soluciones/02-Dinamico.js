/**
 * SOLUCIONES · 02-Dinamico
 */

console.log("===== 01-dinanismo =====");
{
    // 1
    const mascota = {};
    mascota.nombre = "Luna";
    mascota.especie = "gata";
    mascota.presentarse = function () {
        return `Soy ${this.nombre}, un ${this.especie}`;
    };
    console.log(mascota.presentarse());

    // 2
    delete mascota.especie;
    console.log(mascota.presentarse()); // "Soy Luna, un undefined" → la propiedad ya no existe

    // 3
    const claves = ["a", "b", "c"];
    const objeto = {};
    for (let i = 0; i < claves.length; i++) {
        objeto[claves[i]] = i;
    }
    console.log(objeto); // { a: 0, b: 1, c: 2 }

    // 4
    const congelado = Object.freeze({ version: 1 });
    congelado.version = 2;
    console.log(congelado.version, Object.isFrozen(congelado)); // 1 true
}

console.log("===== 02-factory =====");
{
    // 1
    function crearLibro(titulo, autor, paginas) {
        return {
            titulo,
            autor,
            paginas,
            esLargo() {
                return this.paginas > 300;
            },
        };
    }
    const libro = crearLibro("El Principito", "Saint-Exupéry", 96);
    console.log(libro, libro.esLargo());

    // 2
    function crearContador() {
        let valor = 0;
        return {
            incrementar: () => ++valor,
            decrementar: () => --valor,
            obtener: () => valor,
        };
    }
    const c1 = crearContador();
    const c2 = crearContador();
    c1.incrementar();
    c1.incrementar();
    c2.decrementar();
    console.log(c1.obtener(), c2.obtener()); // 2 -1
}

console.log("===== 03-constructor =====");
{
    // 1
    function Producto(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
    Producto.prototype.aplicarDescuento = function (porcentaje) {
        this.precio = this.precio * (1 - porcentaje / 100);
    };

    // 2
    const laptop = new Producto("Laptop", 450000);
    const mouse = new Producto("Mouse", 12000);
    laptop.aplicarDescuento(10);
    console.log(laptop, mouse);

    // 3
    console.log(laptop instanceof Producto, mouse instanceof Producto); // true true
}

console.log("===== 04-funciones-son-objetos =====");
{
    // 1
    function crearSaludo(saludo) {
        return (nombre) => `${saludo}, ${nombre}`;
    }
    const hola = crearSaludo("Hola");
    console.log(hola("Ana"));

    // 2
    const TIPO_CAMBIO = 510;
    const conversor = {
        colonesADolares: (colones) => colones / TIPO_CAMBIO,
        dolaresAColones: (dolares) => dolares * TIPO_CAMBIO,
    };
    console.log(conversor.colonesADolares(51000), conversor.dolaresAColones(100));

    // 3
    const doble = (n) => n * 2;
    const triple = (n) => n * 3;
    const aplicar = (numero, fn) => fn(numero);
    console.log(aplicar(5, doble), aplicar(5, triple)); // 10 15
}

console.log("===== 05-valores-vs-referencias =====");
{
    // 1
    const x = { n: 1 };
    const y = x;
    y.n = 5;
    console.log(x.n); // 5 → x e y apuntan al mismo objeto

    // 2
    const carrito = { items: 2, total: 5000 };
    const carritoNuevo = { ...carrito, total: 7000 };
    console.log(carrito, carritoNuevo, carrito === carritoNuevo); // ... false

    // 3
    function agregarItem(lista, item) {
        return [...lista, item];
    }
    const original = ["a"];
    const nueva = agregarItem(original, "b");
    console.log(original, nueva);
}

console.log("===== 06-enumerar-propiedades =====");
{
    const notas = { mate: 85, ciencias: 92, historia: 78 };

    // 1
    for (const [materia, nota] of Object.entries(notas)) {
        console.log(`${materia}: ${nota}`);
    }

    // 2
    const valores = Object.values(notas);
    const promedio = valores.reduce((acc, n) => acc + n, 0) / valores.length;
    console.log("Promedio:", promedio.toFixed(2));

    // 3
    const contarPropiedades = (obj) => Object.keys(obj).length;
    console.log(contarPropiedades(notas)); // 3
}

console.log("===== 07-clonar-objetos =====");
{
    const perfil = { user: "dani", config: { tema: "claro" } };

    // 1
    const copia1 = { ...perfil, config: { ...perfil.config, tema: "oscuro" } };
    console.log(perfil.config.tema, copia1.config.tema); // claro oscuro

    // 2
    const copia2 = structuredClone(perfil);
    copia2.config.tema = "oscuro";
    console.log(perfil.config.tema, copia2.config.tema); // claro oscuro

    // 3
    const base = { rol: "user", activo: true };
    const extra = { rol: "admin" };
    const combinado = { ...base, ...extra };
    console.log(combinado); // { rol: "admin", activo: true } → gana el último
}
