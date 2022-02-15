class ProfileChildBuild{
    constructor({size}){
        this.size = size

        this.stdHeight = 820

        const scale = this.size.h / this.stdHeight 

        this.style = {
            transform: `translate(0, -60%) scale(${scale})`,
            opacity: 0
            // transform: `translate(0, -50%) rotateY(-28deg) scale(${scale})`
        }
    }


    // open
    open(){
        this.createTween()
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


    // tween
    createTween(){
        const {opacity, time, delayBase, delayRand} = profileParam

        const start = {opacity: 0}
        const end = {opacity}
        const delay = Math.random() * delayRand + delayBase

        const tw = new TWEEN.Tween(start)
        .to(end, time)
        .delay(delay)
        .onUpdate(() => this.onUpdateTween(start))
        .start()
    }
    onUpdateTween({opacity}){
        this.style.opacity = opacity
    }
}