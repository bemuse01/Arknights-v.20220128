class ProfileChildBuild{
    constructor({size}){
        this.size = size

        this.stdHeight = 820

        const scale = this.size.h / this.stdHeight 

        this.style = {
            transform: `translate(0, -60%) scale(${scale})`
            // transform: `translate(0, -50%) rotateY(-28deg) scale(${scale})`
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

        this.style.transform = `translate(0, -60%) scale(${scale})`
    }
}