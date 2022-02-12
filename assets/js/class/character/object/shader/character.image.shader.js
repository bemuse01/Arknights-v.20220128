const CharacterImageShader = {
    vertex: `
        attribute vec3 aStartPosition;
        attribute vec3 aEndPosition;
        attribute vec3 aControl0;
        attribute vec3 aControl1;
        attribute float aDuration;
        attribute float aDelay;

        uniform float uTime;
        uniform int uPhase;

        varying vec2 vUv;

        ${ShaderMethod.cubicBezier()}

        void main(){
            vec3 newPosition = position;

            float p = clamp(uTime - aDelay, 0.0, aDuration) / aDuration;

            float r = uPhase == 0 ? 1.0 - p : p;

            newPosition *= r;
            newPosition += mix(aStartPosition, aEndPosition, p);
            // newPosition += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, p);

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