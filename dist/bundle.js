/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

//TODO: Implementación de todo el código TypeScript aquí
/**
 * Punto 1: Resaltar opción del menú al hacer clic

 */
//Obtenemos los dos elementos buscador y favoritos
let buscador = document.getElementById("a-search");
let favoritos = document.getElementById("a-data-storage");
//Función para manejar el cambio de clase activa
let itemMenuActivo = (event) => {
    // Primero eliminamos la clase 'active' de cualquier elemento del menú que la tenga
    document.querySelectorAll(".nav-link").forEach((value) => {
        value.classList.remove("active");
    });
    // Agregamos la clase 'active' al elemento que fue clicado
    let elementoClicado = event.currentTarget;
    elementoClicado.classList.add("active");
};
// Asignamos los eventos de clic a los elementos del menú
buscador.addEventListener("click", itemMenuActivo);
favoritos.addEventListener("click", itemMenuActivo);

/******/ })()
;
//# sourceMappingURL=bundle.js.map