class RightElOpBuild{
    constructor(){
        this.style = {
            squadSection: {opacity: 0},
            operatorSection: {opacity: 0},
            emptySection: {opacity: 0},
            container: {fontFamily: 'BusanBada'},
            operatorDetail: {fontFamily: 'NotoSansKrBold'}
        }

        this.text = {
            squad: '편성',
            operator: '오퍼레이터',
            operatorDetail: '캐릭터 관리'
        }
    }

    
    // open
    open(){
        this.createTween()
    }


    // tween
    createTween(){
        const {opacity, time, delayBase, delayRand} = RightElParam
        const names = ['squadSection', 'operatorSection', 'emptySection']

        names.forEach(name => {

            const start = {opacity: 0}
            const end = {opacity}
            const delay = Math.random() * delayRand + delayBase
    
            const tw = new TWEEN.Tween(start)
            .to(end, time)
            .delay(delay)
            .onUpdate(() => this.onUpdateTween(start, name))
            .start()

        })
    }
    onUpdateTween({opacity}, name){
        this.style[name].opacity = opacity
    }
}