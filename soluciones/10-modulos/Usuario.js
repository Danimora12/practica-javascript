// SOLUCIÓN 10-modulos · ejercicio 2: export default de una clase

export default class Usuario {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }

    presentarse() {
        return `${this.nombre} <${this.email}>`;
    }
}
