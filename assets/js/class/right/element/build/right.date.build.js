class RightElDateBuild{
    constructor(){
        this.text = ``

        this.init()
    }


    // init
    init(){
        this.updateDate()
    }


    // create
    create(){

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