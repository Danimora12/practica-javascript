/**
 * SOLUCIONES · 03-operadores
 */

console.log("===== 01-aritmeticos-y-asignacion =====");
{
    // 1
    const minutosTotales = 125;
    const horas = Math.floor(minutosTotales / 60);
    const minutos = minutosTotales % 60;
    console.log(`${horas} horas y ${minutos} minutos`);

    // 2
    let total = 0;
    total += 2500;
    total += 2500;
    total += 2500;
    total *= 1.13;
    console.log("Total con IVA:", total); // 8475

    // 3
    let n = 3;
    console.log(n++ + ++n); // 8 → n++ devuelve 3 (n pasa a 4), ++n sube a 5 y devuelve 5 → 3 + 5
}

console.log("===== 02-comparacion-e-igualdad =====");
{
    // 1
    const esMayorDeEdad = (edad) => edad >= 18;
    console.log(esMayorDeEdad(17), esMayorDeEdad(18));

    // 2
    for (const v of ["", " ", 0, "0", [], null]) {
        console.log(JSON.stringify(v), v ? "truthy" : "falsy");
    }
    // "" falsy | " " truthy | 0 falsy | "0" truthy | [] truthy | null falsy

    // 3
    // "10" < "9" es true porque compara texto carácter por carácter: "1" < "9".
    console.log(Number("10") < Number("9")); // false ✅
}

console.log("===== 03-logicos-y-condicionales =====");
{
    // 1
    const puedeComprar = (edad, saldo, precio) => edad >= 18 && saldo >= precio;
    console.log(puedeComprar(20, 10000, 5000), puedeComprar(16, 10000, 5000));

    // 2
    const totalCompra = 25000;
    const envio = totalCompra > 20000 ? "Envío gratis" : "Envío ₡2000";
    console.log(envio);

    // 3
    const config = { reintentos: 0 };
    const reintentos = config.reintentos ?? 3;
    console.log(reintentos); // 0 ✅ (con || daría 3)

    // 4
    const pedido = { cliente: null };
    console.log(pedido.cliente?.nombre ?? "Cliente desconocido");
}
