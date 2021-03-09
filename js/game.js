function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

class Gameboard {
    #actionsToCopy

    #buttons

    #waitingUserAction

    #userActionsIndex // To gap with actionsToCopy

    #userAction      // To compare with actionsToCopy where actionsToCopy.key == userActionsIndex

    #loose

    constructor( element, config ) {
        this.element = element;
        this.config = config;

        this.#actionsToCopy = [];
        this.#buttons = [];
        this.#waitingUserAction = false;
        this.#loose = false;

        this.#userActionsIndex = 0;
        this.#userAction = 0;
    }

    start() {
        this.#think();
    }

    #think() {

        if ( this.#waitingUserAction ) {
            // Sleep
        } else {
            this.#userActionsIndex = 0;
            this.#generateRandomClick();
        }

        
    }

    userMakeAction() {
        
        // If user click on the right button at the right moment
        if ( this.#actionsToCopy[this.#userActionsIndex] !== null && 
            this.#actionsToCopy[this.#userActionsIndex] == this.#userAction ) {
            
            

            // If user do all the clicks
            if ( this.#userActionsIndex == this.#actionsToCopy.length - 1 ) {
                this.#waitingUserAction = false;
                this.#userActionsIndex = 0;
                console.log( "User complete a stage !");
            } else {
                this.#userActionsIndex++;
            }

            let self = this;
            setTimeout( function() {
                self.#think()
            }, 500 );
        } else {
            console.log( "DEAD" );
        }

        
    }

    #generateRandomClick() {
        let toExecuteKey = randomIntFromInterval( 0, 4 );
        let toExecute = this.#buttons[ toExecuteKey ];
        
        if ( toExecute === null ) {
            return false;
        }

        if ( toExecute.classList === null ) {
            toExecute.classList = [];
        }


        // TODO: Patch error when button is already hovered

        toExecute.classList.add("active");
        setTimeout( function() {
            toExecute.classList.remove("active");
        }, 500 );

        this.#actionsToCopy.push( toExecuteKey );
        console.log( this.#actionsToCopy );
        this.#waitingUserAction = true;
    }

    generate() {
        let self = this;

        for( let k in this.config.buttons ) {
            let button = new Button( config.buttons[k] );
            button = button.generate();
            
            button.addEventListener("click", function(event) {
                self.#userAction = k;
                self.userMakeAction();
            } );

            this.element.append( button );

            this.#buttons[k] = button;
        }

        console.log( this.#buttons );
        this.start();
    }

    end() {

    }
}