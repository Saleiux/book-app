import variable from "./styles/main.scss";
import axios from "axios";
import Icon from './img/icon.png';
let _ = require('lodash');

let getBtn = document.getElementById("btn1");
let search = document.getElementById("search");
let bigDiv =  document.getElementById("gridLibri");
let loading = document.getElementById("loading");

// loading 
loading.style.display = "none"

 // Add the image
 const myIcon = new Image();
 myIcon.src = Icon;

 document.getElementById("boxContainer")
 boxContainer.appendChild(myIcon);

 myIcon.style.maxWidth = "100px";
 myIcon.style.border = "2px solid #0FD2E8";
 
// funzione create elemebt
function createElement (tagElement,classElement,textElement) {
  tagElement = document.createElement(tagElement);
  tagElement.classList.add(classElement);
  textElement = document.createTextNode(textElement);
  tagElement.appendChild(textElement);
  return tagElement;
}

// call the API
const  getData = async () => {
  
  loading.style.display = "block";
  bigDiv.innerHTML = '';
    let searchValue = search.value;
    let seatch = searchValue.toLowerCase();
    try {
    const  response  = await axios.get('https://openlibrary.org/search.json?q='+ seatch|| "https://openlibrary.org/search/authors.json?q="+seatch)
    if (response.data.numFound == 0) {
      alert("Unfortunately the search did not produce any results, try with fantasy or romance.");
      return;
    }
        for (let i=1; i<20; i++) {

          // add the container
            let divBook = createElement("div", "divBook","")
            bigDiv.append(divBook)
            divBook.style.backgroundColor = 'white';
            let bookData = createElement("div", "bookData","")
            divBook.append(bookData)

            loading.style.display = "none";

            // add books covers
             let cover = createElement ("img", "img-cover","")
             let coverApi = response.data.docs[i]?.cover_i;
             let coverImg = coverApi == undefined ? "https://via.placeholder.com/128x192.png?text=No+Cover" : "https://covers.openlibrary.org/b/id/"+ coverApi +"-M.jpg" 
             cover.setAttribute('src', coverImg);
             bookData.append(cover)

            //add books titles 
            let titleContainer = createElement ("div", "title-container","")
            bookData.append(titleContainer)
            let title = createElement ("h2", "title",response.data.docs[i]?.title)
            titleContainer.append(title)
            
            // add books authors
            let authorsApi = response.data.docs[i]?.author_name;
            let authors = createElement ("h3", "author",authorsApi)
            let authorText = authorsApi === undefined ? "Unknown author" : response.data.docs[i]?.author_name
            titleContainer.append(authors)
            authors.setAttribute('id','author');
          
            // add description button
            let btnNew = createElement("button", "buttonNew", "Read the description");
            titleContainer.append(btnNew)
            btnNew.addEventListener('click', () => {
              btnNew.style.display = 'none';
              cover.style.marginTop = "auto";
              cover.style.marginBottom = "auto";
            })
            
            // add books descriptions
            btnNew.onclick = async function () {
              const dscrResp = await axios.get ("https://openlibrary.org"+response.data.docs[i].key+".json")
              .then(function(dscrResp) {
                let description = createElement("p", "description","" )
                description.innerHTML = response.data.docs[i]?.description === undefined ? "There is no description available for this book" :  response.data.docs[i]?.description
                authors.append(description);
            
          // add button for hiding the description 
             let backButton = createElement("button", "backButton", "Hide description")
             description.append(backButton);
             backButton.addEventListener('click', () => {
               btnNew.style.display = 'block';
             })
             backButton.onclick = function (){
              if (description.style.display !== "none") {
                description.style.display = "none";
              } else {
                 description.style.display = "block";
               }
           }
        })
      }
      }
    } catch(error){
      alert(`Ops, something goes wrong, try again`);
    }
    
   finally {
      loading.style.display = 'none';
    }
}
  
getBtn.addEventListener("click",getData);
export default getData;
