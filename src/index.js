import variable from "./styles/main.scss";
import logoFn from "./img/logo.png";
import favicon from "./img/favicon.ico";
import axios from "axios";

let getBtn = document.getElementById("btn1");
let search = document.getElementById("search");
let bigDiv =  document.getElementById("gridLibri");



// call the API
const  getData = async () => {
    let searchValue = search.value;
    const  response  = await axios.get('https://openlibrary.org/search.json?q='+searchValue.toLowerCase() || "https://openlibrary.org/search/authors.json?q="+searchValue.toLowerCase())
    .then (response => {
        for (let i=1; i<response.data.numFound; i++) {
          // add the container
            let divTwo = document.createElement('div');
            bigDiv.append(divTwo);
            divTwo.setAttribute("class","divTwo");
            divTwo.style.backgroundColor = 'white';
            let container = document.createElement('div');
            divTwo.append(container);
            container.setAttribute('class','container')
            
            // add books covers
            let cover = document.createElement('img');
            cover.setAttribute('id','img-cover');
            cover.setAttribute('src', 'https://covers.openlibrary.org/b/id/'+response.data.docs[i].cover_i+"-M.jpg");
            container.append(cover);

            //add books titles and authors
            let titleContainer = document.createElement('div');
            container.append(titleContainer);
            titleContainer.setAttribute('class','title-container')
            let title = document.createElement('h2');
            title.innerText = response.data.docs[i].title;
            titleContainer.append(title);
            title.setAttribute('class','title');
            let authors = document.createElement('h3');
            authors.innerText = response.data.docs[i].author_name;
            titleContainer.append(authors);
            authors.setAttribute('class','author');
            
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
            }),


            // add books descriptions
            
            btnNew.onclick = async function () {
              const dscrResp = await axios.get ("https://openlibrary.org/"+response.data.docs[i].key+".json")
              .then(function(dscrResp) {
                let description = document.createElement('p');
                description.setAttribute("class", "description");
                description.innerHTML = response.data.description;
                if(response.data.description === undefined) {
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
          .catch(function (error) {
        console.log(error)
            })
          }
          
        }
      })
      }


       

  
  
getBtn.addEventListener("click",getData,);
export default getData;
