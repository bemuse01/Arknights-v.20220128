class CharacterObjImageBuild{
    constructor({group, size}){
        this.group = group

        this.size = size

        this.param = {
            defaultDuration: 1.5,
            defaultDelay: 1.2,
            randomDelay: 0.8,
            maxDelayX: 0.9,
            maxDelayY: 0.125,
            xRange: 30,
            yRange: 20,
            zRange: 10,
            z: 0.1,
            stretch: 0.11,
            width: 1024,
            height: 1024,
            widthSeg: 200,
            heightSeg: 200
        }

        this.slideTime = this.param.defaultDuration + this.param.defaultDelay + this.param.randomDelay

        this.defaultSrc = 'assets/src/character/chen/chen (3).png'

        this.objects = []
        this.tweens = []

        this.init()
    }


    // open
    open(){

    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.createObject(this.defaultSrc, OUT)
    }
    createObject(src, phase){
        const img = new Image()
        img.src = src

        img.onload = () => {
            const canvas = CharacterImageMethod.createTextureFromCanvas({img, size: {w: this.param.width, h: this.param.height}, ...this.param})
            const texture = new THREE.CanvasTexture(canvas)

            const object = new PlaneObject({
                width: this.size.obj.w, 
                height: this.size.obj.h, 
                widthSeg: this.param.widthSeg, 
                heightSeg: this.param.heightSeg,
                // blending: THREE.AdditiveBlending,
                // side: THREE.DoubleSide,
                materialOpt: {
                    vertexShader: CharacterImageShader.vertex,
                    fragmentShader: CharacterImageShader.fragment,
                    transparent: true,
                    uniforms: {
                        uTexture: {value: texture},
                        uTime: {value: 0},
                        uPhase: {value: phase},
                        uOpacity: {value: 1}
                    }
                }
            })

            // const position = object.getAttribute('position')
            const {centroid} = object.getGeometry()

            const {startPosition, endPosition, control0, control1, duration, delay} = CharacterImageMethod.createAnimAttribute({
                centroid, 
                width: this.size.obj.w, 
                height: this.size.obj.h, 
                widthSeg: this.param.widthSeg, 
                heightSeg: this.param.heightSeg, 
                ...this.param,
                phase
            })

            object.setAttribute('aStartPosition', new Float32Array(startPosition), 3)
            object.setAttribute('aEndPosition', new Float32Array(endPosition), 3)
            object.setAttribute('aDuration', new Float32Array(duration), 1)
            object.setAttribute('aDelay', new Float32Array(delay), 1)

            this.group.add(object.get())

            this.objects.push(object)

            this.createTween(object, phase)
        }
    }


    // tween
    createTween(object, phase){
        const start = {time: 0, opacity: 1 - phase}
        const end = {time: this.slideTime, opacity: phase}
        const uniforms = object.getMaterial().uniforms

        const tw = new TWEEN.Tween(start)
        .to(end, 4000)
        .onUpdate(() => this.updateTween(start, uniforms))
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()

        // this.tweens.push(tw)
    }
    updateTween({time, opacity}, {uTime, uOpacity}){
        uTime.value = time
        uOpacity.value = opacity
    }



    // show
    show(){

    }


    // hide
    hide(){

    }


    // dispose
    dispose(){

    }


    // animate
    animate(){

    }
}