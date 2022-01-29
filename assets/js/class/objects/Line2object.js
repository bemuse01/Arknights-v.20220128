class Line2Object{
    constructor({position, color, linewidth}){
        this.color = color
        this.linewidth = linewidth
        this.position = position

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
            alphaStd: -1.0
            // blending: THREE.AdditiveBlending
        })
    }


    // dispose
    dispose(){

    }


    // get
    get(){
        return this.group
    }
    getPosition(){
        return this.icosa.position
    }
}