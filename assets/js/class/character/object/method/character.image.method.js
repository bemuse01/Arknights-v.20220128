const CharacterImageMethod = {
    createAttribute({width, height}){
        const uv = []

        for(let i = 0; i < width; i++){
            for(let j = 0; j < height; j++){
                uv.push(i / width, j / height)
            }
        }

        return {uv: new Float32Array(uv)}
    },
    createAnimAttribute({centroid, width, height, widthSeg, heightSeg, xRange, yRange, zRange, defaultDuration, defaultDelay, randomDelay, maxDelayX, maxDelayY, stretch, phase}){
        const array = centroid
        const startPosition = []
        const endPosition = []
        const translate = []
        const duration = []

        const w = widthSeg * 2
        const h = heightSeg
        
        for(let i = 0; i < h; i++){
            for(let j = 0; j < w; j++){
                const idx = (i * w + j) * 3 * 3
                
                const x1 = array[idx + 0]
                const y1 = array[idx + 1]
                const z1 = array[idx + 2]

                const x2 = array[idx + 3]
                const y2 = array[idx + 4]
                const z2 = array[idx + 5]
                
                const x3 = array[idx + 6]
                const y3 = array[idx + 7]
                const z3 = array[idx + 8]


                // position
                startPosition.push(x1, y1, z1)
                startPosition.push(x2, y2, z2)
                startPosition.push(x3, y3, z3)

                endPosition.push(x1, y1, z1)
                endPosition.push(x2, y2, z2)
                endPosition.push(x3, y3, z3)


                // translate
                const tx = THREE.Math.randFloat(xRange * 0.75, xRange)
                const ty = THREE.Math.randFloat(-yRange, yRange)
                const tz = Math.random() * -zRange

                translate.push(tx, ty, tz)
                translate.push(tx, ty, tz)
                translate.push(tx, ty, tz)


                // duration
                const dur = Math.random() * randomDelay + defaultDelay

                duration.push(dur, dur, dur)
            }
        }

        return {startPosition, endPosition, translate, duration}
    },
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
}