class RightElMoneyBuild{
    constructor(){
        this.style = {
            opacity: 0
        }

        this.root = './assets/src/ui/'
        this.params = [
            {
                src: 'ui_lmd_icon_2.png',
                className: 'money-lmd',
            },
            {
                src: 'ui_orundum_icon_2.png',
                className: 'money-orundum',
            },
            {
                src: 'ui_originite_icon_2.png',
                className: 'money-originite',
            },
        ]

        this.maxAmt = 999999

        this.el = []

        this.init()
    }


    // open
    open(){
        this.createTween()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.params.forEach((params, idx) => {
            const {src, className} = params
            
            this.el[idx] = {
                key: idx,
                className,
                text: ~~(Math.random() * this.maxAmt),
                src: this.root + src,
                style: {

                }
            }
        })
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
}