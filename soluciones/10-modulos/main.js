/**
 * SOLUCIONES · 10-modulos
 * Ejecutar: Live Server (navegador) o `node main.js` dentro de esta carpeta.
 */

// 1
import { esEmail, esTelefonoCR } from "./validaciones.js";
// 2 → el default se importa con el nombre que queramos
import Persona from "./Usuario.js";
// 3 → alias para un export nombrado de otro archivo
import { formatearMoneda as aColones } from "../../10-modulos/formato.js";

console.log(esEmail("d@correo.com"), esEmail("correo-invalido"));  // true false
console.log(esTelefonoCR("8888-8888"), esTelefonoCR("1234"));      // true false

const persona = new Persona("Daniel", "d@correo.com");
console.log(persona.presentarse());

console.log(aColones(25000));
