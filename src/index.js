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
 

// call the API
const  getData = async () => {
  
  loading.style.display = "block";
  bigDiv.innerHTML = '';
    let searchValue = search.value;
    let seatch = searchValue.toLowerCase();
    try {
    const  response  = await axios.get('https://openlibrary.org/search.json?q='+ seatch|| "https://openlibrary.org/search/authors.json?q="+seatch)
    
        for (let i=1; i<50; i++) {

          // add the container
            let divTwo = document.createElement('div');
            bigDiv.append(divTwo);
            divTwo.setAttribute("class","divTwo");
            divTwo.style.backgroundColor = 'white';
            let container = document.createElement('div');
            divTwo.append(container);
            container.setAttribute('class','container')

            loading.style.display = "none";

            // add books covers
             let cover = document.createElement('img');
             let coverApi = response.data.docs[i]?.cover_i;
             cover.setAttribute('id','img-cover');
             cover.setAttribute('src', 'https://covers.openlibrary.org/b/id/'+ coverApi +"-M.jpg");
            if( coverApi=== undefined) {
               cover.src = 'https://via.placeholder.com/128x192.png?text=No+Cover';
             }
             container.append(cover);

            //add books titles and authors
            let titleContainer = document.createElement('div');
            container.append(titleContainer);
            titleContainer.setAttribute('class','title-container')
            let title = document.createElement('h2');
            title.innerText = response.data.docs[i]?.title;
            titleContainer.append(title);
            title.setAttribute('class','title');
            if (response.data.docs[i]?.title == undefined) {
              return alert("Unfortunately the search did not produce any results, try with fantasy or romance.");
             }
            let authors = document.createElement('h3');
            let authorsApi = response.data.docs[i]?.author_name;
            authors.innerText = authorsApi;
            titleContainer.append(authors);
            authors.setAttribute('class','author');
            authors.setAttribute('id','author');
            if (authorsApi == undefined) {
             authors.innerText = "Unknown author";
            }
           
            
            // add description button
            let btnNew = document.createElement('button');
            titleContainer.append(btnNew);
            btnNew.setAttribute("class","btn btn-info");
            btnNew.setAttribute("id","buttonNew");
            btnNew.textContent = "Read the description";
            btnNew.addEventListener('click', () => {
              btnNew.style.display = 'none';
              cover.style.marginTop = "auto";
              cover.style.marginBottom = "auto";
            })
            

            // add books descriptions
            btnNew.onclick = async function () {
              const dscrResp = await axios.get ("https://openlibrary.org"+response.data.docs[i].key+".json")
              .then(function(dscrResp) {
                let description = document.createElement('p');
                description.setAttribute("class", "description");
                description.innerHTML = response.data.docs[i]?.description;
                if(response.data.docs[i]?.description === undefined) {
                 description.innerHTML = "There is no description available for this book";
              }
                authors.append(description);
            
             
          
          // add button for hiding the description 
             let backButton = document.createElement('button');
             description.append(backButton);
             backButton.setAttribute("class","btn btn-info");
             backButton.setAttribute("id","backButton");
             backButton.textContent = "Hide description";
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
}
  
getBtn.addEventListener("click",getData);
export default getData;
