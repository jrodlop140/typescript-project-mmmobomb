//TODO: Implementación de todo el código TypeScript aquí

import IGato from "./interfaces/IGato";
import Gato from "./models/Gato";


resaltarOpcionMenu();
mostrarDivisor();

/**
 * Punto 1: Resaltar opción del menú al hacer clic

 */

/**
 * Función que resalta las opciones del menú al clicar en las mismas
 */
function resaltarOpcionMenu() {
    //Obtenemos los dos elementos buscador y favoritos
    let buscador = document.getElementById("a-search") as HTMLAnchorElement;
    let favoritos = document.getElementById("a-data-storage") as HTMLAnchorElement;

    //Función para manejar el cambio de clase activa
    let itemMenuActivo = (event: Event) => {
        // Primero eliminamos la clase 'active' de cualquier elemento del menú que la tenga
        document.querySelectorAll(".nav-link").forEach((value) => {
            value.classList.remove("active");
        });

        // Agregamos la clase 'active' al elemento que fue clicado
        let elementoClicado = event.currentTarget as HTMLAnchorElement;
        elementoClicado.classList.add("active");
    };

    // Asignamos los eventos de clic a los elementos del menú
    buscador.addEventListener("click", itemMenuActivo);
    favoritos.addEventListener("click", itemMenuActivo);
}

/**
 * Función que muestra el divisor div-data-storage y oculta el divisor div-search al pulsar sobre la pestaña de favoritos, 
 * enseña el divisor div-search y oculta el divisor div-data-storage al pulsar sobre la ventana de buscador.
 */

function mostrarDivisor() {
    //Obtenemos los elementos necesarios
    let buscador = document.getElementById("a-search") as HTMLAnchorElement;
    let favoritos = document.getElementById("a-data-storage") as HTMLAnchorElement;
    let divSearch = document.getElementById("div-search") as HTMLDivElement;
    let divDataStorage = document.getElementById("div-data-storage") as HTMLDivElement;

    //Añadimos evento de click a favoritos para que aprezca el divisor de Data Storage al clicar sobre el mismo
    favoritos.addEventListener("click", (ev: Event) => {
        //Eliminamos d-none para que se muestra el divisor DataStorage
        divDataStorage.classList.remove("d-none");
        //Añadimos d-none para que se culte el divisor search
        divSearch.classList.add("d-none");
    })

    //Añadimos evento de click al buscador para que aprezca el divisor de Search al clicar sobre el mismo
    buscador.addEventListener("click", (ev: Event) => {
        //Eliminamos d-none para que se muestra el divisor Search
        divSearch.classList.remove("d-none");
        //Añadimos d-none para que se oculte el divisor Data Storage
        divDataStorage.classList.add("d-none");
    })
}





