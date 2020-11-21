let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //validates pokemon, then pushes to pokemonList
  function add(pokemon){
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ){
      pokemonList.push(pokemon);
    } else {
      console.log("Pokemon is not correct");
    }
  }

  function getAll(){
    return pokemonList;
  }

  //creates button with event listener (DOM manipulation) for "showDetails" function
  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function(event){
      showDetails(pokemon);
    })
  }

  //fetches the promise from API, validates in "add" function, then pushes to pokemonList
  function loadList() {
    return fetch(apiUrl).then(function (response){
      //returns parsed data
      return response.json();
      //callback for second promise, which gets the desired data
    }).then(function (json) {
      json.results.forEach(function (item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        //loads all pokemon details in console
        console.log(pokemon);
      });
    }).catch(function (e){
      console.error(e);
    })
  }

  //fetches specific details of pokemon. When addListItem button is clicked
  // it logs that pokemon in the console (via showDetails function)
  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e){
      console.error(e);
    });
  }

  //logs pokemon in console when button clicked (addListItem function)
  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      console.log(pokemon);
    });
  }

  //external access to functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();

//calls pokemonList which is updated from loadList, in order to..
pokemonRepository.loadList().then(function() {
  //..request each pokemon to create button in addListItem
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
