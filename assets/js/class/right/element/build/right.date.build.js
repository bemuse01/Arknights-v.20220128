class RightElDateBuild{
    constructor(){
        this.style = {
            opacity: 0
        }

        this.text = ``

        this.init()
    }


    open(){
        this.createTween()
    }


    // init
    init(){
        this.updateDate()
    }


    // create
    create(){

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
        this.style.opacity = opacity
    }


    // update date
    updateDate(){
        const DATE = new Date()
        const year = DATE.getFullYear()
        const month = this.addZero(DATE.getMonth() + 1)
        const date = this.addZero(DATE.getDate())
        const hour = this.addZero(DATE.getHours())
        const min = this.addZero(DATE.getMinutes())
        const sec = this.addZero(DATE.getSeconds())

        this.text = `${year}/${month}/${date} ${hour}:${min}:${sec}`

        setTimeout(() => this.updateDate(), 1000)
    }


    // util
    addZero(time){
        return time < 10 ? '0' + time : time
    }
}