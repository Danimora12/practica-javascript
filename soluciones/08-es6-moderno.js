/**
 * SOLUCIONES · 08-es6-moderno
 */

console.log("===== 01-destructuring =====");
{
    // 1
    const pelicula = { titulo: "Coco", anio: 2017, director: { nombre: "Lee Unkrich" } };
    const { titulo, anio: estreno, director: { nombre: nombreDirector } } = pelicula;
    console.log(titulo, estreno, nombreDirector);

    // 2
    const puntajes = [98, 87, 75, 60];
    const [primero, segundo, ...resto] = puntajes;
    console.log(primero, segundo, resto);

    // 3
    function Perfil({ nombre, ciudad = "Desconocida", ...extra }) {
        return `${nombre} (${ciudad}) + ${Object.keys(extra).length} propiedades extra`;
    }
    console.log(Perfil({ nombre: "Daniel", ciudad: "Cartago", edad: 30, rol: "dev" }));
    console.log(Perfil({ nombre: "Ana" }));

    // 4
    function useStateFalso(inicial) {
        let valor = inicial;
        const setValor = (nuevo) => { valor = nuevo; };
        return [valor, setValor];
    }
    const [nombre, setNombre] = useStateFalso("Ana");
    console.log(nombre, setNombre);
}

console.log("===== 02-spread-y-rest =====");
{
    // 1
    const a = [1, 2];
    const b = [3, 4];
    console.log([0, ...a, ...b]);

    // 2
    const usuario = { nombre: "Ana", rol: "user" };
    const admin = { ...usuario, rol: "admin", permisos: ["todo"] };
    console.log(usuario, admin);

    // 3
    const unirTextos = (separador, ...textos) => textos.join(separador);
    console.log(unirTextos(" | ", "HTML", "CSS", "JS"));

    // 4
    const sesion = { id: 1, token: "abc123", nombre: "Daniel", email: "d@correo.com" };
    const { token, ...sinToken } = sesion;
    console.log(sinToken);
}

console.log("===== 03-shorthand-y-propiedades-computadas =====");
{
    // 1
    const titulo = "Nota";
    const contenido = "Repasar destructuring";
    const fecha = new Date();
    const nota = { titulo, contenido, fecha };
    console.log(nota);

    // 2
    const actualizarCampo = (objeto, campo, valor) => ({ ...objeto, [campo]: valor });
    console.log(actualizarCampo({ nombre: "", email: "" }, "email", "d@correo.com"));

    // 3
    const claves = ["rojo", "verde"];
    console.log(claves.reduce((acc, clave) => ({ ...acc, [clave]: 0 }), {}));

    // 4
    const persona = {
        nombre: "Daniel",
        apellido: "Mora",
        get nombreCompleto() {
            return `${this.nombre} ${this.apellido}`;
        },
    };
    console.log(persona.nombreCompleto);
}
