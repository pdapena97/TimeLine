"use strict"

let datos = [];
const eventList = document.querySelector("#lineatemporal");
const form = document.querySelector("form");


// Función para generar eventos y añadirlos dinámicamente al HTML
const generateEvents = (data) => {

    datos = [];
    data.sort((a, b) => a.year - b.year);
    data.forEach((suceso) => {
      
      const newEventList = document.createElement('li');
    
      newEventList.classList.add("orderedlist");
      
      const eventoHTML = `
          <div>
              <time> ${suceso.year} : ${suceso.title} </time>
              <img src=${suceso.image} alt="image" height="150" width="150" />
              <p>${suceso.text}</p> 
             </div>
        </li>
      `;
     
      newEventList.innerHTML = eventoHTML;
      eventList.appendChild(newEventList);
  });
};



// Fetch de nuestros datos
async function main(){
  try {
    const response = await fetch("data/data.json")

    if (response.ok) {
      const datos =  await response.json()
      generateEvents(datos);

    } else {
      console.log("Hubo un error en la petición");
    }
  
  } catch (error) {
    console.log(error.message);
  }
}
main()





// Función para añadir datos del usuario   
const manejadoraFormSubmit = (ev) => {
  ev.preventDefault();

  const userYear = document.getElementById('year').value;
  const userTitle = document.getElementById('title').value;
  const userImage = document.getElementById('image').value;
  const userText = document.getElementById('text').value;

  const dataUser = {
    year: parseInt(userYear),
    title: userTitle,
    image: userImage,
    text: userText
  };
  datos.push(dataUser); 
  generateEvents(datos);
}

form.addEventListener("submit", manejadoraFormSubmit);
