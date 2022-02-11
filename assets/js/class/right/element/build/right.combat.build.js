class RightElCombatBuild{
    constructor(){
        this.sanity = 127

        this.style = {
            box: {opacity: 0},
            sanityFont: {fontFamily: 'NotoSansKrBold'},
            combatBigFont: {fontFamily: 'BusanBada'},
            combatTagFont: {fontFamily: 'NotoSansKrMedium'},
            combatSmallFont: {fontFamily: 'NotoSansKrBold'}
        }

        this.text = {
            sanity: '이성',
            crtSanity: 0,
            maxSanity: this.sanity,
            combatBig: '작전',
            combatTag: '현재',
            combatSmall: '2-3 무죄추정'
        }

        this.init()
    }


    // open
    open(){
        this.createTween()
    }


    // init
    init(){
        this.updateSanity()
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
        this.style.box.opacity = opacity
    }


    // update sanity
    updateSanity(){
        this.text.crtSanity += 1
        this.text.crtSanity %= this.sanity

        setTimeout(() => this.updateSanity(), 1000 * 60 * 6);
    }
}