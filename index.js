let card = document.getElementById("box-cards"); // Obtengo referencia al elemento con id "box-cards"

const checkboxesdiv = document.getElementById('search') // Obtengo referencia al elemento con id "search"

// Creo el array de categorias a partir de los eventos
const categories = data.events.map(events => events.category)

// elimino los duplicados del array de categorias
const categoriesSinRepetidos = new Set(categories)
// Convierto nuevamente a un array para tener disponible los metodos de array
const arrayCategoriesSinRepetidos = Array.from(categoriesSinRepetidos)
// Creo los checkboxes dinamicamente en función del array de categorias
pintarCheckbox(arrayCategoriesSinRepetidos, checkboxesdiv)

// Funcion para crear un checkbox con una categoria dada
function crearCheck(category) {
  const div = document.createElement('DIV') // Crear un div

  const input = document.createElement('INPUT') // Crear un input
  input.type = "checkbox"
  input.className = "form-check-input"
  input.value = category
  input.id = `${category}-check` // Asignar id al checkbox
  input.name = "category"

  const label = document.createElement('LABEL') // Crear un label
  label.className = "form-check-label"
  label.setAttribute('for', `${category}-check`) // Establezco el atributo "for" del label para asociarlo con el checkbox
  label.textContent = category

  div.appendChild(input) // Agrego el checkbox al div
  div.appendChild(label) // Agrego el label al div

  return div // Devuelve el div creado
}

// Funcion para agregar los checkboxes al DOM
function pintarCheckbox(categories, elemento) {
  const fragment = document.createDocumentFragment() // Crear un fragmento para agregar los checkboxes

  for (const category of categories) {
    const div = crearCheck(category) // Crear un checkbox para cada categoria
    fragment.appendChild(div) // Agregar el checkbox al fragmento
  }

  elemento.appendChild(fragment) // Agregar el fragmento al elemento especificado
}

// Funcion para crear el HTML de una tarjeta de evento
function createCards(event) {
  return `<div class="card" style="width: 16rem;">
          <img class="img-box" src="${event.image}" class="card-img-top" alt="${event.name}">
            <div class="card-body">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
              <h6>Date: ${event.date}</h6>
              <div class="price-div">
                <h5>$${event.price}</h5>
                <a href="./assets/pages/details.html?id=${event.id}" class="btn btn-primary">More Details</a>
              </div>
            </div>
          </div>`;
}

// renderizo las tarjetas de eventos en el div box-cards
function renderCards(events) {
  card.innerHTML = ''; 
  let template = "";
  for (let event of events) {
    template += createCards(event); // Creo el HTML de la tarjeta para cada evento
  }
  card.innerHTML = template; // Agrego el HTML de las tarjetas al elemento box-cards
}

const checkboxes = checkboxesdiv.querySelectorAll('input[type="checkbox"]'); // Defino todos los checkboxes
let searchInput = document.getElementById("search-input"); // Defino la barra de busqueda
// Funcion para filtrar los eventos segun las categorias seleccionadas y la busqueda
function filterCards() {
  let selectedCategories = []; //creo una lista vacia
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedCategories.push(checkbox.labels[0].innerText); // Obtiene la categoria asociada al checkbox seleccionado, y luego lo pusheo a la lista
    }
  });

  let searchQuery = searchInput.value.toLowerCase().trim();

  if (selectedCategories.length > 0 || searchQuery !== '') {
    let filteredEvents = data.events.filter((event) => {
    let categoryNameMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category);
    let nameMatch = event.name.toLowerCase().includes(searchQuery);
    let descriptionMatch = event.description.toLowerCase().includes(searchQuery);
    return categoryNameMatch && (nameMatch || descriptionMatch);
    });
    renderCards(filteredEvents); // Renderiza las tarjetas de los eventos filtrados
  } else {
    renderCards(data.events); // Si no selecciono categorias ni escribo en la barra de busqueda renderiza todos los eventos
  }
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', filterCards);
});

searchInput.addEventListener('keyup', filterCards);

// Agrega un escuchador de evento de carga de la ventana para renderizar todos los eventos al inicio
addEventListener('load', () => {
  console.log('Window loaded. Rendering all events.');
  renderCards(data.events);
});