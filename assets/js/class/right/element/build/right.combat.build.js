class RightElCombatBuild{
    constructor(){
        this.sanity = 127

        // kr
        this.krStyle = {
            sanity: {fontFamily: 'NotoSansKrBold'},
            combatBig: {fontFamily: 'BusanBada'},
            combatTag: {fontFamily: 'NotoSansKrMedium'},
            combatSmall: {fontFamily: 'NotoSansKrBold'}
        }
        this.krText = {
            sanity: '이성',
            combatBig: '작전',
            combatTag: '현재',
            combatSmall: ''
        }

        // en
        this.enStyle = {
            sanity: {fontFamily: 'OpenSansMedium'},
            combatBig: {fontFamily: 'RobotoBlack', transform: 'scaleX(0.7)'},
            combatTag: {fontFamily: 'OpenSansRegular'},
            combatSmall: {fontFamily: 'OpenSansMedium'}
        }
        this.enText = {
            sanity: 'Sanity',
            combatBig: 'Combat',
            combatTag: 'Current',
            combatSmall: ''
        }

        this.lang = {
            kr: {
                style: this.krStyle,
                text: this.krText
            },
            en: {
                style: this.enStyle,
                text: this.enText
            }
        }

        this.style = {
            container: {opacity: 0},
            sanity: {fontFamily: 'NotoSansKrBold'},
            combatBig: {fontFamily: 'BusanBada'},
            combatTag: {fontFamily: 'NotoSansKrMedium'},
            combatSmall: {fontFamily: 'NotoSansKrBold'}
        }

        this.text = {
            sanity: '이성',
            crtSanity: 0,
            maxSanity: this.sanity,
            combatBig: '작전',
            combatTag: '현재',
            combatSmall: ''
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
        this.style.container.opacity = opacity
    }


    // update sanity
    updateSanity(){
        this.text.crtSanity += 1
        this.text.crtSanity %= this.sanity

        setTimeout(() => this.updateSanity(), 1000 * 60 * 6);
    }


    // set language
    setLanguage(lang){
        for(const prop in this.lang[lang].style){
            const style = this.lang[lang].style
            this.style[prop] = style[prop]
        }

        for(const prop in this.lang[lang].text){
            const text = this.lang[lang].text
            this.text[prop] = text[prop]
        }
    }
}