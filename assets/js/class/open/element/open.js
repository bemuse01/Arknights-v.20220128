class OpenEl{
    constructor({leftEl, rightEl, profile, openObj, characterObj, effect}){
        this.wrapNode = document.querySelector('#wrap')
        this.parentNode = document.querySelector('.open')
        this.node = document.querySelector('.open-element-container')
        this.frameNode = document.querySelector('#frame')

        this.modules = {
            loading: OpenLoadingBuild
        }

        this.comp = {}

        this.profileProxy = profile.proxy
        this.leftElProxy = leftEl.proxy
        this.rightElProxy = rightEl.proxy
        this.characterObjProxy = characterObj.proxy
        this.effectProxy = effect.proxy
        this.openObjProxy = openObj.proxy

        this.init()
    }


    // init
    init(){
        this.initProxy()
        this.create()

        this.frameNode.addEventListener('transitionend', () => this.onTransitionend())
    }
    initProxy(){
        const self = this
        
        const proxyObj = {
            loading: false
        }

        this.proxy = new Proxy(proxyObj, {
            isAllTrue(obj){
                return Object.keys(obj).filter(key => key !== 'element').every(key => obj[key] === true)
            },
            set(obj, prop, value){
                obj[prop] = value

                // when open's comps all true, close open and show map
                if(this.isAllTrue(obj)){
                    self.close()
                }
                
                return true
            }
        })
    }


    // close
    close(){
        this.frameNode.style.opacity = 1
    }


    // create
    create(){
        this.createComponents()
    }
    createComponents(){
        for(const module in this.modules){
            const instance = this.modules[module]

            this.comp[module] = new instance({element: this.node, proxy: this.proxy})
        }
    }


    // animate
    animate(){
        for(const comp in this.comp){
            if(!this.comp[comp].animate) continue
            this.comp[comp].animate()
        }
    }


    // event
    onTransitionend(){
        if(this.openObjProxy.play){
            this.profileProxy.play = true
            this.leftElProxy.play = true
            this.characterObjProxy.play = true
            this.effectProxy.play = true
            this.rightElProxy.play = true

            this.parentNode.style.display = 'none'
            this.openObjProxy.play = false
            this.wrapNode.style.background = `url('./assets/src/lobby_bg.png') no-repeat center center / cover`

            this.frameNode.style.opacity = 0
        }else{
            this.frameNode.style.display = 'none'
        }
    }


    // get
    get(name){
        return this.comp[name].get()
    }
    getComp(name){
        return this.comp[name]
    }
}