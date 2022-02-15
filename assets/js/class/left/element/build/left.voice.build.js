class LeftElVoiceBuild{
    constructor(){
        this.style = {
            opacity: 0
        }
    }


    // open 
    open(){
        this.createTween()
    }


    // tween
    createTween(){
        const {opacity, time, delayBase, delayRand} = leftElParam

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