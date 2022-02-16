class RightElFacilityBuild{
    constructor(){
        // kr
        this.krStyle = {
            mission: {fontFamily: 'BusanBada'},
            base: {fontFamily: 'BusanBada', width: 'initial'},
            depot: {fontFamily: 'BusanBada'}
        }
        this.krText = {
            mission: '임무',
            base: '기반시설',
            depot: '창고'
        }

        // en
        this.enStyle = {
            mission: {fontFamily: 'RobotoBlack', transform: 'scaleX(0.7)', transformOrigin: 'left'},
            base: {fontFamily: 'RobotoBlack', transform: 'scaleX(0.7)', transformOrigin: 'left', width: '84%'},
            depot: {fontFamily: 'RobotoBlack', transform: 'scaleX(0.7)'}
        }
        this.enText = {
            mission: 'Mission',
            base: 'Base',
            depot: 'Depot'
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
            public: {fontFamily: 'BusanBada'},
            depot: {fontFamily: 'BusanBada'}
        }

        this.text = {
            mission: '임무',
            base: '기반시설',
            depot: '창고'
        }

        this.init()
    }


    // open
    open(){
        this.createTween()
    }


    // init
    init(){
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