class CharacterElChildBuild{
    constructor({size}){
        this.size = size

        this.stdHeight = 1024

        const scale = this.size.h / this.stdHeight 

        this.style = {
            transform: `scale(${scale})`
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

        this.style = {transform: `scale(${scale})`}
    }
}