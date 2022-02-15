class LeftElInfoBuild{
    constructor(){
        this.style = {
            fontFamily: 'BusanBada',
            opacity: 0
        }

        this.text = {
            friends: '친구',
            files: '파일'
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