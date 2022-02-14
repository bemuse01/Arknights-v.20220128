class LeftEl{
    constructor({}){
        this.wrap = document.querySelector('#wrap')
        this.node = document.querySelector('.left')

        const {width, height} = this.wrap.getBoundingClientRect()

        this.size = {
            w: width,
            h: height
        }

        this.modules = {
            child: LeftElChildBuild,
        }

        this.comp = {}

        this.init()
    }


    // init
    init(){
        this.initProxy()
        this.create()
    }
    initProxy(){
        const self = this
        
        const proxyObj = {
            play: false
        }

        this.proxy = new Proxy(proxyObj, {
            isAllTrue(obj){
                return Object.keys(obj).every(key => obj[key] === true)
            },
            set(obj, prop, value){
                obj[prop] = value

                if(this.isAllTrue(obj)){
                    self.open()
                }
                
                return true
            }
        })
    }


    // open
    open(){
        for(const comp in this.comp){
            if(!this.comp[comp].open) continue
            this.comp[comp].open()
        }
    }


    // create
    create(){
        this.createComponents()
    }
    createComponents(){
        for(const module in this.modules){
            // const {name, param} = this.modules[module]
            // const parameter = param ? param : {}
            const name = this.modules[module]

            this.comp[module] = new name({node: this.node, proxy: this.proxy, size: this.size})
        }
    }


    // resize
    resize(){
        const {width, height} = this.wrap.getBoundingClientRect()

        this.size = {
            w: width,
            h: height
        }

        this.resizeComponent()
    }
    resizeComponent(){
        for(const module in this.modules){
            if(!this.comp[module].resize) continue
            this.comp[module].resize(this.size)
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