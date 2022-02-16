// import APP from './class/app/app.js'
// import MAP from './class/map/map.js'
// import OPEN from './class/open/open.js'
// import LEFT from './class/left/left.js'
// import RIGHT from './class/right/right.js'

new Vue({
    el: '#wrap',
    data(){
        return{
            objectModules: {
                app: App,
                characterObj: CharacterObj,
                effect: Effect,
                openObj: OpenObj,
            },
            elementModules: {
                menu: Menu,
                profile: Profile,
                leftEl: LeftEl,
                rightEl: RightEl,
                characterEl: CharacterEl,
                openEl: OpenEl,
            },
            elements: {
                menu: null,
                profile: null,
                leftEl: null,
                rightEl: null,
                characterEl: null,
                openEl: null,
            },
            perspective: 0,
            translate: {x: 0, y: 0},
            friction: 0.075,
            ix: 0,
            iy: 0,
            vx: 0,
            vy: 0,
            character: {
                list: false,
                click: true
            },
            volume: 60,
            isVolumeVisible: false,
            nowPlaying: false,
            mouse:{
                move: false
            }
        }
    },
    created(){
        this.$nextTick(() => {
            this.initElementNodeStyle()
        })
    },  
    mounted(){
        this.init()
    },
    watch: {
        getVolume(){
            this.getComp2('menu', 'play').setVolume(this.volume)
            // console.log(this.volume)
        }
    },
    computed: {
        setElementNodeStyle(){
            return {perspective: this.perspective + 'px'}
        },
        setLeftRightStyle(){
            return {transform: `translate(${this.translate.x}px, ${this.translate.y}px)`}
        },
        setBackgroundStyle(){
            if(!this.mouse.move) return {}
            return {transform: `translate(${-50 - this.translate.x * 0.1}%, ${-50 + this.translate.y * 0.4}%)`}
        },
        getElement(){
            return (name, child) => {
                if(!this.elements[name]) return []
                else return this.getComp2(name, child).el
            }
        },
        getStyle(){
            return (name, child) => {
                if(!this.elements[name]) return {}
                else return this.getComp2(name, child).style
            }
        },
        getText(){
            return (name, child) => {
                if(!this.elements[name]) return {}
                else return this.getComp2(name, child).text
            }
        },
        getComp(){
            return (name, child) => {
                if(!this.elements[name]) return {}
                else return this.getComp2(name, child)
            }
        },
        getVolume(){
            return this.volume
        },
        setPlayIcon(){
            return this.nowPlaying ? 'assets/src/ui/ui_stop_icon.png' : 'assets/src/ui/ui_play_icon.png'
        }
    },
    methods: {
        init(){
            this.initThree()
            this.initElement()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
            window.addEventListener('mousemove', (e) => this.onMousemove(e), false)
        },


        // three
        initThree(){
            for(const module in this.objectModules){
                const instance = this.objectModules[module]
                
                OBJECT[module] = new instance(OBJECT)
            }
        },
        resizeThree(){
            for(const i in OBJECT){
                if(!OBJECT[i].resize) continue
                OBJECT[i].resize(OBJECT)
            }
        },
        renderThree(){
            for(const i in OBJECT){
                if(!OBJECT[i].animate) continue
                OBJECT[i].animate(OBJECT)
            }
        },


        // element
        addElement(){
            for(const module in this.elementModules){
                this.elements[module] = null
            } 
        },
        initElement(){
            for(const module in this.elementModules){
                const instance = this.elementModules[module]

                this.elements[module] = new instance({...OBJECT, ...this.elements, mouse: this.mouse})
            }
        },
        resizeElement(){
            for(const i in this.elements){
                if(!this.elements[i].resize) continue
                this.elements[i].resize(OBJECT)
            }
        },
        animateElement(){
            for(const i in this.elements){
                if(!this.elements[i].animate) continue
                this.elements[i].animate(OBJECT)
            }
        },
        getComp2(name, child){
            return this.elements[name].getComp(child)
        },
        initElementNodeStyle(){
            const wrap = document.querySelector('#wrap')
            const {width} = wrap.getBoundingClientRect()

            this.perspective = width * 0.625
        },


        // element event
        toggleCharacterList(){
            this.character.list = !this.character.list
        },
        changeCharacter(path){
            if(!this.character.click) return
            this.character.click = false

            this.character.list = !this.character.list 

            OBJECT['characterObj'].getComp('image').slide(path, this.character)
        },
        toggleVolumeBar(){
            this.isVolumeVisible = !this.isVolumeVisible
        },


        // event
        onWindowResize(){
            this.initElementNodeStyle()
            this.resizeThree()
            this.resizeElement()
        },
        onMousemove(e){
            const {clientX, clientY} = e
            this.ix = clientX
            this.iy = clientY
        },
        setTranslate(){
            const wrap = document.querySelector('#wrap')
            if(!wrap) return

            const {width, height} = wrap.getBoundingClientRect()
            
            this.vx += (this.ix - this.vx) * this.friction
            this.vy += (this.iy - this.vy) * this.friction
            
            const x = (this.vx / width) * 20 - 10
            const y = -(this.vy / height) * 10 + 5

            this.translate.x = -x
            this.translate.y = y
        },
        togglePlay(){
            this.nowPlaying = !this.nowPlaying
            
            if(this.nowPlaying) this.getComp2('menu', 'play').play()
            else this.getComp2('menu', 'play').pause()
        },


        // render
        render(){
            this.renderThree()
            TWEEN.update()
        },
        animate(){
            this.render()
            this.animateElement()
            this.setTranslate()
            requestAnimationFrame(this.animate)
            // requestIdleCallback(this.animate)
        }
    }
})