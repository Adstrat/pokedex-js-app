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

//all pokemon details are written and if larger get a 'wow'
for (let i=0; i<pokemonList.length; i++){
  if (pokemonList[i].height > 1.5) {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") " + "Wow, that's big! ");
  } else {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") ");
  }
}
