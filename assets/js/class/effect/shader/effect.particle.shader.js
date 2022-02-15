const EffectParticleShader = {
    vertex: `
        attribute float aOpacity;

        uniform float uSize;

        varying float vOpacity;

        void main(){
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = uSize;

            vOpacity = aOpacity;
        }
    `,
    fragment: `
        uniform vec3 uColor;

        varying float vOpacity;

        void main(){
            gl_FragColor = vec4(uColor, vOpacity);
        }
    `
}