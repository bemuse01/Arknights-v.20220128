class Particle{
    constructor({materialOpt}){
        this.materialOpt = materialOpt

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
        this.mesh = new THREE.Points(this.geometry, this.material)
    }
    createGeometry(){
        this.geometry = new THREE.BufferGeometry()
    }
    createMaterial(){
        if(this.materialOpt.vertexShader){
            this.material = new THREE.ShaderMaterial(this.materialOpt)
        }else{
            this.material = new THREE.PointsMaterial(this.materialOpt)
        }
    }


    // set
    setAttribute(name, array, itemSize){
        this.geometry.setAttribute(name, new THREE.BufferAttribute(array, itemSize))
    }


    // get
    getGeometry(){
        return this.geometry
    }
    getMaterial(){
        return this.material
    }
}