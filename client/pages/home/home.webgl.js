import {Scene, Color, PerspectiveCamera, BoxGeometry, ShaderMaterial, Mesh, WebGLRenderer} from "three"
import { ThreeScene } from "../../webgl-utils/three-scene.js"
 
export class HomeWebgl extends ThreeScene {
    
    constructor() {
        super(true)
        this.init()
    }

    init() {
        this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 )
        this.camera.position.z = 250
    
        this.colors = [
            new Color (0x0f5b70),
            new Color (0x662543),
            new Color(0x383e68),
            new Color(0x2c0047)
        ]

        let geometry =  new BoxGeometry( 1000, 500, 200 )
        this.uniforms = {
            time: { type: "f", value: 0},
            scale: { type: "f", value: 1},
            frequency: { type: "f", value: 2.6},
            noiseScale: { type: "f", value: 6.4},
            ringScale: { type: "f", value: 0.6},
            color1: { type: "c", value: this.colors[0] },
            color2: { type: "c", value: this.colors[2] }
        }
        let material = new ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.getVertexShader(),
            fragmentShader: this.getFragmentShader()
        })
    
        this.mesh = new Mesh( geometry, material )
        this.scene.add( this.mesh )
    
        this.renderer.setClearColor( 0x123456 )
        super.render()
    }
 
    animate() {
        this.uniforms.time.value += 0.005
        this.uniforms.color2.value = this.colors[0].lerp(this.colors[1], Math.abs(Math.cos(this.uniforms.time.value)))
        this.uniforms.color1.value = this.colors[2].lerp(this.colors[3], Math.abs(Math.cos(this.uniforms.time.value/2)))
    }

    onResizeWindow() {
        super.resize()
    }

    getVertexShader() {
         return `
            uniform float scale;
            varying vec3 vPosition;
            void main() {
                vPosition = normalize(position) * scale;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
        ` 
    }

    getFragmentShader() {
        return `
            uniform vec3 color1;
            uniform vec3 color2;
            uniform float frequency;
            uniform float noiseScale;
            uniform float ringScale;
            uniform float time;
            varying vec3 vPosition;

            vec3 mod289(vec3 x) {
                return x - floor(x * (1.0 / 289.0)) * 289.0;
            }

            vec4 mod289(vec4 x) {
                return x - floor(x * (1.0 / 289.0)) * 289.0;
            }

            vec4 permute(vec4 x) {
                return mod289(((x*34.0)+1.0)*x);
            }

            vec4 taylorInvSqrt(vec4 r) {
                return 1.79284291400159 - 0.85373472095314 * r;
            }

            float snoise(vec3 v) { 
                const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

                // First corner
                vec3 i  = floor(v + dot(v, C.yyy) );
                vec3 x0 =   v - i + dot(i, C.xxx) ;

                // Other corners
                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min( g.xyz, l.zxy );
                vec3 i2 = max( g.xyz, l.zxy );

                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
                vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

                // Permutations
                i = mod289(i); 
                vec4 p = permute( permute( permute( 
                        i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                        + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                        + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

                // Gradients: 7x7 points over a square, mapped onto an octahedron.
                // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
                float n_ = 0.142857142857; // 1.0/7.0
                vec3  ns = n_ * D.wyz - D.xzx;

                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);

                vec4 b0 = vec4( x.xy, y.xy );
                vec4 b1 = vec4( x.zw, y.zw );

                //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
                //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));

                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

                vec3 p0 = vec3(a0.xy,h.x);
                vec3 p1 = vec3(a0.zw,h.y);
                vec3 p2 = vec3(a1.xy,h.z);
                vec3 p3 = vec3(a1.zw,h.w);

                //Normalise gradients
                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;

                // Mix final noise value
                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * 2.0*abs(cos(time*0.01)) * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                            dot(p2,x2), dot(p3,x3) ) );
            }

            void main() {
                float n = snoise(vPosition);
                float ring = fract(frequency * time * vPosition.z + noiseScale * n);
                ring *= 4.0 * (1.0 - ring);
                // Adjust ring smoothness and shape, and add some noise
                float lrp = pow(ring, ringScale) + n*-1.0*abs(sin(time));
                vec3 base = mix(color1, color2, lrp);
                gl_FragColor = vec4(base, 1.0);
            }
        `   
    }
}