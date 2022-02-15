class CharacterObj{
    constructor(){
        this.param = {
            fov: 60,
            near: 0.1,
            far: 10000,
            pos: 100
        }


        // node
        this.node = document.querySelector('.view-object')

        // module
        this.modules = {
            image: CharacterObjImageBuild
        }
        this.group = {}
        this.comp = {}
        this.build = new THREE.Group()


        // method
        this.init()
    }


    // init
    init(){
        this.initGroup()
        this.initRenderObject()
        this.initProxy()
        this.create()
    }
    initGroup(){
        for(const module in this.modules){
            this.group[module] = new THREE.Group()
            this.comp[module] = null
        }
    }
    initRenderObject(){
        const {width, height} = this.node.getBoundingClientRect()

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(this.param.fov, width / height, this.param.near, this.param.far)
        this.camera.position.z = this.param.pos
        
        this.size = {
            el: {
                w: width,
                h: height
            },
            obj: {
                w: PublicMethod.getVisibleWidth(this.camera, 0),
                h: PublicMethod.getVisibleHeight(this.camera, 0)
            }
        }
    }
    initProxy(){
        const self = this
        
        const proxyObj = {
            play: false,
        }

        this.proxy = new Proxy(proxyObj, {
            isAllTrue(obj){
                return Object.keys(obj).filter(key => key !== 'play').every(key => obj[key] === true)
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
            if(!this.comp[comp] || !this.comp[comp].open) continue
            this.comp[comp].open(this.group[comp])
        }
    }


    // create
    create(){
        for(const module in this.modules){
            const instance = this.modules[module]
            const group = this.group[module]

            this.comp[module] = new instance({group, size: this.size})
        }


        // add to scene
        for(const group in this.group) this.build.add(this.group[group])

        this.scene.add(this.build)
    }


    // animate
    animate({app}){
        this.render(app)
        this.animateObject()
    }
    render(app){
        const rect = this.node.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = app.renderer.domElement.clientHeight - rect.bottom

        app.renderer.setScissor(left, bottom, width, height)
        app.renderer.setViewport(left, bottom, width, height)

        this.camera.lookAt(this.scene.position)
        app.renderer.render(this.scene, this.camera)
    }
    animateObject(){
        for(const comp in this.comp){
            if(!this.comp[comp] || !this.comp[comp].animate) continue
            this.comp[comp].animate(this.size.obj)
        }
    }


    // resize
    resize(){
        const rect = this.node.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.size = {
            el: {
                w: width,
                h: height
            },
            obj: {
                w: PublicMethod.getVisibleWidth(this.camera, 0),
                h: PublicMethod.getVisibleHeight(this.camera, 0)
            }
        }

        this.resizeObject()
    }
    resizeObject(){
        for(const comp in this.comp){
            if(!this.comp[comp] || !this.comp[comp].resize) continue
            this.comp[comp].resize(this.size)
        }
    }


    // get
    getComp(name){
        return this.comp[name]
    }
}