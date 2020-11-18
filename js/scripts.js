let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      types: ['grass', 'poison']
    },
    {
      name: 'Charizard',
      height: 1.7,
      types: ['fire', 'flying']
    },
    {
      name: 'Poliwrath',
      height: 1.3,
      types: ['water', 'fighting']
    }
  ];

  function getAll(){
    return pokemonList;
  }

  function add(pokemon){
    if (typeof pokemon === 'object' && Object.keys === ['name', 'height', 'types']) {
      pokemonList.push(pokemon);
    } else {
      console.log("Pokemon is not correct");
    }
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    //button triggers pokemon details when clicked
    button.addEventListener('click', function(event){
    showDetails(pokemon);
    })
  }

  function showDetails(pokemon){
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };

})();


pokemonRepository.getAll().forEach (function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
