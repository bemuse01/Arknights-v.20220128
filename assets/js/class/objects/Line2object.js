class Line2Object{
    constructor({position, alphaStd, reverse, strength, color, linewidth}){
        this.color = color
        this.linewidth = linewidth
        this.position = position
        this.alphaStd = alphaStd
        this.reverse = reverse || 0
        this.strength = strength || 1
        
        this.group = new THREE.Group()

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const count = this.position.length / 3

        for(let i = 0; i < count / 2; i++){
            const pos = []

            for(let j = 0; j < 2; j++){
                const idx = i * 2 + j
                const index = idx * 3

                const x = this.position[index]
                const y = this.position[index + 1]
                const z = this.position[index + 2]

                pos.push(x, y, z)
            }

            const geometry = this.createGeometry(pos)
            const material = this.createMaterial()

            const mesh = new THREE.Line2(geometry, material)

            this.group.add(mesh)
        }
    }
    createGeometry(pos){
        const geometry = new THREE.LineGeometry()
        
        geometry.setPositions(pos)

        return geometry
    }
    createMaterial(){
        return new THREE.LineMaterial({
            color: this.color,
            // vertexColors: true,
            linewidth: this.linewidth,
            dashed: false,
            transparent: true,
            opacity: 1.0,
            alphaStd: this.alphaStd,
            reverse: this.reverse,
            strength: this.strength
            // blending: THREE.AdditiveBlending
        })
    }


    // resize
    // resize(position){
    //     this.position = position

    //     this.group.children.forEach((mesh, i) => {
    //         mesh.geometry.dispose()

    //         const pos = []

    //         for(let j = 0; j < 2; j++){
    //             const idx = i * 2 + j
    //             const index = idx * 3

    //             const x = this.position[index]
    //             const y = this.position[index + 1]
    //             const z = this.position[index + 2]

    //             pos.push(x, y, z)
    //         }

    //         mesh.geometry = this.createGeometry(pos)
    //     })
    // }


    // dispose
    dispose(){
        this.group.children.forEach(mesh => {
            this.group.remove(mesh)
            mesh.geometry.dispose()
            mesh.material.dispose()
            mesh.geometry = null
            mesh.mateiral = null
        })
        this.group = null
    }


    // get
    get(){
        return this.group
    }
    getPosition(){
        return this.icosa.position
    }
}