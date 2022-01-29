class OpenParticleBuild{
    constructor({group, size}){
        this.size = size

        this.param = {
            count: 40,
            color: 0xffffff,
            size: 2.5,
            velX: {min: -0.3, max: 0.3},
            velY: {min: 0.75, max: 1.25}
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
            count: this.param.count,
            velX: this.param.velX,
            velY: this.param.velY,
            materialOpt: {
                vertexShader: OpenParticleShader.vertex,
                fragmentShader: OpenParticleShader.fragment,
                transparent: true,
                uniforms: {
                    uColor: {value: new THREE.Color(this.param.color)},
                    uSize: {value: this.param.size}
                }
            }
        })

        // this.object.get().rotation.x = 24 * RADIAN

        this.createAttribute()

        group.add(this.object.get())
    }
    createAttribute(){
        const position = []
        const opacity = []

        const {w, h} = this.size.obj

        for(let i = 0; i < this.param.count; i++){
            const idx = i * 3

            const x = (Math.random() * w - w / 2) * 0.3
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
        const velocity = this.object.velocity

        const position = this.object.getAttribute('position')
        const positionArr = position.array

        const opacity = this.object.getAttribute('aOpacity')
        const opacityArr = opacity.array

        const hhalf = h / 2

        for(let i = 0; i < this.param.count; i++){
            const idx = i * 3


            // position
            const {vx, vy} = velocity[i]

            positionArr[idx] += vx
            positionArr[idx + 1] += vy
            
            if(positionArr[idx + 1] > hhalf){
                positionArr[idx] = (Math.random() * w - w / 2) * 0.3
                positionArr[idx + 1] -= hhalf * 2
            }


            // opacity
            const crt = new THREE.Vector2(0, positionArr[idx + 1])
            const std = new THREE.Vector2(0, -hhalf)
            const o = (std.distanceTo(crt) / hhalf)

            opacityArr[i] = o
        }

        position.needsUpdate = true
        opacity.needsUpdate = true
    }
}