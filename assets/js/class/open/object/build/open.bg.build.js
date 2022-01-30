class OpenBgBuild{
    constructor({group, size}){
        this.size = size
        this.src = './assets/src/open_bg.png'

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
        const img = new Image()
        img.src = this.src

        img.onload = () => {
            const canvas = this.createTextureFromCanvas({img, size: this.size.el})
            const texture = new THREE.CanvasTexture(canvas)

            const geometry = this.createGeometry()
            const material = new THREE.MeshBasicMaterial({map: texture})
            this.mesh = new THREE.Mesh(geometry, material)

            group.add(this.mesh)
        }
    }
    createGeometry(){
        return  new THREE.PlaneGeometry(this.size.obj.w, this.size.obj.h, 1, 1)
    }
    createTextureFromCanvas({img, size}){
        const {w, h} = size

        const ctx = document.createElement('canvas').getContext('2d')
        ctx.canvas.width = w
        ctx.canvas.height = h

        const x = 0
        const y = 0
        const offsetX = 0.5
        const offsetY = 0.5

        let iw = img.width
        let ih = img.height
        let r = Math.min(w / iw, h / ih)
        let nw = iw * r
        let nh = ih * r
        let cx, cy, cw, ch, ar = 1

        if (nw < w) ar = w / nw
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh
        nw *= ar
        nh *= ar

        cw = iw / (nw / w)
        ch = ih / (nh / h)

        cx = (iw - cw) * offsetX
        cy = (ih - ch) * offsetY

        if (cx < 0) cx = 0
        if (cy < 0) cy = 0
        if (cw > iw) cw = iw
        if (ch > ih) ch = ih

        ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h)

        return ctx.canvas
    }


    // resize
    resize(size){
        this.size = size

        this.mesh.geometry.dispose()
        this.mesh.geometry = this.createGeometry()

        const img = new Image()
        img.src = this.src

        img.onload = () => {
            const canvas = this.createTextureFromCanvas({img, size: this.size.el})
            const texture = new THREE.CanvasTexture(canvas)

            this.mesh.material.map.dispose()
            this.mesh.material.map = texture
        }
    }
}