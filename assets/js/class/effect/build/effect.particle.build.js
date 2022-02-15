class EffectParticleBuild{
    constructor({group, size}){
        this.size = size

        this.param = {
            count: 50,
            color: 0x888888,
            size: 3.0,
            velX: {min: -0.3, max: -0.2},
            velY: {min: 0.1, max: 0.2}
        }

        this.play = true

        this.init(group)
    }


    // open
    open(){
        this.createTween()
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
                vertexShader: EffectParticleShader.vertex,
                fragmentShader: EffectParticleShader.fragment,
                transparent: true,
                blending: THREE.AdditiveBlending,
                uniforms: {
                    uColor: {value: new THREE.Color(this.param.color)},
                    uSize: {value: this.param.size}
                }
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

            const x = Math.random() * w - h / 2
            const y = Math.random() * h - h / 2
            const z = 0

            position[idx] = x
            position[idx + 1] = y
            position[idx + 2] = z

            opacity[idx] = 0
        }

        this.object.setAttribute('position', new Float32Array(position), 3)
        this.object.setAttribute('aOpacity', new Float32Array(opacity), 1)
    }


    // tween
    createTween(){
        const start = {opacity: 0}
        const end = {opacity: 1}
        const o = this.object.getAttribute('aOpacity')
        const oArr = o.array

        const tw = new TWEEN.Tween(start)
        .to(end, 600)
        .delay(1000)
        .onUpdate(() => this.onUpdateTween(o, oArr, start))
        .start()
    }
    onUpdateTween(o, oArr, {opacity}){
        for(let i = 0; i < this.param.count; i++){
            oArr[i] = opacity 
        }
        o.needsUpdate = true
    }


    // animate
    animate({w, h}){
        if(!this.play) return

        const velocity = this.object.velocity

        const position = this.object.getAttribute('position')
        const positionArr = position.array

        // const opacity = this.object.getAttribute('aOpacity')
        // const opacityArr = opacity.array

        const whalf = w / 2
        const hhalf = h / 2

        for(let i = 0; i < this.param.count; i++){
            const idx = i * 3


            // position
            const {vx, vy} = velocity[i]

            positionArr[idx] += vx
            positionArr[idx + 1] += vy

            if(positionArr[idx] < -whalf){
                positionArr[idx] += whalf * 2
            }

            
            if(positionArr[idx + 1] > hhalf){
                positionArr[idx + 1] -= hhalf * 2
            }


            // opacity
            // const crt = new THREE.Vector2(0, positionArr[idx + 1])
            // const std = new THREE.Vector2(0, -hhalf)
            // const o = (std.distanceTo(crt) / hhalf)

            // opacityArr[i] = o
        }

        position.needsUpdate = true
        // opacity.needsUpdate = true
    }
}