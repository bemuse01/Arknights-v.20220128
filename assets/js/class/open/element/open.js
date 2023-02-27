class OpenEl{
    constructor({leftEl, rightEl, profile, openObj, characterObj, effect, menu, mouse}){
        this.wrapNode = document.querySelector('#background div')
        this.parentNode = document.querySelector('.open')
        this.node = document.querySelector('.open-element-container')
        this.frameNode = document.querySelector('#frame')
        this.coverNode = document.querySelector('#cover')

        this.modules = {
            loading: OpenLoadingBuild
        }

        this.comp = {}

        this.menuProxy = menu.proxy
        this.profileProxy = profile.proxy
        this.leftElProxy = leftEl.proxy
        this.rightElProxy = rightEl.proxy
        this.characterObjProxy = characterObj.proxy
        this.effectProxy = effect.proxy
        this.openObjProxy = openObj.proxy
        this.mouse = mouse

        this.init()
    }


    // init
    async init(){
        this.initProxy()
        this.create()

        this.frameNode.addEventListener('transitionend', () => this.onTransitionend())

        await this.onResourcesLoaded()
    }
    initProxy(){
        const self = this
        
        const proxyObj = {
            resources: false,
            loading: false
        }

        this.proxy = new Proxy(proxyObj, {
            onLoaded(obj){
                return obj['resources'] === true
            },
            isAllTrue(obj){
                return Object.keys(obj).filter(key => key !== 'element').every(key => obj[key] === true)
            },
            set(obj, prop, value){
                obj[prop] = value

                if(this.onLoaded(obj)){
                    self.comp['loading'].open()
                }

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
            this.menuProxy.play = true
            this.profileProxy.play = true
            this.leftElProxy.play = true
            this.characterObjProxy.play = true
            this.effectProxy.play = true
            this.rightElProxy.play = true

            this.parentNode.style.display = 'none'
            this.openObjProxy.play = false
            this.wrapNode.style.background = `url('./assets/src/lobby_bg.png') no-repeat center center / cover`

            this.frameNode.style.opacity = 0

            this.mouse.move = true
        }else{
            this.frameNode.style.display = 'none'
        }
    }
    async onResourcesLoaded(){
        await Promise.all(resources.map(({path}) => this.loadImg(path)))
        this.proxy.resources = true
        this.coverNode.style.display = 'none'
    }


    // load
    loadImg(path){
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = path

            img.onload = () => resolve(img)
        })
    }


    // get
    get(name){
        return this.comp[name].get()
    }
    getComp(name){
        return this.comp[name]
    }
}