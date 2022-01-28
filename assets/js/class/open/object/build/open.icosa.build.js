class OpenIcosaBuild{
    constructor({group}){
        this.param = {
            radius: 36,
            seg: 1,
            color: 0xffdd00,
            linewidth: 0.003
        }

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
        this.local = new THREE.Group()

        this.icosa = new Line2Icosa({
            radius: this.param.radius,
            seg: this.param.seg,
            linewidth: this.param.linewidth,
            color: this.param.color, 
        })
        this.local.add(this.icosa.get())


        this.sphere = null


        group.add(this.local)
    }
    createPoints(){
        
    }


    // animate
    animate(){
        const time = window.performance.now()

        this.local.rotation.x += 0.002
        this.local.rotation.y -= 0.002

        const icosaMeshes = this.icosa.get()

        icosaMeshes.children.forEach((mesh, idx, arr) => {
            const material = mesh.material

            const n = SIMPLEX.noise2D(idx * 0.01 * (arr.length - idx), time * 0.0003)

            material.uniforms['alphaStd'].value = n
        })
    }
}