let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //fetches the promise from API,
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
        //logs all pokemon details in console
        console.log(pokemon);
      });
    }).catch(function (e){
      console.error(e);
    })
  }

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

  //function to access pokemonList
  function getAll(){
    return pokemonList;
  }


  //creates button with event listener
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

  //logs pokemon in console
  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      console.log(pokemon);
    });
  }

  //fetches specific details of pokemon
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


  //external access to functions
  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    };

})();

//updates pokemonList from API
pokemonRepository.loadList().then(function() {
  //buttons created forEach in addListItem
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
