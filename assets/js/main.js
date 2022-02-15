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
                profile: Profile,
                leftEl: LeftEl,
                rightEl: RightEl,
                characterEl: CharacterEl,
                openEl: OpenEl,
            },
            elements: {
                profile: null,
                leftEl: null,
                rightEl: null,
                characterEl: null,
                openEl: null,
            },
            perspective: 0,
            character: {
                list: false,
                click: true
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
    computed: {
        setElementNodeStyle(){
            return {perspective: this.perspective + 'px'}
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
        }
        // currentTime(){
        //     if(!this.elements['left']) return '00:00:00'
        //     return this.getComp('left', 'clock').getCurrentTime()
        // },
        // currentDate(){
        //     if(!this.elements['right']) return '0000.00.00.Sat'
        //     return this.getComp('right', 'date').getCurrentDate()
        // },
    },
    methods: {
        init(){
            this.initThree()
            this.initElement()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
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

                this.elements[module] = new instance({...OBJECT, ...this.elements})
            }
            console.log(OBJECT)
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


        // event
        onWindowResize(){
            this.initElementNodeStyle()
            this.resizeThree()
            this.resizeElement()
        },


        // render
        render(){
            this.renderThree()
            TWEEN.update()
        },
        animate(){
            this.render()
            this.animateElement()
            requestAnimationFrame(this.animate)
            // requestIdleCallback(this.animate)
        }
    }
})