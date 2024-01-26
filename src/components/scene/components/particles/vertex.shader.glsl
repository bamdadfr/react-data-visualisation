varying vec3 vColor;
uniform float uSize;
uniform float uScale;

void main() {
  vColor = color;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = uSize * (uScale / length(mvPosition.xyz));
  gl_Position = projectionMatrix * mvPosition;
}
