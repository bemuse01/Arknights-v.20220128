class RightElOpBuild{
    constructor(){
        this.style = {
            container: {fontFamily: 'BusanBada', opacity: 0},
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
}