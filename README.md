# Práctica JavaScript → React

Ruta de autoaprendizaje con ejemplos comentados y ejercicios. Cada archivo tiene:
explicación arriba, ejemplos ejecutables en medio y **ejercicios al final**
(soluciones en `soluciones/`).

## Cómo ejecutar

| Qué archivos | Cómo |
|---|---|
| Casi todos | Abre `index.html` en el navegador y elige el archivo en la barra lateral. La salida sale en pantalla y en DevTools (F12). |
| `10-modulos/` | Necesitan servidor: extensión **Live Server** de VS Code (clic derecho en `index.html` → *Open with Live Server*). O `node main.js` dentro de la carpeta. |
| `12-dom/` | Solo navegador (usan `document`). |
| Todo excepto `12-dom/` | También con Node: `node 07-arrays/03-map-filter-reduce.js` en la terminal de VS Code. |

Después de editar un archivo: guarda y presiona **↻ Recargar** en el runner.
Si creas un archivo nuevo, agrégalo a la lista `ARCHIVOS` dentro de `index.html`
o escribe su ruta en **Abrir ruta**.

## Orden sugerido

| Carpeta | Tema | Importancia para React |
|---|---|---|
| 01-tipos | variables, primitivos, objetos, arrays, funciones | base |
| 02-Dinamico | objetos dinámicos, factory, constructor, **valores vs referencias**, clonar | ⭐⭐⭐ |
| 03-operadores | aritméticos, `===`, truthy/falsy, `&&`, ternario, `??`, `?.` | ⭐⭐⭐ |
| 04-control-de-flujo | if/else, guard clauses, switch, bucles | ⭐⭐ |
| 05-strings | template literals, métodos de string, Math, Intl, Date | ⭐⭐ |
| 06-funciones | arrow functions, parámetros, closures, callbacks, this, errores | ⭐⭐⭐ |
| 07-arrays | agregar/eliminar, buscar, **map/filter/reduce**, ordenar, **inmutabilidad** | ⭐⭐⭐ |
| 08-es6-moderno | **destructuring**, spread/rest, propiedades computadas | ⭐⭐⭐ |
| 09-clases | clases, herencia, prototipos | ⭐ |
| 10-modulos | import / export | ⭐⭐⭐ |
| 11-asincronia | event loop, callbacks, promesas, **async/await**, **fetch** | ⭐⭐⭐ |
| 12-dom | seleccionar, eventos, crear elementos, mini app de tareas | ⭐⭐ |

## Método de estudio recomendado

1. Lee el encabezado del archivo y **predice** qué imprimirá cada `console.log` antes de ejecutar.
2. Ejecuta y compara. Modifica valores para romper cosas a propósito.
3. Resuelve los ejercicios **sin mirar** las soluciones. Crea tu propio archivo (`ejercicios-07.js`, por ejemplo).
4. Al terminar `12-dom/04-mini-app-tareas.js`, rehaz esa app en React con Vite.

Notas completas en la página **JavaScript** de Notion.
