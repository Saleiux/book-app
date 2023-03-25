

let getBtn = document.getElementById("btn1");
let search = document.getElementById("search");
let divOne =  document.getElementById("gridLibri");

// call the API
function getData () {
    let searchValue = search.value;
    axios ({
      method: "get",
      url: "https://openlibrary.org/subjects/'+searchValue.toLowerCase()"
    })
    //fetch('https://openlibrary.org/subjects/'+searchValue.toLowerCase()+ '.json')
    .then(response => response.json())
    .then (function (response) {
        for (var i=0; i<10; i++) {
          // add the container
            let divTwo = document.createElement('div');
            divOne.append(divTwo);
            divTwo.setAttribute("class","divTwo");
            divTwo.style.backgroundColor = 'white';
            let container = document.createElement('div');
            divTwo.append(container);
            container.setAttribute('class','container')
            
            // add books covers
            let cover = document.createElement('img');
            cover.setAttribute('id','img-cover');
            cover.setAttribute('src', 'https://covers.openlibrary.org/b/id/'+response.works[i].cover_id+'-M.jpg');
            container.append(cover);

            //add books titles and authors
            let titleContainer = document.createElement('div');
            container.append(titleContainer);
            titleContainer.setAttribute('class','title-container')
            let title = document.createElement('h2');
            title.innerText = response.works[i].title;
            titleContainer.append(title);
            title.setAttribute('class','title');
            let authors = document.createElement('h3');
            authors.innerText = response.works[i].authors[0].name;
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
            btnNew.onclick = function (e) {
              fetch('https://openlibrary.org'+response.works[i].key+'.json')
              .then(response=> response.json())
              .then(function(response) {
                let description = document.createElement('p');
                description.setAttribute("class", "description");
                description.innerHTML = response.description.value;
                if(response.description.value == undefined) {
                 description.innerHTML = response.description;
               
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
        alert("You can try to write fantasy on the search box");    
            })
        }
      }
      })
  }

  
  
getBtn.addEventListener("click",getData);
  
 



export default getData;
