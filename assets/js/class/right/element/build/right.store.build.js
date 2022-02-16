class RightElStoreBuild{
    constructor(){
        // kr
        this.krStyle = {
            title: {fontFamily: 'BusanBada'},
            public: {fontFamily: 'BusanBada'}
        }
        this.krText = {
            shop: '구매센터',
            recruitTitle: '모집',
            recruitPublic: '공개모집',
            recruitHeadhunt: '헤드헌팅'
        }

        // en
        this.enStyle = {
            title: {fontFamily: 'OpenSansRegular', fontSize: '25px', transform: 'scaleY(1.2)'},
            public: {fontFamily: 'RobotoBlack', transform: 'scaleX(0.8) scaleY(1.1)'}
        }
        this.enText = {
            shop: 'Store',
            recruitTitle: 'Recruitment',
            recruitPublic: 'Recruit',
            recruitHeadhunt: 'Headhunt'
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
            title: {fontFamily: 'BusanBada'},
            public: {fontFamily: 'BusanBada'}
        }
        
        this.text = {
            shop: '구매센터',
            recruitTitle: '모집',
            recruitPublic: '공개모집',
            recruitHeadhunt: '헤드헌팅'
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