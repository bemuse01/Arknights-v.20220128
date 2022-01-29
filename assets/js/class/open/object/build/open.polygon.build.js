class OpenPolygonBuild{
    constructor({group}){
        this.param = {
            count: 5,
            radius: 36,
            color: 0xffdd00,
            linewidth: 0.003,
        }

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
        const position = this.createPosition()

        this.object = new Line2Object({
            position,
            color: this.param.color,
            linewidth: this.param.linewidth
        })

        console.log(this.object.position)

        group.add(this.object.get())
    }
    createPosition(){
        const position = []

        const degree = 360 / this.param.count

        for(let i = 0; i < this.param.count; i++){
            const min = degree * i
            const max = degree * (i + 1)
            const deg = THREE.Math.randFloat(min, max)
        
            const x = Math.cos(deg * RADIAN) * this.param.radius
            const y = Math.sin(deg * RADIAN) * this.param.radius

            if(i !== 0) position.push(x, y, 0)
            position.push(x, y, 0)
        }

        position.push(position[0], position[1], position[2])

        return position
    }
}