class MenuPlayBuild{
    constructor(){
        this.src = 'assets/music/void.ogg'
        this.canPlay = false

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        this.audio = new Audio()
        this.audio.loop = true
        this.audio.src = this.src
        this.audio.volume = 0.6

        this.audio.addEventListener('canplaythrough', () => this.canPlay = true)
    }


    // play
    play(){
        if(this.canPlay){
            this.audio.play()
        }
    }


    // pause
    pause(){
        this.audio.pause()
    }


    // volume
    setVolume(volume){
        this.audio.volume = volume / 100
    }
}