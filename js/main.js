function $id( id ) {
    return document.getElementById( id );
}

document.addEventListener('DOMContentLoaded', function(event) {
    let body = document.body;
    let startBtn = $id( "start" );
    let gameboardElement = $id( "gameboard" );
    let scoreElement = $id( "gameboard-score" );

    if ( body === null ) {
        // TODO: throw error
        return false;
    }
    if ( startBtn === null ) {
        // TODO: throw error
        return false;
    }
    if ( gameboardElement === null ) {
        // TODO: throw error
        return false;
    }

    startBtn.addEventListener("click", function(event) {
        gameboardElement.innerHTML = "";
        
        let gameboard = new Gameboard( gameboardElement, config );

        gameboard.onEnd = () => {
            gameboardElement.innerHTML = "";
            gameboardElement.innerHTML = "<h1>AHAHAH LOOSER !<h1>";

            // Todo: display try again


            startBtn.innerHTML = "Try again !";
            startBtn.classList.remove( "hidden" );
        }

        gameboard.onScoreUpdate = score => {
            console.log( score );
            scoreElement.innerHTML = score;
        }

        gameboard.generate();

        startBtn.classList.add( "hidden" );

    } );

} );