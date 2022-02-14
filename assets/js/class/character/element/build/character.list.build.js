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
        this.el = CHARACTER.map(({name, count}, idx) => ({
            key: idx,
            children: Array.from({length: count}, (_, i) => ({
                key: i,
                path: `${this.path}/${name}/${name} (${i + 1}).png`
            }))
        }))
    }
}