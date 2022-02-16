class RightElOpBuild{
    constructor(){
        // kr
        this.krStyle = {
            squad: {fontFamily: 'BusanBada'},
            operator: {fontFamily: 'BusanBada'},
            operatorDetail: {fontFamily: 'NotoSansKrBold'}
        }
        this.krText = {
            squad: '편성',
            operator: '오퍼레이터',
            operatorDetail: '캐릭터 관리'
        }

        // en
        this.enStyle = {
            squad: {fontFamily: 'RobotoBlack', transform: 'scaleX(0.7)', transformOrigin: 'left'},
            operator: {fontFamily: 'RobotoBlack', transform: 'scaleX(0.7)', transformOrigin: 'left'},
            operatorDetail: {fontFamily: 'OpenSansMedium', transform: 'scaleX(0.7)', transformOrigin: 'left'}
        }
        this.enText = {
            squad: 'Squads',
            operator: 'Operator',
            operatorDetail: 'Management'
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
            squad: {fontFamily: 'BusanBada'},
            operator: {fontFamily: 'BusanBada'},
            operatorDetail: {fontFamily: 'NotoSansKrBold'}
        }

        this.text = {
            squad: '편성',
            operator: '오퍼레이터',
            operatorDetail: '캐릭터 관리'
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