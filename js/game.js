function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

class Gameboard {
    #toReproduceClicks

    #buttons

    #waitingForUserAction

    #userActionsIndex // To gap with toReproduceClicks

    #userAction      // To compare with toReproduceClicks where toReproduceClicks.key == userActionsIndex

    #loose

    #score

    constructor( element, config ) {
        this.element = element;
        this.config = config;

        this.#init();
    }
    
    #init() {
        this.#toReproduceClicks = [];
        this.#buttons = [];
        this.#waitingForUserAction = false;
        this.#loose = false;

        this.#userActionsIndex = 0;
        this.#userAction = 0;

        this.#score = 0;

    }

    start() {
        this.onScoreUpdate( this.#score );
        this.#think();
    }

    #think() {

        if ( this.#loose === false && 
             this.#waitingForUserAction === false ) {
            this.#userActionsIndex = 0;
            this.#generateRandomClick();
        }

    }

    userMakeAction() {
        
        // If user click on the right button at the right moment
        if ( this.#toReproduceClicks[this.#userActionsIndex] !== null && 
            this.#toReproduceClicks[this.#userActionsIndex] == this.#userAction ) {
            
            // If user do all the clicks
            if ( this.#userActionsIndex == this.#toReproduceClicks.length - 1 ) {
                this.#waitingForUserAction = false;
                this.#userActionsIndex = 0;

               this.#updateScore( this.#toReproduceClicks.length * 1.5 );
            } else {
                this.#userActionsIndex++;
            }

            let self = this;
            setTimeout( function() {
                self.#think()
            }, 500 );
        } else {
            this.#end();
        }

        
    }

    #generateRandomClick() {
        let toExecuteKey = randomIntFromInterval( 0, this.#buttons.length - 1 );
        let toExecute = this.#buttons[ toExecuteKey ];
        
        if ( toExecute === undefined ) {
            return false;
        }

        if ( toExecute.classList === null ) {
            toExecute.classList = [];
        }

        toExecute.classList.add("active");
        setTimeout( function() {
            toExecute.classList.remove("active");
        }, 500 );

        this.#toReproduceClicks.push( toExecuteKey );
        console.log( this.#toReproduceClicks );
        this.#waitingForUserAction = true;
    }

    generate() {

        let self = this;

        for( let k in this.config.buttons ) {
            let button = new Button( config.buttons[k] );
            button = button.generate();
            
            button.onClick = () => {
                self.#userAction = k;
                self.userMakeAction();
            };

            this.element.append( button );

            this.#buttons[k] = button;
        }

        this.start();
    }

    retry() {
        this.#init();
        this.generate();
    }

    #end() {
        console.log( "DEAD!" );
        this.onEnd();
    }

    onEnd() {
        // To override
    }

    #updateScore( toAdd ) {
        this.#score = this.#score + toAdd;
        this.onScoreUpdate( this.#score );
    }

    onScoreUpdate() {
        // To override
    }
}