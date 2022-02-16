class MenuChildBuild{
    constructor(){
        this.style = {
            opacity: 0,
            display: 'none'
        }
    }


    // open
    open(){
        this.createTween()
    }


    // tween
    createTween(){
        const {opacity, time, delayBase, delayRand} = menuParam

        const start = {opacity: 0}
        const end = {opacity}
        const delay = Math.random() * delayRand + delayBase

        const tw = new TWEEN.Tween(start)
        .to(end, time)
        .delay(delay)
        .onStart(() => this.onStartTween())
        .onUpdate(() => this.onUpdateTween(start))
        .start()
    }
    onStartTween(){
        this.style.display = 'grid'
    }
    onUpdateTween({opacity}){
        this.style.opacity = opacity
    }
}