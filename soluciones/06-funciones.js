/**
 * SOLUCIONES · 06-funciones
 */

console.log("===== 01-declaracion-vs-expresion =====");
{
    // 1
    function cuadrado1(n) {
        return n * n;
    }
    const cuadrado2 = function (n) {
        return n * n;
    };
    const cuadrado3 = (n) => n * n;
    console.log(cuadrado1(4), cuadrado2(4), cuadrado3(4));

    // 2
    console.log(declarada()); // ✅ funciona: las declaraciones function se elevan completas (hoisting)
    function declarada() {
        return "declarada OK";
    }
    try {
        expresion(); // ❌ ReferenceError: la const existe pero aún no está inicializada
    } catch (e) {
        console.log("expresión antes de definirse →", e.name);
    }
    const expresion = () => "expresión OK";
    console.log(expresion());

    // 3
    // a + b                    → expresión
    // if (x) {}                → sentencia
    // edad >= 18 ? "si" : "no" → expresión
    // for (...) {}             → sentencia
    // sumar(1, 2)              → expresión
}

console.log("===== 02-arrow-functions =====");
{
    // 1
    const esMayor = (edad) => edad >= 18;
    console.log(esMayor(20));

    // 2
    const crearProducto = (nombre, precio) => ({ nombre, precio });
    console.log(crearProducto("Café", 6500));

    // 3
    const precios = [1000, 2500, 800];
    console.log(precios.map((p) => p * 1.13));

    // 4
    // Las arrow functions no tienen su propio `this`: usan el this del lugar donde se
    // escribieron (fuera del objeto), no el objeto que las llama. Por eso this.nombre es undefined.
}

console.log("===== 03-parametros-default-y-rest =====");
{
    // 1
    function formatearNombre(nombre, apellido = "", mayusculas = false) {
        const completo = `${nombre} ${apellido}`.trim();
        return mayusculas ? completo.toUpperCase() : completo;
    }
    console.log(formatearNombre("Daniel"), "|", formatearNombre("Daniel", "Mora", true));

    // 2
    const maximoYMinimo = (...numeros) => ({ max: Math.max(...numeros), min: Math.min(...numeros) });
    console.log(maximoYMinimo(4, 9, 1, 7));

    // 3
    function crearTarjeta({ titulo, descripcion = "Sin descripción", destacada = false }) {
        return `${destacada ? "⭐ " : ""}${titulo}: ${descripcion}`;
    }
    console.log(crearTarjeta({ titulo: "JS" }));
    console.log(crearTarjeta({ titulo: "React", descripcion: "Librería de UI", destacada: true }));
}

console.log("===== 04-scope-y-closures =====");
{
    // 1
    function crearAcumulador(inicial) {
        let total = inicial;
        return (numero) => {
            total += numero;
            return total;
        };
    }
    const acumular = crearAcumulador(10);
    console.log(acumular(5), acumular(5)); // 15 20

    // 2
    function crearLimitador(max) {
        let usos = 0;
        return () => {
            if (usos >= max) return "Límite alcanzado";
            usos++;
            return `Uso ${usos} de ${max}`;
        };
    }
    const intentar = crearLimitador(2);
    console.log(intentar(), intentar(), intentar());

    // 3
    // Imprime 2: la arrow "recuerda" la x del scope donde se creó (dentro de f), no la global.
}

console.log("===== 05-callbacks-y-orden-superior =====");
{
    // 1
    function repetir(veces, callback) {
        for (let i = 1; i <= veces; i++) callback(i);
    }
    repetir(3, (i) => console.log("vuelta", i));

    // 2
    function miFind(array, condicion) {
        for (const elemento of array) {
            if (condicion(elemento)) return elemento;
        }
        return undefined;
    }
    console.log(miFind([3, 8, 12], (n) => n > 5)); // 8

    // 3
    const calcular = (a, b, operacion) => operacion(a, b);
    console.log(
        calcular(2, 5, (a, b) => a + b),
        calcular(2, 5, (a, b) => a - b),
        calcular(2, 5, (a, b) => a * b),
        calcular(2, 5, (a, b) => a ** b)
    );
}

console.log("===== 06-this-call-apply-bind =====");
{
    // 1
    const perro = {
        nombre: "Firulais",
        ladrar() {
            return `${this.nombre} dice guau`;
        },
    };
    const ladrarSuelto = perro.ladrar;
    console.log(ladrarSuelto());           // "undefined dice guau" → se perdió el this
    const ladrarFijo = perro.ladrar.bind(perro);
    console.log(ladrarFijo());             // ✅

    // 2
    function describir(ciudad) {
        return `${this.nombre} vive en ${ciudad}`;
    }
    console.log(describir.call({ nombre: "Ana" }, "Cartago"));
    console.log(describir.call({ nombre: "Luis" }, "Heredia"));

    // 3
    const alarma = {
        mensaje: "⏰ ¡Hora de estudiar!",
        programar() {
            setTimeout(() => console.log(this.mensaje), 100);
        },
    };
    alarma.programar();
}

console.log("===== 07-manejo-de-errores =====");
{
    // 1
    function obtenerElemento(array, indice) {
        if (indice < 0 || indice >= array.length) {
            throw new RangeError(`Índice ${indice} fuera de rango (0-${array.length - 1})`);
        }
        return array[indice];
    }
    try {
        console.log(obtenerElemento(["a", "b"], 1));
        console.log(obtenerElemento(["a", "b"], 5));
    } catch (error) {
        console.log(error.name, "→", error.message);
    }

    // 2
    function convertirANumero(texto) {
        const numero = Number(texto);
        if (Number.isNaN(numero)) throw new Error(`"${texto}" no es un número`);
        return numero;
    }
    try {
        console.log(convertirANumero("42"));
        console.log(convertirANumero("cuarenta"));
    } catch (error) {
        console.log("❌", error.message);
    }

    // 3
    function retirar(saldo, monto) {
        try {
            if (monto <= 0) throw new Error("El monto debe ser positivo");
            if (monto > saldo) throw new Error("Saldo insuficiente");
            return saldo - monto;
        } catch (error) {
            console.log("❌", error.message);
            return saldo;
        } finally {
            console.log("Operación finalizada");
        }
    }
    console.log(retirar(1000, 300), retirar(1000, -5), retirar(1000, 5000));
}
