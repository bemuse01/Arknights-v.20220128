class OpenParticleBuild{
    constructor({group, size}){
        this.size = size

        this.param = {
            count: 50,
            color: 0xffffff,
            size: 1.0
        }

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
        this.object = new Particle({
            vertexShader: OpenParticleShader.vertex,
            fragmentShader: OpenParticleShader.fragment,
            transparent: true,
            uniforms: {
                uColor: {value: this.param.color},
                uSize: {value: this.param.size}
            }
        })

        this.createAttribute()

        group.add(this.object.get())
    }
    createAttribute(){
        const position = []
        const opacity = []

        const {w, h} = this.size.obj

        for(let i = 0; i < this.param.count; i++){
            const idx = i * 3

            const x = (Math.random() * w - w / 2) * 0.2
            const y = Math.random() * h - h / 2
            const z = 0

            position[idx] = x
            position[idx + 1] = y
            position[idx + 2] = z

            opacity[idx] = 1
        }

        this.object.setAttribute('position', new Float32Array(position), 3)
        this.object.setAttribute('aOpacity', new Float32Array(opacity), 1)
    }


    // animate
    animate({w, h}){

    }
}