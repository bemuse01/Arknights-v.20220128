class RightEl{
    constructor({}){
        this.element = document.querySelector('.right')

        this.modules = {
            date: RightElDateBuild
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

            this.comp[module] = new name({element: this.element, proxy: this.proxy})
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