"use strict"

const datos = [];


// query selector para generar contenedores dinamicamente
const eventList = document.querySelector("#lineatemporal");
const form = document.querySelector("form")


// funcion para generar eventos y añadirlos dinamicamente al html
const generateEvents = (data) => {
    //ordeno los eventos cronológicamente
   // data.eventos.push(dataUser);
    data.eventos.sort((a, b) => a.year - b.year);
    

    data.eventos.forEach((suceso) => {
      // creo una lista en el que guardo cada suceso
      const newEventList = document.createElement('li');
      // añado clases para CSS
      newEventList.classList.add("orderedlist");
      // creo tags HTML para cada suceso
      const eventoHTML = `
          <div>
              <time> ${suceso.year} : ${suceso.title} </time>
              <img src=${suceso.image} alt="image" height="150" width="150" />
              <p>${suceso.text}</p> 
             </div>
        </li>
      `;
      //los añado al HTML
      newEventList.innerHTML = eventoHTML;
      eventList.appendChild(newEventList);
  });
};



// fetch de nuestros datos
async function  main(){
  const resp = await fetch("data/data.json")
  const datos =  await resp.json()
  
  generateEvents(datos);

}

main()


// TENGO QUE AÑADIR TRY CATCH



//const dataUser = Array.from(document.querySelectorAll('#formulario input')).reduce((acc, input) => ({...acc,[input.id]: input.value}),{});

const manejadoraFormSubmit = (event) => {
  event.preventDefault();
  // leer los datos del formulario
  const dataUser = {
    year: document.getElementById("year").value,
    title: document.getElementById("title").value,
    image: document.getElementById("image").value,
    text: document.getElementById("text").value
  }
  // crear el objeto
  
  // añadirlo a array datos
  datos.eventos.push(dataUser);
  
  // llamar 
  generateEvents(datos);
  
}

form.addEventListener("submit", manejadoraFormSubmit);
