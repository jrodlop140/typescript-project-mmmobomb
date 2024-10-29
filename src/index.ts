//TODO: Implementación de todo el código TypeScript aquí

import IGato from "./interfaces/IGato";
import Gato from "./models/Gato";

//Ejecución de funciones 
resaltarOpcionMenu();
mostrarDivisor();
mostrarPrimerElemento();

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

// Función para obtener los datos de la API
async function getDataGato(): Promise<Gato[]> {
    try {
        const response = await fetch("https://catfact.ninja/breeds?limit=98");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Define el tipo de respuesta
        const datos = await response.json() as { data: IGato[] };

        // Mapeamos los datos JSON a instancias de la clase Gato
        return datos.data.map((gato: IGato) => new Gato(
            gato.breed,
            gato.country,
            gato.origin,
            gato.coat,
            gato.pattern,
        ));
    } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
        return []; // Devolvemos un array vacío en caso de error
    }
}

// Función para mostrar el primer elemento en la tarjeta
function mostrarPrimerElemento() {
    const btnBuscar = document.getElementById("btn-search") as HTMLButtonElement;
    const searchInput = document.getElementById("input-search") as HTMLInputElement;
    const card = document.getElementById("card") as HTMLDivElement;
    const cardTitle = document.getElementById("card-title") as HTMLHeadingElement;
    const liData1 = document.getElementById("li-data1") as HTMLLIElement;
    const liData2 = document.getElementById("li-data2") as HTMLLIElement;

    btnBuscar.addEventListener("click", async () => {
        try {
            const gatos = await getDataGato();
            const criterio = searchInput.value.toLowerCase();

            // Filtramos el primer gato que coincida con el criterio de búsqueda
            const gatoFiltrado = gatos.find(gato =>
                gato.country.toLowerCase().includes(criterio)
            );

            // Comprobamos si encontramos un gato que coincida
            if (gatoFiltrado) {
                // Actualizamos el contenido de la tarjeta
                cardTitle.textContent = gatoFiltrado.breed;
                liData1.textContent = `País: ${gatoFiltrado.country}`;
                liData2.textContent = `Origen: ${gatoFiltrado.origin}`;

                // Mostramos la tarjeta
                card.classList.remove("d-none");
            } else {
                alert("No se encontraron gatos que coincidan con el criterio de búsqueda.");
                // Ocultamos la tarjeta si no se encuentra un gato
                card.classList.add("d-none");
            }
        } catch (error) {
            console.error("Error al obtener los datos de la API:", error);
        }
    });
}



