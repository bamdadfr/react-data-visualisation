varying vec3 vColor;
uniform float uOpacity;

void main() {
  gl_FragColor = vec4(vColor, uOpacity);
}
