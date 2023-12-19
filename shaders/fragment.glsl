varying vec3 vColor;
varying vec2 vUv;

uniform float time;

void main() {
 
  gl_FragColor = vec4(vColor, 1.);
}