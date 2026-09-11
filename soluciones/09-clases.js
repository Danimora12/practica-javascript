/**
 * SOLUCIONES · 09-clases
 */

console.log("===== 01-clases =====");
{
    // 1 y 3
    class Tarea {
        constructor(texto, completada = false) {
            this.texto = texto;
            this.completada = completada;
        }
        completar() {
            this.completada = true;
            return this;
        }
        toString() {
            return `${this.completada ? "✅" : "⬜"} ${this.texto}`;
        }
        static desdeTexto(texto) {
            return new Tarea(texto.trim());
        }
    }
    const t1 = new Tarea("Estudiar clases");
    const t2 = Tarea.desdeTexto("  Practicar herencia ");
    t1.completar();
    console.log(String(t1), "|", `${t2}`);

    // 2
    class Temporizador {
        #segundos = 0;
        tick() {
            this.#segundos++;
        }
        get tiempo() {
            const mm = String(Math.floor(this.#segundos / 60)).padStart(2, "0");
            const ss = String(this.#segundos % 60).padStart(2, "0");
            return `${mm}:${ss}`;
        }
    }
    const temp = new Temporizador();
    for (let i = 0; i < 75; i++) temp.tick();
    console.log(temp.tiempo); // "01:15"
}

console.log("===== 02-herencia-y-prototipos =====");
{
    // 1
    class Vehiculo {
        constructor(marca, modelo) {
            this.marca = marca;
            this.modelo = modelo;
        }
        describir() {
            return `${this.marca} ${this.modelo}`;
        }
    }
    class Moto extends Vehiculo {
        constructor(marca, modelo, cilindrada) {
            super(marca, modelo);
            this.cilindrada = cilindrada;
        }
        describir() {
            return `${super.describir()} (${this.cilindrada} cc)`;
        }
    }
    const moto = new Moto("Honda", "CB190", 190);
    console.log(moto.describir());

    // 2
    class Figura {
        area() {
            return 0;
        }
    }
    class Circulo extends Figura {
        constructor(radio) {
            super();
            this.radio = radio;
        }
        area() {
            return Math.PI * this.radio ** 2;
        }
    }
    class Rectangulo extends Figura {
        constructor(base, altura) {
            super();
            this.base = base;
            this.altura = altura;
        }
        area() {
            return this.base * this.altura;
        }
    }
    const figuras = [new Circulo(1), new Rectangulo(2, 3), new Figura()];
    const totalAreas = figuras.reduce((acc, f) => acc + f.area(), 0);
    console.log("Suma de áreas:", totalAreas.toFixed(2)); // 9.14

    // 3
    console.log(Object.hasOwn(moto, "cilindrada")); // true  → propia
    console.log(Object.hasOwn(moto, "marca"));      // true  → propia (la asigna el constructor del padre)
    console.log(Object.hasOwn(moto, "describir"));  // false → heredada del prototipo
}
