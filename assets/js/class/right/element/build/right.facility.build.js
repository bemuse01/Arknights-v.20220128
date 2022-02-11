class RightElFacilityBuild{
    constructor(){
        this.style = {
            container: {fontFamily: 'BusanBada', opacity: 0},
        }

        this.text = {
            mission: '임무',
            base: '기반시설',
            depot: '창고'
        }
    }


    // open
    open(){
        this.createTween()
    }


    // tween
    createTween(){
        const {opacity, time, delayBase, delayRand} = RightElParam

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
        this.style.container.opacity = opacity
    }
}