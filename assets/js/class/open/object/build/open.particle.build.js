class OpenParticleBuild{
    constructor({group}){
        this.param = {
            count: 50,
            color: 0xffffff
        }

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
    }


    // animate
    animate(){
        this.object.animate()
    }
}