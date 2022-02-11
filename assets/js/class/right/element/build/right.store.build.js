class RightElStoreBuild{
    constructor(){
        this.style = {
            shopSection: {opacity: 0},
            recruitSection: {opacity: 0},
            container: {fontFamily: 'BusanBada'}
        }
        
        this.text = {
            shop: '구매센터',
            recruitTitle: '모집',
            recruitPublic: '공개모집',
            recruitHeadhunt: '헤드헌팅'
        }
    }

    
    // open
    open(){
        this.createTween()
    }


    // tween
    createTween(){
        const {opacity, time, delayBase, delayRand} = RightElParam
        const names = ['shopSection', 'recruitSection']

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