const CharacterImageShader = {
    vertex: `
        attribute vec3 aStartPosition;
        attribute vec3 aEndPosition;
        attribute vec3 aTranslate;
        attribute float aDuration;

        uniform float uTime;
        uniform int uPhase;

        varying vec2 vUv;

        ${ShaderMethod.cubicBezier()}

        void main(){
            vec3 newPosition = position;

            float p = clamp(uTime, 0.0, aDuration) / aDuration;

            float r = uPhase == 0 ? 1.0 - p : p;
            
            vec3 start = aStartPosition;
            vec3 end = aEndPosition;

            if(uPhase == 0){
                end += aTranslate * -1.0;
            }else{
                start += aTranslate;
            }

            newPosition *= r;
            newPosition += mix(start, end, p);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

            vUv = uv;
        }
    `,
    fragment: `
        uniform sampler2D uTexture;
        uniform float uOpacity;

        varying vec2 vUv;

        void main(){
            vec4 tex = texture(uTexture, vUv);

            tex.a *= uOpacity;

            gl_FragColor = tex;
        }
    `
}