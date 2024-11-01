//TODO: Implementación de todo el código TypeScript aquí

import IGato from "./interfaces/IGato";
import Gato from "./models/Gato";

// Variables para control de índice y elementos del DOM
let indiceActual = 0;
const siguienteElemento = document.getElementById("next-element") as HTMLAnchorElement;
const anteriorElemento = document.getElementById("previous-element") as HTMLAnchorElement;
const btnBuscar = document.getElementById("btn-search") as HTMLButtonElement;
const searchInput = document.getElementById("input-search") as HTMLInputElement;
const card = document.getElementById("card") as HTMLDivElement;
const cardTitle = document.getElementById("card-title") as HTMLHeadingElement;
const liData1 = document.getElementById("li-data1") as HTMLLIElement;
const liData2 = document.getElementById("li-data2") as HTMLLIElement;
const spanErrores = document.getElementById("span-errores") as HTMLSpanElement;
const divisorErrores = document.getElementById("mb-3") as HTMLDivElement;
let buscador = document.getElementById("a-search") as HTMLAnchorElement;
let favoritos = document.getElementById("a-data-storage") as HTMLAnchorElement;
let divSearch = document.getElementById("div-search") as HTMLDivElement;
let divDataStorage = document.getElementById("div-data-storage") as HTMLDivElement;
let starFav = document.getElementById("star-fav") as HTMLElement;

//Ejecución de funciones 
resaltarOpcionMenu();
mostrarDivisor();
mostrarPrimerElemento();
eventosPaginacion();
estadoEstrella();



/**
 * Punto 1: Resaltar opción del menú al hacer clic

 */

/**
 * Función que resalta las opciones del menú al clicar en las mismas
 */
function resaltarOpcionMenu() {
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
    //Añadimos evento de click a favoritos para que aprezca el divisor de Data Storage al clicar sobre el mismo
    favoritos.addEventListener("click", (ev: Event) => {
        //Eliminamos d-none para que se muestra el divisor DataStorage
        divDataStorage.classList.remove("d-none");
        //Añadimos d-none para que se culte el divisor search
        divSearch.classList.add("d-none");
        // Carga y muestra la tabla de favoritos al hacer clic en "Favoritos"
        mostrarTablaFavoritos();
    })

    //Añadimos evento de click al buscador para que aprezca el divisor de Search al clicar sobre el mismo
    buscador.addEventListener("click", (ev: Event) => {
        //Eliminamos d-none para que se muestra el divisor Search
        divSearch.classList.remove("d-none");
        //Añadimos d-none para que se oculte el divisor Data Storage
        divDataStorage.classList.add("d-none");
        //Ocultamos la tarjeta de búsqueda al pulsar sobre Buscador
        card.classList.add("d-none");
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
        const gatos = datos.data.map((gato: IGato) => new Gato(
            gato.breed,
            gato.country,
            gato.origin,
            gato.coat,
            gato.pattern,
        ));
        //Guardamos en el session storage
        sessionStorage.setItem("gatos", JSON.stringify(gatos));
        return gatos;
    } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
        return []; // Devolvemos un array vacío en caso de error
    }
}

// Función para mostrar el primer elemento en la tarjeta
function mostrarPrimerElemento() {

    btnBuscar.addEventListener("click", async () => {
        try {
            const gatos = await getDataGato();
            const criterio = searchInput.value.toLowerCase();
            if (searchInput.value != "") {
                //Al hacer clic ponemos el texto del span de errores en vació para quitar el mensaje de error al buscar por texto
                spanErrores.textContent = "";
                // Filtramos el primer gato que coincida con el criterio de búsqueda
                const gatoFiltrado = gatos.find((gato, index) => {
                    if (gato.country.toLowerCase().includes(criterio)) {
                        indiceActual = index; // Actualizamos el índice al del gato encontrado
                        return true;
                    }
                    return false;
                });

                // Comprobamos si encontramos un gato que coincida
                if (gatoFiltrado) {
                    //Llamamo a la función mostrar elemento
                    mostrarElemento(indiceActual, gatos);
                } else {
                    alert("No se encontraron gatos que coincidan con el criterio de búsqueda.");
                    // Ocultamos la tarjeta si no se encuentra un gato
                    card.classList.add("d-none");
                }
            } else {
                //En el caso de que el input de búsqueda este vacío salta un mensaje de error
                spanErrores.textContent = "Debes de indicar un texto a buscar";
                // Cambiamos el estilo del contenido de span-errores a rojo
                spanErrores.style.color = "red";
                //Aañadimos al divisor de errores el span para que apareza el mensaje
                divisorErrores.appendChild(spanErrores);
            }
        } catch (error) {
            console.error("Error al obtener los datos de la API:", error);
        }
    });
}

/**
 * Función para mostrar un gato en la tarjeta. Esta función actualiza los elementos del DOM con la raza, el país y el origen del gato
 * correspondiente al índice dado. Si el índice está fuera de los límites del arreglo, 
 * no se realiza ninguna acción.
 * 
 * @param indice El indíce del gato que se va a mostrar
 * @param gatos Array de Gato sobre el que añadiremos que contiene diferente información de los gatos
 *  
 */

function mostrarElemento(indice: number, gatos: Gato[]) {
    const gato = gatos[indice];
    cardTitle.textContent = gato.breed;
    liData1.textContent = `País: ${gato.country}`;
    liData2.textContent = `Origen: ${gato.origin}`;
    card.classList.remove("d-none");

    // Inicializa la estrella para el gato actual
    inicializarEstadoEstrella(gato);
}

/**
 * Función que muestra la tarjeta al pulsar en anterior o en siguiente
 */
function eventosPaginacion() {
    siguienteElemento.addEventListener("click", async () => {
        const gatos = await getDataGato();
        indiceActual++;
        if (indiceActual >= gatos.length) {
            indiceActual = 0; // Volver al inicio
        }
        mostrarElemento(indiceActual, gatos);
    });

    anteriorElemento.addEventListener("click", async () => {
        const gatos = await getDataGato();
        indiceActual--;
        if (indiceActual < 0) {
            indiceActual = gatos.length - 1; // Ir al final
        }
        mostrarElemento(indiceActual, gatos);
    });
}

/**
 * Función para guardar los favoritos en localStorage
 * 
 * @param favoritos 
 */
function guardarFavoritos(favoritos: Gato[]) {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

/**
 * Obtiene y carga los favoritos desde localStorage
 * 
 * @returns Gato[] Devuelve un array de objetos de tipo gato o vacio si no hay favoritos
 */

function cargarFavoritos(): Gato[] {
    const favoritosJSON = localStorage.getItem("favoritos");
    if (favoritosJSON) {
        return JSON.parse(favoritosJSON);
    } else {
        return [];
    }
}

/**
 * Función para verificar si un gato está en favoritos
 * 
 * @param gato El objeto gato que se desea comprobar
 * 
 * @returns comprobarFavorito Devuelve true en caso de que el gato este en favoritos y false en caso de que no lo esté
 */


function esFavorito(gato: Gato): boolean {
    const favoritos = cargarFavoritos();

    //Comprueba si algún gato cargado desde local storage coincide con el gato dado
    const comprobarFavorito = favoritos.some(fav => fav.breed == gato.breed && fav.country == gato.country);
    return comprobarFavorito
}

/**
 * Modificación de estadoEstrella para controlar el almacenamiento en favoritos
 */

function estadoEstrella() {
    starFav.addEventListener("mouseover", () => {
        starFav.classList.remove("bi-star");
        starFav.classList.add("bi-star-fill");
    });

    starFav.addEventListener("mouseout", () => {
        if (!starFav.classList.contains("clicked")) {
            starFav.classList.remove("bi-star-fill");
            starFav.classList.add("bi-star");
        }
    });

    starFav.addEventListener("click", async () => {
        const gatos = await getDataGato();
        const gatoActual = gatos[indiceActual];
        let favoritos = cargarFavoritos();

        // Verifica si el gato ya es favorito
        if (esFavorito(gatoActual)) {
            // Elimina de favoritos mediante una función callback de favoritos que comprueba si se cumplen las condiciones
            //dadas y en el caso de coincidir el breed y country del gato actual con el de favoritos filtra y se elimina de la nueva lista
            favoritos = favoritos.filter(
                fav => !(fav.breed == gatoActual.breed && fav.country == gatoActual.country)
            );
            starFav.classList.remove("clicked", "bi-star-fill");
            starFav.classList.add("bi-star");
        } else {
            // Agrega el gato a favoritos
            favoritos.push(gatoActual);
            starFav.classList.add("clicked", "bi-star-fill");
            starFav.classList.remove("bi-star");
        }

        guardarFavoritos(favoritos);

        mostrarTablaFavoritos();
    });
}

/**
 * Función para inicializar el estado de la estrella según si el gato es favorito o no
 * 
 * @param gato  Objeto gato que se desea comprobar
 */

function inicializarEstadoEstrella(gato: Gato) {
    if (esFavorito(gato)) {
        starFav.classList.add("clicked", "bi-star-fill");
        starFav.classList.remove("bi-star");
    } else {
        starFav.classList.remove("clicked", "bi-star-fill");
        starFav.classList.add("bi-star");
    }
}

/**
 * Función para mostrar la tabla con los elementos favoritos almacenados.
 * Carga los favoritos desde localStorage y genera las filas de la tabla.
 */
function mostrarTablaFavoritos() {
 //Nos creamos una constante con el tbody de nuestro html y lo vaciamos 
 const tbody = document.querySelector("tbody") as HTMLTableSectionElement;
 //Vaciamos el tbody para que no aparezca
 tbody.innerHTML = "";
 //Cargamos los elementos favoritos para poder meterlos en la tabla posteriormente
 const elementosFavoritos = cargarFavoritos();
 //Nos creamos un elemento tr
 let row = document.createElement("tr");
 //Recorremos los elementos favoritos y los metemos en los td de tr
    elementosFavoritos.forEach((gato, index) => {
        row = document.createElement("tr");
        row.innerHTML = `<th scope="row">${index + 1}</th>
                  <td>${gato.breed}</td>
                  <td>${gato.country}</td>
                  <td>${gato.origin}</td>
                  <td><i class="bi bi-trash trash-icon"></i></td>`; //Metemos trash-icon el cual nos permite devolver el i de trash luego
            //Metemos en el tbody nuestro tr con la información de gatos
            tbody.appendChild(row);

            // Selección del ícono de la papelera en cada fila
            const trashIcon = row.querySelector(".trash-icon") as HTMLElement;
        // Controlamos el estado de la papelera al poner el ratón encima y al sacarlo
        trashIcon.addEventListener("mouseover", () => {
            trashIcon.classList.add("bi-trash-fill");
            trashIcon.classList.remove("bi-trash");
        });
        trashIcon.addEventListener("mouseout", () => {
            trashIcon.classList.add("bi-trash");
            trashIcon.classList.remove("bi-trash-fill");
        });
        
        // Evento para eliminar un favorito al hacer clic en la papelera
        trashIcon.addEventListener("click", () => {
            eliminarFavoritos(index);
            mostrarTablaFavoritos(); // Actualiza la tabla después de eliminar
        })
    })
}

/** 
 * Función que elimina los gatos de favoritos y guarda una nueva lista con los gatos actualizados 
 * @param index El índice del gato a eliminar de favoritos
 */
function eliminarFavoritos(index: number) {
    // Llamamos a la función cargarFavoritos() para cargar los gatos
    let favoritos = cargarFavoritos();

    // Elimina elementos de un array en el índice que se le pase y borra solo 1
    favoritos.splice(index, 1);

    // Guardamos los favoritos
    guardarFavoritos(favoritos);
}







