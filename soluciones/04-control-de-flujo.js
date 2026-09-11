/**
 * SOLUCIONES · 04-control-de-flujo
 */

console.log("===== 01-if-else =====");
{
    // 1
    function calcularDescuento(total) {
        if (total < 10000) return total;
        if (total <= 50000) return total * 0.95;
        return total * 0.9;
    }
    console.log(calcularDescuento(5000), calcularDescuento(20000), calcularDescuento(80000));

    // 2
    function validarPassword(pass) {
        if (pass.length < 8) return "Muy corta";
        if (!/\d/.test(pass)) return "Falta un número";
        return "Válida";
    }
    console.log(validarPassword("abc"), validarPassword("abcdefgh"), validarPassword("abcdefg1"));

    // 3
    function fizzBuzz(n) {
        if (n % 15 === 0) return "FizzBuzz"; // primero el caso más específico
        if (n % 3 === 0) return "Fizz";
        if (n % 5 === 0) return "Buzz";
        return n;
    }
    console.log([3, 5, 15, 7].map(fizzBuzz));
}

console.log("===== 02-switch =====");
{
    // 1
    function precioPlan(plan) {
        switch (plan) {
            case "basico":
                return 5000;
            case "pro":
                return 12000;
            case "empresa":
                return 30000;
            default:
                return 0;
        }
    }
    console.log(precioPlan("pro"), precioPlan("gratis"));

    // 2
    const PRECIOS = { basico: 5000, pro: 12000, empresa: 30000 };
    const precioPlanObjeto = (plan) => PRECIOS[plan] ?? 0;
    console.log(precioPlanObjeto("empresa"), precioPlanObjeto("x"));

    // 3
    function calculadora(a, b, operador) {
        switch (operador) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return b === 0 ? "No se puede dividir entre 0" : a / b;
            default:
                return "Operador no válido";
        }
    }
    console.log(calculadora(8, 2, "/"), calculadora(8, 0, "/"), calculadora(8, 2, "*"));
}

console.log("===== 03-bucles =====");
{
    // 1
    for (let i = 1; i <= 10; i++) {
        console.log(`7 x ${i} = ${7 * i}`);
    }

    // 2
    const numeros = [4, 7, 10, 13, 22];
    let pares = 0;
    for (const n of numeros) {
        if (n % 2 === 0) pares++;
    }
    console.log("Pares:", pares); // 3

    // 3
    let lanzamientos = 0;
    let dado = 0;
    while (dado !== 6) {
        dado = Math.floor(Math.random() * 6) + 1;
        lanzamientos++;
    }
    console.log(`Salió 6 después de ${lanzamientos} lanzamientos`);

    // 4
    const inventario = { cafe: 10, te: 0, azucar: 5 };
    for (const producto in inventario) {
        if (inventario[producto] === 0) console.log("Sin stock:", producto);
    }
}
