const pokemonList= [];

pokemonList[0]={
  name: 'Bulbasaur',
  height: 0.7,
  types: ['grass', 'poison']
};

pokemonList[1]={
  name: 'Charizard',
  height: 1.7,
  types: ['fire', 'flying']
};

pokemonList[2]={
  name: 'Poliwrath',
  height: 1.3,
  types: ['water', 'fighting']
};

pokemonList.forEach(function(pokemon) {
  let pokemonHeight = pokemon.name + " (height: " + pokemon.height + ") ";
  if (pokemon.height > 1.5){
    document.write (pokemonHeight + "Wow, that's big! <br>");
  } else {
    document.write(pokemonHeight + "<br>");
  }
});
