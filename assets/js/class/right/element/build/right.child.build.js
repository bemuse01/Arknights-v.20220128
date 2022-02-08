class RightElChildBuild{
    constructor({size}){
        this.size = size

        const scale = this.size.h / STD_HEIGHT

        this.style = {
            transform: `translate(0, -50%) rotateY(-32deg) skewY(1deg) rotateX(3deg) scale(${scale})`
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

        const scale = this.size.h / STD_HEIGHT

        this.style.transform = `translate(0, -50%) rotateY(-28deg) scale(${scale})`
    }
}