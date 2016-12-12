import { ObjectLoader, PerspectiveCamera, TorusGeometry, DirectionalLight, ShaderMaterial, Mesh } from "three"
import { ThreeScene } from "../../webgl-utils/three-scene.js"
 
export class AboutWebgl extends ThreeScene {
    
    constructor() {
        super(true)
        this.init()
    }

    init() {
        this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 )
        this.camera.position.set(0, 11, 15)
        this.camera.rotation.x = -0.1

        let material = new ShaderMaterial({
            uniforms: {
                time: { type: "f", value: 0},
            },
            vertexShader: this.getVertexShader(),
            fragmentShader: this.getFragmentShader()
        })

        let loader = new ObjectLoader()
        loader.load( 'assets/models/male-figure.json', mesh => {   
            this.mesh = new Mesh( mesh.children[0].geometry, material )
            this.mesh.rotation.x = -1.5
            this.scene.add( this.mesh )
            super.render()
        })
    }
 
    animate() {
        //this.mesh.rotation.z += 0.01
        this.mesh.material.uniforms.time.value += 0.01
    }

    onResizeWindow() {
        super.resize()
    }

    getVertexShader() {
        return `
            varying	vec3 transformedNormal;
            uniform float time;

            void main() {
                transformedNormal = normalMatrix * normal;
                vec3 pos = position + normal * 0.2 * abs(cos(3.5*time + position.x + position.y + position.z));
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
            }
        ` 
    }

    getFragmentShader() {
        return `
            varying vec3 transformedNormal;
            uniform float time;

            void main() {
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0) * transformedNormal.z;
            }
        `  
    }
}