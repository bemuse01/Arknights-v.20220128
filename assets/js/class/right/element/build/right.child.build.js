class RightElChildBuild{
    constructor({size}){
        this.size = size

        this.stdHeight = 935

        const scale = this.size.h / this.stdHeight 

        this.style = {
            transform: `translate(0, -50%) rotateY(-20deg) rotateX(0deg) rotateZ(1.2deg) scale(${scale})`
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

        this.style.transform = `translate(0, -50%) rotateY(-20deg) rotateX(0deg) rotateZ(1.2deg) scale(${scale})`
    }
}