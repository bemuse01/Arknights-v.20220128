class Line2Icosa{
    constructor({radius, seg, color, linewidth}){
        this.color = color
        this.linewidth = linewidth
        this.icosa = new THREE.IcosahedronGeometry(radius, seg).attributes

        this.group = new THREE.Group()

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const position = this.icosa.position
        const positionArr = position.array
        const count = position.count

        for(let i = 0; i < count / 2; i++){
            const pos = []

            for(let j = 0; j < 2; j++){
                const idx = i * 2 + j
                const index = idx * 3

                const x = positionArr[index]
                const y = positionArr[index + 1]
                const z = positionArr[index + 2]

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