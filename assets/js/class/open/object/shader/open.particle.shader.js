const OpenParticleShader = {
    vertex: `
        // attribute float aOpacity;

        uniform float uSize;

        void main(){
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = uSize;
        }
    `,
    fragment: `
        uniform vec3 uColor;

        void main(){
            gl_FragColor = vec4(uColor, 1.0);
        }
    `
}