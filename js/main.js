function $id( id ) {
    return document.getElementById( id );
}

document.addEventListener('DOMContentLoaded', function(event) {
    let body = document.body;
    let startBtn = $id( "start" );
    let gameboard = $id( "gameboard" );

    if ( body === null ) {
        // TODO: throw error
        return false;
    }
    if ( startBtn === null ) {
        // TODO: throw error
        return false;
    }
    if ( gameboard === null ) {
        // TODO: throw error
        return false;
    }

    startBtn.addEventListener("click", function(event) {
        gameboard = new Gameboard( gameboard, config );
        gameboard.generate();

    } );
    
} );