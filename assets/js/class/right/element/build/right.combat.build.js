class RightElCombatBuild{
    constructor(){
        this.sanity = 127

        this.style = {
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
            combatSmall: '2-3 무죄추정'
        }

        this.init()
    }


    // init
    init(){
        this.updateSanity()
    }


    // create
    create(){

    }


    // update sanity
    updateSanity(){
        this.text.crtSanity += 1
        this.text.crtSanity %= this.sanity

        setTimeout(() => this.updateSanity(), 1000 * 60 * 6);
    }
}