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
            width: 2048,
            height: 2048,
            widthSeg: 200,
            heightSeg: 200,
            tweenDuration: 2000
        }

        this.slideTime = this.param.defaultDuration + this.param.defaultDelay + this.param.randomDelay

        this.defaultSrc = 'assets/src/character/chen/chen (3).png'

        this.objects = []

        this.character = null

        this.init()
    }


    // open
    open(){
        const img = new Image()
        img.src = this.defaultSrc

        img.onload = () => {
            this.show(img)
        }
    }


    // init
    init(){
        this.create()

        // window.addEventListener('click', () => this.slide())
    }


    // create
    create(){
        this.createObject(null, IN)
        this.createObject(null, IN)
    }
    createTexture(img){
        if(img){
            const canvas = CharacterImageMethod.createTextureFromCanvas({img, size: {w: this.param.width, h: this.param.height}, ...this.param})
            return new THREE.CanvasTexture(canvas)
        }else{
            return null
        }
    }
    createObject(img, phase){
        const texture = this.createTexture(img)

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

        this.objects.push({obj: object, phase})
    }


    // tween
    createTween(item){
        const {obj, phase} = item
        const start = {time: 0, opacity: 1 - phase}
        const end = {time: this.slideTime, opacity: phase}
        const uniforms = obj.getMaterial().uniforms

        const tw = new TWEEN.Tween(start)
        .to(end, this.param.tweenDuration)
        .delay(600)
        .onUpdate(() => this.onUpdateTween(start, uniforms))
        .onComplete(() => this.onCompleteTween(item, phase))
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start()
    }
    onUpdateTween({time, opacity}, {uTime, uOpacity}){
        uTime.value = time
        uOpacity.value = opacity
    }
    onCompleteTween(item, phase){
        if(phase === OUT){
            item.phase = IN
            item.obj.getUniform('uTexture').dispose()
            item.obj.setUniform('uTexture', null)
        }else{
            item.phase = OUT
            if(this.character) this.character.click = true
        }
    }


    // slide
    slide(src, character){
        this.character = character

        const img = new Image()
        img.src = src

        // const {name, count} = CHARACTER[~~(Math.random() * CHARACTER.length)]
        // const num = ~~(Math.random() * count) + 1
        // img.src = `assets/src/character/${name}/${name} (${num}).png`

        img.onload = () => {
            this.hide()
            this.show(img)
        }
    }


    // show
    show(img){
        const item = this.objects.find(e => e.phase === IN)
        
        // item.phase = IN

        item.obj.setUniform('uPhase', IN)
        item.obj.setUniform('uTexture', this.createTexture(img))
        item.obj.setUniform('uOpacity', 0)
        item.obj.setUniform('uTime', 0)

        this.createTween(item)
    }


    // hide
    hide(){
        const item = this.objects.find(e => e.phase === OUT)
     
        // item.phase = OUT

        item.obj.setUniform('uPhase', OUT)
        item.obj.setUniform('uOpacity', 1)
        item.obj.setUniform('uTime', 0)

        this.createTween(item)
    }


    // animate
    animate(){

    }
}