
//------------------------------------------------
// -- POKEMON GAME
//------------------------------------------------

let landscape = document.querySelector( "#landscape" );
let gameContainer = document.querySelector( ".game-container" );
const result = document.querySelector( ".result" );
let tryAgain = document.querySelector( ".try-again-button" );
let pokes = 0;

// random number generator
let getRandomNumber = size => {
  return Math.floor( Math.random() * size );
}

// gets the width to put the pokemon image inside
const getWidth = () => {
  let width = landscape.offsetWidth - 40;
  return width;
}
// gets the height to put the pokemon image inside
const getHeight = () => {
  let height = ( getWidth() - 25 ) / 2;
  return height;
}

// puts the pokemon image in a ramdon place in the landscape
const showPokemon = ( image ) => {
  let img = document.createElement( "img" );
  img.src = image;
  img.style.position = "absolute";
  img.style.top = getRandomNumber( getHeight() ) + "px";
  img.style.left = getRandomNumber( getWidth() ) + "px";
  img.style.height = "40px";
  img.classList = "catch-pokemon";
  gameContainer.append( img );
}

// makes one pokemon appear on first click in landscape, then function disabled (line 57)
landscape.addEventListener( "click", () => {
  showPokemon( "img/pokemon.svg" );
  // starts 10 second timer - removes last pokemon and reveals score
  setTimeout( () => {
    document.querySelector( ".catch-pokemon" ).remove();
    result.classList.remove( "d-none" );
    tryAgain.classList.remove( "d-none" );
    landscape.style.filter = "grayscale(60%)";
    landscape.style.opacity = 0.9;
    // scrolls through score 
    let output = 0;
    const timer = setInterval( () => {
      result.querySelector( "span" ).textContent = `${ output }`;
      if ( output === pokes ) {
        clearInterval( timer );
      } else {
        output++;
      }
    }, 80 );
  }, 10000 );
  // using event delegation to remove pokemon when clicked and reveal a new one, increases pokes
  gameContainer.addEventListener( "click", e => {
    if ( e.target.className === "catch-pokemon" ) {
      pokes++
      e.target.remove();
      showPokemon( "img/pokemon.svg" );
    }
  } )
}, {
  once: true
} );

// button to start new game
tryAgain.addEventListener( "click", () => {
  location.reload();
} );
