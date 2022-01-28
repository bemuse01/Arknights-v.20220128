class IcosaEdge{
    constructor({radius, seg, position, materialOpt}){
        this.radius = radius
        this.seg = seg
        this.position = position
        this.materialOpt = materialOpt

        this.group = new THREE.Group()
        
        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        for(let i = 0; i < this.position.length / 3; i++){
            const idx = i * 3

            const x = this.position[idx]
            const y = this.position[idx + 1]
            const z = this.position[idx + 2]

            const geometry = this.createGeometry()
            const material = this.createMaterial()
            const mesh = new THREE.Mesh(geometry, material)

            mesh.position.set(x, y, z)

            this.group.add(mesh)
        }
    }
    createGeometry(){
        return new THREE.IcosahedronGeometry(this.radius, this.seg)
    }
    createMaterial(){
        return new THREE.MeshBasicMaterial(this.materialOpt)
    }


    // get
    get(){
        return this.group
    }
}