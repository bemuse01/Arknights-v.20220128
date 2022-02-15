class CharacterElListBuild{
    constructor(){
        this.path = 'assets/src/character'

        this.el = []

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        for(let i = 0; i < CHARACTER.length; i++){
            const {name, count} = CHARACTER[i]

            for(let j = 0; j < count; j++){
                const idx = i * count + j

                this.el.push({
                    key: idx,
                    path: `${this.path}/${name}/${name} (${j + 1}).png`
                })
            }
        }
    }
}