class OpenObj{
    constructor(){
        this.param = {
            fov: 60,
            near: 0.1,
            far: 10000,
            pos: 100
        }


        // node
        this.node = document.querySelector('.open-object')

        // module
        this.modules = {
            // bg: OpenBgBuild,
            icosa: OpenIcosaBuild,
            particle: OpenParticleBuild,
            polygon: OpenPolygonBuild
        }
        this.group = {}
        this.comp = {}
        this.build = new THREE.Group()

        this.play = true

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
            play: true,
        }

        this.proxy = new Proxy(proxyObj, {
            isAllTrue(obj){
                return Object.keys(obj).every(key => obj[key] === true)
            },
            isAllFalse(obj){
                return Object.keys(obj).every(key => obj[key] === false)
            },
            set(obj, prop, value){
                obj[prop] = value

                // when open's comps all true, close open and show map
                if(this.isAllTrue(obj)){
                    // self.close()
                }

                if(this.isAllFalse(obj)){
                    self.close()
                }
                
                return true
            }
        })
    }


    // close
    close(){
        for(const comp in this.comp){
            if(!this.comp[comp] || !this.comp[comp].close) continue
            this.comp[comp].close(this.group[comp])
        }

        this.build.clear()
        this.build = null

        this.scene.clear()
        this.scene = null
        this.camera = null

        for(const comp in this.comp){
            this.comp[comp] = null
            this.modules[comp] = null
            this.group[comp] = null
        }

        this.comp = null
        this.group = null

        this.play = false
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
        if(!this.play) return
        
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
        if(!this.play) return

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
}