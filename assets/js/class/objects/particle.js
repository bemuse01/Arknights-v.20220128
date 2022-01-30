class Particle{
    constructor({count, materialOpt, velX, velY}){
        this.velocity = Array.from({length: count}, () => ({
            vx: THREE.Math.randFloat(velX.min, velX.max),
            vy: THREE.Math.randFloat(velY.min, velY.max)
        }))

        this.materialOpt = materialOpt

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()
        this.mesh = new THREE.Points(geometry, material)
    }
    createGeometry(){
        return new THREE.BufferGeometry()
    }
    createMaterial(){
        if(this.materialOpt.vertexShader){
            return new THREE.ShaderMaterial(this.materialOpt)
        }else{
            return new THREE.PointsMaterial(this.materialOpt)
        }
    }


    // dispose
    dispose(){
        this.mesh.geometry.dispose()
        this.mesh.material.dispose()
    }


    // set
    setAttribute(name, array, itemSize){
        this.getGeometry().setAttribute(name, new THREE.BufferAttribute(array, itemSize))
    }


    // get
    get(){
        return this.mesh
    }
    getGeometry(){
        return this.mesh.geometry
    }
    getMaterial(){
        return this.mesh.material
    }
    getAttribute(name){
        return this.getGeometry().attributes[name]
    }
}