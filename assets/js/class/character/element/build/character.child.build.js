class CharacterElChildBuild{
    constructor({size}){
        this.size = size

        this.stdHeight = 1024

        const scale = this.size.h / this.stdHeight 

        this.style = {
            // transform: `translateY(-50%) scale(${scale})`
            // transform: `translateY(-55%)`
        }
    }

    
    // init
    init(){

    }


    // create
    create(){

    }


    // resize
    resize(size){
        this.size = size

        const scale = this.size.h / this.stdHeight

        // this.style = {transform: `translateY(-50%) scale(${scale})`}
        // this.style = {transform: `translateY(-50%)`}
    }
}