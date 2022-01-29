class OpenIcosaBuild{
    constructor({group}){
        this.param = {
            icosaRadius: 36,
            icosaSeg: 1,
            color: 0xffdd00,
            linewidth: 0.003,
            edgeRadius: 0.6,
            edgeSeg: 1
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

        const position = new THREE.IcosahedronGeometry(this.param.icosaRadius, this.param.icosaSeg).attributes.position.array

        this.icosa = new Line2Object({
            position,
            alphaStd: -1.0,
            linewidth: this.param.linewidth,
            color: this.param.color,
            strength: 0.4
        })
        this.local.add(this.icosa.get())


        this.edge = new ObjectEdge({
            position,
            radius: this.param.edgeRadius,
            seg: this.param.edgeSeg,
            materialOpt: {
                color: this.param.color,
                transparent: true,
                opacity: 1,
            }
        })
        this.local.add(this.edge.get())


        group.add(this.local)
    }


    // animate
    animate(){
        const time = window.performance.now()

        this.local.rotation.x += 0.002
        this.local.rotation.y -= 0.002

        const icosaMeshes = this.icosa.get()
        const edgeMeshes = this.edge.get()

        icosaMeshes.children.forEach((mesh, idx, arr) => {
            const material = mesh.material

            const n = SIMPLEX.noise2D(idx * 0.01 * (arr.length - idx), time * 0.0003)

            material.uniforms['alphaStd'].value = n
        })

        edgeMeshes.children.forEach((mesh, idx) => {
            const material = mesh.material

            const n = SIMPLEX.noise2D(idx * 0.1, time * 0.0025)

            material.opacity = n
        })
    }
}