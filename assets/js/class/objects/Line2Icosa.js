class Line2Icosa{
    constructor({radius, seg, color, linewidth, group}){
        this.color = color
        this.linewidth = linewidth
        this.group = group
        this.icosa = new THREE.IcosahedronGeometry(radius, seg).attributes

        this.local = new THREE.Group()

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.createGeometry()
        this.createMaterial()
    }
    createGeometry(){
        const position = this.icosa.position
        const positionArr = position.array
        const count = position.count

        for(let i = 0; i < count / 2; i++){

            const geometry = new THREE.LineGeometry()

            const pos = []

            for(let j = 0; j < 2; j++){
                const idx = i * 2 + j
                const index = idx * 3

                const x = positionArr[index]
                const y = positionArr[index + 1]
                const z = positionArr[index + 2]

                pos.push(x, y, z)
            }

            geometry.setPositions(pos)

            const material = this.createMaterial()

            const mesh = new THREE.Line2(geometry, material)

            this.local.add(mesh)
        }

        this.group.add(this.local)
    }
    createMaterial(){
        return new THREE.LineMaterial({
            color: this.color,
            // vertexColors: true,
            linewidth: this.linewidth,
            dashed: false,
            transparent: true,
            opacity: 1.0,
            alphaStd: -1.0
            // blending: THREE.AdditiveBlending
        })
    }


    // animate
    animate(){
        const time = window.performance.now()

        // const rx = SIMPLEX.noise2D(0.001, time * 0.0001) * 0.0125

        this.local.rotation.x += 0.002
        this.local.rotation.y -= 0.002

        this.local.children.forEach((mesh, idx) => {
            const material = mesh.material

            const n = SIMPLEX.noise2D(idx * 0.01 * (this.local.children.length - idx), time * 0.0003)

            material.uniforms['alphaStd'].value = n
        })
    }
}