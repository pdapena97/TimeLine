"use strict"
// query selector para generar contenedores dinamicamente
const eventList = document.querySelector("#lineatemporal");

// Almaceno los datos del USER
const dataUser = Array.from(document.querySelectorAll('#formulario input')).reduce((acc, input) => ({...acc,[input.id]: input.value}),{});

// funcion para generar eventos y añadirlos dinamicamente al html
const generateEvents = (data) => {
    //ordeno los eventos cronológicamente
    data.eventos.push(dataUser);
    data.eventos.sort((a, b) => a.year - b.year);
    

    data.eventos.forEach((suceso) => {
      // creo un section en el que guardo cada suceso
      const newEventList = document.createElement('li');
      // añado  clases
      // en teoría esto no es necesario...?
      // o sí, tengo que mirar, porque va añadiendo linea por linea
      newEventList.classList.add("orderedlist");
      // creo tags HTML para cada suceso
      //aquí puedo hacer poner exactamente como quiera mi estructura html
      //muy util para mirar CSS por ahi que suelen ir con divs
      const eventoHTML = `
          <div>
              <time> ${suceso.year} : ${suceso.title} </time>
              <img src=${suceso.image} alt="image" height="150" width="150" />
              <p>${suceso.text}<p> 
             </div>
        </li>
      `;
      //los añado al HTML
      newEventList.innerHTML = eventoHTML;
      eventList.appendChild(newEventList);
  });
};


//fetch de nuestros datos
//Creo que no tiene sentido usar try y catch error en caso de que ocurra
//un error en la petición, ya que estoy pidiendo archivos en local
//vamos, que mi modulo JSON está en local.
//no uso try y catch para optimizar código.
//si estuviera pidiendo datos a una api sí que usaría await.. try.. catch
fetch("data/data.json")
.then(response => response.json())
.then(data => generateEvents(data))





/*
//ALMACENO LOS DATOS DEL USER
//const dataUser = Array.from(document.querySelectorAll('#formulario input')).reduce((acc, input) => ({...acc,[input.id]: input.value}),{});

const manejadoraFormSubmit = (event) => {
  event.preventDefault();

  const generateEvents = (data) => {
    //ordeno los eventos cronológicamente
    data.eventos.push(dataUser);
    data.eventos.sort((a, b) => a.year - b.year);
    

    data.eventos.forEach((suceso) => {
      // creo un section en el que guardo cada suceso
      const newEventList = document.createElement('li');
      // añado  clases
      // en teoría esto no es necesario...?
      // o sí, tengo que mirar, porque va añadiendo linea por linea
      newEventList.classList.add("orderedlist");
      // creo tags HTML para cada suceso
      //aquí puedo hacer poner exactamente como quiera mi estructura html
      //muy util para mirar CSS por ahi que suelen ir con divs
      const eventoHTML = `
          <div>
              <time> ${suceso.year} : ${suceso.title} </time>
              <img src=${suceso.image} alt="image" height="150" width="150" />
              <p>${suceso.text}<p> 
             </div>
        </li>
      `;
      //los añado al HTML
      newEventList.innerHTML = eventoHTML;
      eventList.appendChild(newEventList);
  });
};

}

form.addEventListener("submit", manejadoraFormSubmit);

*/