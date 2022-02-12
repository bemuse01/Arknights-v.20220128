class CharacterObjImageBuild{
    constructor({group, size}){
        this.group = group

        this.size = size

        this.param = {
            defaultDuration: 0,
            defaultDelay: 0,
            randomDelay: 0.8,
            maxDelayX: 0.9,
            maxDelayY: 0.125,
            xRange: 30,
            yRange: 10,
            zRange: 10,
            z: 0.1,
            stretch: 0.11,
            width: 1024,
            height: 1024,
            widthSeg: 100,
            heightSeg: 100,
            tweenDuration: 2000
        }

        this.slideTime = this.param.defaultDuration + this.param.defaultDelay + this.param.randomDelay

        this.defaultSrc = 'assets/src/character/chen/chen (3).png'

        this.objects = []

        this.init()
    }


    // open
    open(){

    }


    // init
    init(){
        this.create()

        window.addEventListener('click', () => this.slide())
    }


    // create
    create(){
        const img = new Image()
        img.src = this.defaultSrc

        img.onload = () => this.createObject(img, IN)
    }
    createObject(img, phase){
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

        const {startPosition, endPosition, translate, duration} = CharacterImageMethod.createAnimAttribute({
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
        object.setAttribute('aTranslate', new Float32Array(translate), 3)
        object.setAttribute('aDuration', new Float32Array(duration), 1)

        this.group.add(object.get())

        this.objects.push({object, phase})

        this.createTween(0)
        if(this.objects.length > 1) this.createTween(1)
    }


    // tween
    createTween(idx){
        const {object, phase} = this.objects[idx]
        const start = {time: 0, opacity: 1 - phase}
        const end = {time: this.slideTime, opacity: phase}
        const uniforms = object.getMaterial().uniforms
        
        if(phase === IN) this.objects[idx].phase = OUT
        else uniforms.uPhase = OUT

        const tw = new TWEEN.Tween(start)
        .to(end, this.param.tweenDuration)
        .onUpdate(() => this.onUpdateTween(start, uniforms))
        .onComplete(() => this.onCompleteTween(idx, phase))
        // .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
    }
    onUpdateTween({time, opacity}, {uTime, uOpacity}){
        uTime.value = time
        uOpacity.value = opacity
    }
    onCompleteTween(idx, phase){
        if(phase === OUT){
            this.objects[idx].object.dispose()
            this.objects[idx].object = null
            this.objects[idx].phase = null
            this.objects.shift()
        }
    }


    // slide
    slide(){
        const img = new Image()
        const {name, count} = CHARACTER[~~(Math.random() * CHARACTER.length)]
        const num = ~~(Math.random() * count) + 1
        img.src = `assets/src/character/${name}/${name} (${num}).png`

        img.onload = () => {
            this.show(img)
        }
    }


    // show
    show(img){
        this.createObject(img, IN)
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