let card = document.getElementById("box-cards");
const checkboxesdiv = document.getElementById('search')

const categories = data.events.map(events => events.category)

const categoriesSinRepetidos = new Set(categories)

const arrayCategoriesSinRepetidos = Array.from(categoriesSinRepetidos)

pintarCheckbox(arrayCategoriesSinRepetidos, checkboxesdiv)




function crearCheck(category) {
  const div = document.createElement('DIV')
  div.classList.add('form-check')

  const input = document.createElement('INPUT')
  input.type = "checkbox"
  input.className = "form-check-input"
  input.value = category
  input.id = `${category}-check`
  input.name = "category"

  const label = document.createElement('LABEL')
  label.className = "form-check-label"
  label.setAttribute('for', `${category}-check`)
  label.textContent = category
  label.style = "cursor:pointer"

  div.appendChild(input)
  div.appendChild(label)

  return div
}


function pintarCheckbox(categories, elemento) {

  const fragment = document.createDocumentFragment()

  for (const category of categories) {
    const div = crearCheck(category)
    fragment.appendChild(div)
  }

  elemento.appendChild(fragment)
}

function createCards(event) {
  return `<div class="card" style="width: 16rem;">
          <img class="img-box" src="${event.image}" class="card-img-top" alt="${event.name}">
            <div class="card-body">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
              <h6>Date: ${event.date}</h6>
              <div class="price-div">
                <h5>$${event.price}</h5>
                <a href="../pages/details.html?id=${event.id}" class="btn btn-primary">More Details</a>
              </div>
            </div>
          </div>`;
}

function renderCards(events) {
  card.innerHTML = ''; 

  let template = "";
  for (let event of events) {
    template += createCards(event);
  }
  console.log(template);
  card.innerHTML = template;
}

const checkboxes = checkboxesdiv.querySelectorAll('input[type="checkbox"]');
let searchInput = document.getElementById("search-input");

function filterCards() {
  let selectedCategories = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedCategories.push(checkbox.labels[0].innerText);
    }
  });

  let searchQuery = searchInput.value.toLowerCase().trim();

  let filteredEvents = data.events.filter((event) => {
    let categoryNameMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category);
    let nameMatch = event.name.toLowerCase().includes(searchQuery);
    let descriptionMatch = event.description.toLowerCase().includes(searchQuery);
    return categoryNameMatch && (nameMatch || descriptionMatch);
  });

  //filtro por fechas
  let currentDate = new Date(data.currentDate);
  let pastEvents = filteredEvents.filter((event) => {
    let eventDate = new Date(event.date);
    return eventDate < currentDate;
  });

  renderCards(pastEvents);
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', filterCards);
});

searchInput.addEventListener('keyup', filterCards);

window.addEventListener('load', () => {
  console.log('Window loaded. Rendering all Past Events.');
  filterCards(); // Filtrar eventos al cargar la pagina//
});