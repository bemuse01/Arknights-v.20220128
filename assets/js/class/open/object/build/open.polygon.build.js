class OpenPolygonBuild{
    constructor({group}){
        this.param = {
            count: 5,
            radius: 32,
            color: 0xffdd00,
            linewidth: 0.0015,
        }

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
        this.createTween()
    }


    // create
    create(group){
        const position = this.createPosition()

        this.object = new Line2Object({
            position,
            alphaStd: 0,
            color: this.param.color,
            linewidth: this.param.linewidth,
            reverse: 1,
            strength: 1
        })

        group.add(this.object.get())
    }
    createPosition(){
        const position = []

        const degree = 360 / this.param.count

        for(let i = 0; i < this.param.count; i++){
            const min = degree * i - 15
            const max = degree * i + 15
            const deg = THREE.Math.randFloat(min, max)
        
            const x = Math.cos(deg * RADIAN) * this.param.radius
            const y = Math.sin(deg * RADIAN) * this.param.radius

            if(i !== 0) position.push(x, y, 0)
            position.push(x, y, 0)
        }

        position.push(position[0], position[1], position[2])

        return position
    }


    // tween
    createTween(){
        const start = {scale: 0.6, opacity: 0}
        const end = {scale: 1.2, opacity: [0, 0.5, 1, 1, 1, 0]}
        const group = this.object.get()
        const meshes = group.children

        const tw = new TWEEN.Tween(start)
        .to(end, 1500)
        .onUpdate(() => this.onUpdateTween(meshes, start))
        .onRepeat(() => this.onRepeatTween(group))
        .easing(TWEEN.Easing.Quadratic.Out)
        .repeat(Infinity)
        .start()
    }
    onRepeatTween(group){
        group.rotation.x = Math.random() * 40 * RADIAN
        group.rotation.y = Math.random() * 40 * RADIAN
        group.rotation.z = Math.random() * 360 * RADIAN
    }
    onUpdateTween(meshes, {scale, opacity}){
        meshes.forEach(mesh => {
            mesh.scale.set(scale, scale, 1)
            mesh.material.opacity = opacity
        })
    }

    
    // 
    animate(){
        this.object.get().rotation.x += 0.002
        this.object.get().rotation.y += 0.002
    }
}