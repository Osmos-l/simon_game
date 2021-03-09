class Button {
    constructor( color = "black", sound="" ) {
        this.color = color;
        this.sound = sound;
    }

    // TODO: comment element method
    generate() {
        let element = document.createElement( "button" );

        element.classList.add( this.color );
        element.addEventListener("click", this.#click);

        return element;
    }

    onClick() {
        // TO OVERRIDE
    }

    #click() {
        if ( this.sound !== "" ) {
            // TODO: Emit sound
        }
        this.onClick();
    }

    
}