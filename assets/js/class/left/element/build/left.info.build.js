class LeftElInfoBuild{
    constructor(){
        // kr
        this.krStyle = {
            public: {fontFamily: 'BusanBada'}
        }
        this.krText = {
            friends: '친구',
            files: '파일'
        }

        // en
        this.enStyle = {
            public: {fontFamily: 'RobotoBlack', transform: 'scaleX(0.7)', transformOrigin: 'right'}
        }
        this.enText = {
            friends: 'Friends',
            files: 'Archives'
        }

        this.lang = {
            kr: {
                style: this.krStyle,
                text: this.krText
            },
            en: {
                style: this.enStyle,
                text: this.enText
            }
        }

        this.style = {
            container: {opacity: 0},
            public: {fontFamily: 'BusanBada'}
        }

        this.text = {
            friends: '친구',
            files: '파일'
        }

        this.canvasWrap = document.querySelector('.news-visualizer')
        const {width, height} = this.canvasWrap.getBoundingClientRect()

        this.canvas = document.querySelector('.news-visualizer canvas')
        this.canvas.width = width
        this.canvas.height = height

        this.ctx = this.canvas.getContext('2d')

        this.param = {
            count: 50,
            gap: 0.2,
            smooth: 4,
            // rd: 0.8,
            color: '255, 255, 255',
            audioDecrease: 0.98,
            audioIncrease: 0.02,
            peakValue: 0.2
        }

        this.w = Array.from({length: this.param.count}, () => 0)
        this.index = Array.from({length: this.param.count}, (_, i) => i)

        this.init()
    }


    // open 
    open(){
        this.createTween()
    }


    // init
    init(){
        window.wallpaperRegisterAudioListener = function(callback){
            const arr = Array.from({length: 128}, () => ~~(Math.random() * 256))
            setInterval(() => callback(arr), 1000)
        }

        if(window.wallpaperRegisterAudioListener){
            window.wallpaperRegisterAudioListener((audioArray) => this.wallpaperAudioListener(audioArray))
        }
    }


    // set language
    setLanguage(lang){
        for(const prop in this.lang[lang].style){
            const style = this.lang[lang].style
            this.style[prop] = style[prop]
        }

        for(const prop in this.lang[lang].text){
            const text = this.lang[lang].text
            this.text[prop] = text[prop]
        }
    }


    // create
    addPinkNoise({audioData, audioDecrease = 0.98, audioIncrease = 0.02, peakValue = 0.2}){
        let max = 0
        const data = []
        const finalProcessing = []
        
        for(let i = 0; i < audioData.length; i++){
            const samp = ((audioData[i] + audioData[i + 1]) / 2) ** 2
            data.push(samp)
            
            if(data[i] > max) max = data[i]
        }

        peakValue = peakValue * audioDecrease + max * audioIncrease

        for(let i = 0; i < data.length; i++){
            data[i] /= peakValue

            if(data[i] > 1.0){
                data[i] = 1.0
            }
        }

        for (let i = 0; i < data.length; i++){
            if(i == 0 || i == data.length - 1){
                finalProcessing[i] = data[i]
            }else{
                finalProcessing[i] = (data[i - 1] * 2 + data[i] * 3 + data[i + 1] * 2) / 7
            }
        }

        return finalProcessing
    }
    drawCanvas({ctx, color, count, buffer, width, height, gap, smooth, w}){
        const g = Math.round((width * gap) / (count - 1))
        const size = Math.ceil((width - width * gap) / count)

        ctx.clearRect(0, 0, width, height)

     
        for(let i = 0; i < count; i++){
            const buf = buffer[i]

            if(w[i] < buf) {
                w[i] += (buf - w[i]) / smooth
            } else if (w[i] > buf) {
                w[i] -= (w[i] - buf) / smooth
            }
    
            const alpha = (w[i] / height) * 0.75 + 0.25
            ctx.fillStyle = `rgba(${color}, ${alpha})`
            ctx.fillRect(i * size + i * g, 0, size, w[i])
        }
    }


    // tween
    createTween(){
        const {opacity, time, delayBase, delayRand} = leftElParam

        const start = {opacity: 0}
        const end = {opacity}
        const delay = Math.random() * delayRand + delayBase

        const tw = new TWEEN.Tween(start)
        .to(end, time)
        .delay(delay)
        .onUpdate(() => this.onUpdateTween(start))
        .start()
    }
    onUpdateTween({opacity}){
        this.style.container.opacity = opacity
    }


    // resize
    resize(){
        const {width, height} = this.canvasWrap.getBoundingClientRect()

        this.canvas.width = width
        this.canvas.height = height
    }


    // audio listener
    wallpaperAudioListener(audioData){
        const {width, height} = this.canvasWrap.getBoundingClientRect()
        const data = this.addPinkNoise({audioData, ...this.param})
        const buffer = data.map(e => e * height)
        this.drawCanvas({ctx: this.ctx, ...this.param, width, height, buffer, w: this.w})
    }
}