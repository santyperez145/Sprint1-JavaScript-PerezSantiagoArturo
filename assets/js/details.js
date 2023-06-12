let card = document.getElementById("details-div"); 

const params = new URLSearchParams(location.search)

const id = params.get('id')

const eventFinded = data.events.find(event => event.id == id)

card.innerHTML = `<div class="card" style="width: 30rem;">
<img src="${eventFinded.image}" class="card-img-top" alt="${eventFinded.name}">
  <div class="card-body">
    <h5 class="card-title">${eventFinded.name}</h5>
    <p class="card-text">${eventFinded.description}</p>
    <h6>Category: ${eventFinded.category}</h6>
    <h6>Place: ${eventFinded.place}</h6>
    <h6>Capacity: ${eventFinded.capacity}</h6>
    <h6>Date: ${eventFinded.date}</h6>
    <h5>Price: $${eventFinded.price}</h5>
  </div>
</div>`