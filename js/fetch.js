"use strict"
// query selector para generar contenedores dinamicamente
const eventList = document.querySelector("#lineatemporal");



// funcion para generar eventos y añadirlos dinamicamente al html
const generateEvents = (data) => {
    //ordeno los eventos cronológicamente
    data.eventos.sort((a, b) => a.year - b.year);

    data.eventos.forEach((event) => {
      // creo un section en el que guardo cada event
      const newEventList = document.createElement('li');
      // añado  clases
      // en teoría esto no es necesario...?
      // o sí, tengo que mirar, porque va añadiendo linea por linea
      newEventList.classList.add("orderedlist");
      // creo tags HTML para cada event
      //aquí puedo hacer poner exactamente como quiera mi estructura html
      //muy util para mirar CSS por ahi que suelen ir con divs
      const eventoHTML = `
          <div>
            <time> ${event.year} : ${event.title} 
            <img src=${event.image} alt="image" height="150" width="150" />
            ${event.text} </time>
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


 

(function () {
  

  // define variables
  let items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (let i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();
