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
  //   let pokemonList = $('.pokemon-list');
  //   let listItem = $('<li></li>');
  //   let button = $('<button class=pokemon-button></button>')
  //   listitem.addClass('.group-list-item');
  //   button.innerText = pokemon.name;
  //   listItem.append(button);
  //   pokemonList.append(listItem);
  //   button.on('click', function(event){
  //     showDetails(pokemon);
  //   })
  // }

  //shows pokemon details in a modal
  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      console.log(pokemon);
      modal(pokemon);
    });
  }

  function modal(pokemon){
    let modalContainer = document.querySelector('#modal-container');

        //opens modal
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', () =>hideModal());

      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      let imageElement = document.createElement('img');
      imageElement.classList.add('modal-image');
      imageElement.src = pokemon.imageUrl;

      let heightElement = document.createElement('p');
      heightElement.classList.add('modal-content');
      heightElement.innerText = ("Height: " + pokemon.height);

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(imageElement);
      modal.appendChild(heightElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');


        //hides modal
    function hideModal(){
      console.log('hideModal');
      modalContainer.classList.remove('is-visible');
    }

        //hides modal with escape
    window.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' &&
      modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

        //hides modal with outside click
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if(target === modalContainer) {
        hideModal();
      }
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
