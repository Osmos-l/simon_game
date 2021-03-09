class Button {
    constructor( color = "black" ) {
        this.color = color;
    }

    // TODO: comment element method
    generate() {
        let element = document.createElement( "button" )

        element.classList.add( this.color );

        return element;
    }
}