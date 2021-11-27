
//------------------------------------------------
// -- POKEMON GAME
//------------------------------------------------

let landscapeMobile = document.querySelector( ".landscape-mobile" );
let landscapeDesktop = document.querySelector( ".landscape-desktop" );
let gameContainer = document.querySelector( ".game-container" );
const result = document.querySelector( ".result" );
let playAgain = document.querySelector( ".play-again-button" );
let pokes = 0;

// random number generator
let getRandomNumber = size => {
  return Math.floor( Math.random() * size );
}

// gets the Mobile/Desktop width/height to put the pokemon image inside
const getWidthMobile = () => {
  let width = landscapeMobile.offsetWidth - 40;
  return width;
}
const getHeightMobile = () => {
  let height = ( getWidthMobile() - 100 ) * 2;
  return height;
}

const getWidthDesktop = () => {
  let width = landscapeDesktop.offsetWidth - 40;
  return width;
}
const getHeightDesktop = () => {
  let height = ( getWidthDesktop() - 100 ) / 2;
  return height;
}

let mobileView = window.matchMedia( "(max-width: 480px)" );

// puts the pokemon image in a ramdon place in the landscape
const showPokemon = ( image ) => {
  let img = document.createElement( "img" );
  img.src = image;
  img.style.position = "absolute";
  img.style.height = "40px";
  img.classList = "catch-pokemon";

  // media query to set random area for pokemon to appear

  if ( mobileView.matches ) {
    img.style.left = getRandomNumber( getWidthMobile() ) + "px";
    img.style.top = getRandomNumber( getHeightMobile() ) + "px";

  } else {
    img.style.left = getRandomNumber( getWidthDesktop() ) + "px";
    img.style.top = getRandomNumber( getHeightDesktop() ) + "px";
  };

  gameContainer.append( img );
}



let landscape;
if ( mobileView.matches ) {
  landscape = landscapeMobile;
} else {
  landscape = landscapeDesktop;
}


// DesktopView - makes one pokemon appear on first click in landscape, then function disabled
landscape.addEventListener( "click", () => {
  showPokemon( "img/pokemon.svg" );
  // starts 10 second timer - removes last pokemon and reveals score
  setTimeout( () => {
    document.querySelector( ".catch-pokemon" ).remove();
    result.classList.remove( "d-none" );
    playAgain.classList.remove( "d-none" );
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
  once: true,
} );

// button to start new game
playAgain.addEventListener( "click", () => {
  location.reload();
} );
