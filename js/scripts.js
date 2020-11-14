let pokemonRepository = ( () => {
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
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add
  };

})();


pokemonRepository.getAll().forEach (pokemon => {
  let pokemonHeight = pokemon.name + " (height: " + pokemon.height + ") ";
  if (pokemon.height > 1.5){
    document.write (pokemonHeight + "Wow, that's big! <br>");
  } else {
    document.write(pokemonHeight + "<br>");
  }
});
