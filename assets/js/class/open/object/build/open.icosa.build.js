class OpenIcosaBuild{
    constructor({group}){
        this.param = {
            radius: 36,
            seg: 1,
            color: 0xffdd00,
            linewidth: 0.003
        }

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
        this.object = new Line2Icosa({
            radius: this.param.radius,
            seg: this.param.seg,
            linewidth: this.param.linewidth,
            color: this.param.color, 
            group
        })
    }


    // animate
    animate(){
        this.object.animate()
    }
}