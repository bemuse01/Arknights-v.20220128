class OpenLoadingBuild{
    constructor({proxy}){
        this.proxy = proxy

        this.delay = 1000

        this.style = {
            bar: {
                width: '0%'
            },
            ltext: {
                transform: 'translate(0%, -100%)'
            },
            rtext: {
                transform: 'translate(0%, -100%)'
            }
        }

        this.text = 0

    }


    // open
    open(){
        this.createTween()
    }


    // create
    create(){

    }


    // tween
    createTween(){
        const start = {width: 0, text: 0}
        const end = {width: 50, text: 100}

        const tw = new TWEEN.Tween(start)
        .to(end, 2000)
        .delay(this.delay)
        .onStart(() => this.onStartTween())
        .onUpdate(() => this.onUpdateTween(start))
        .onComplete(() => this.onCompleteTween())
        .start()
    }
    onStartTween(){
        this.style.ltext.transform = 'translate(50%, -100%)'
        this.style.rtext.transform = 'translate(-50%, -100%)'
    }
    onUpdateTween({width, text}){
        this.style.bar.width = `${width}%`
        this.text = `${~~text}%`
    }
    onCompleteTween(){
        this.proxy.loading = true
    }
}