// GradientBackground.tsx の背景（グラデーション + ノイズ + 揺れる旗 + グリッド）を
// 1 枚の fragment shader に移植したもの。
// 旗は元実装では頂点を動かしていたため、ここでは画面座標から旗の UV を逆算して近似している。
precision highp float;

/** @resolution */
uniform vec2 u_resolution;

/** @time */
uniform float u_time;

/**
 * @label Top Color
 * @color
 * @default #4a4a4a
 */
uniform vec3 u_top;

/**
 * @label Middle Color
 * @color
 * @default #202020
 */
uniform vec3 u_middle;

/**
 * @label Bottom Color
 * @color
 * @default #000000
 */
uniform vec3 u_bottom;

/**
 * @label Noise Intensity
 * @default 30
 * @range 0, 100
 */
uniform float u_noise;

/**
 * @label Wave Speed
 * @default 0.5
 * @range 0, 2
 */
uniform float u_waveSpeed;

/**
 * @label Wave Amplitude
 * @default 0.3
 * @range 0, 1
 */
uniform float u_waveAmplitude;

/**
 * @label Flag Opacity (%)
 * @default 8
 * @range 0, 100
 */
uniform float u_flagOpacity;

/**
 * @label Grid Color
 * @color
 * @default #ffffff
 */
uniform vec3 u_gridColor;

/**
 * @label Grid Opacity
 * @default 0.1
 * @range 0, 1
 */
uniform float u_gridOpacity;

/**
 * @label Grid Size (px)
 * @default 192
 * @range 32, 512
 */
uniform float u_gridSize;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float flagWave(vec2 uv) {
  float t = u_time;
  float w1 = snoise(vec2(uv.x * 3.0 - t * u_waveSpeed, uv.y * 2.0)) * u_waveAmplitude;
  float w2 = snoise(vec2(uv.x * 5.0 - t * u_waveSpeed * 1.3, uv.y * 3.0 + t * 0.5)) * u_waveAmplitude * 0.5;
  float w3 = snoise(vec2(uv.x * 2.0 - t * u_waveSpeed * 0.8, uv.y * 4.0 - t * 0.3)) * u_waveAmplitude * 0.3;
  return w1 + w2 + w3;
}

// CSS の .bg-grid: タイル中央寄せ、各辺から 12% の位置に 1px の線
float gridLine(float coord, float size, float res) {
  float offset = mod((res - size) * 0.5, size);
  float local = mod(coord - offset, size);
  float a = size * 0.12;
  float b = size * 0.88;
  float l1 = step(a, local) * step(local, a + 1.0);
  float l2 = step(b - 1.0, local) * step(local, b);
  return max(l1, l2);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 p = frag / u_resolution;

  // 1. 3 色の縦グラデーション + ノイズ
  vec3 color = p.y > 0.5
    ? mix(u_middle, u_top, (p.y - 0.5) * 2.0)
    : mix(u_bottom, u_middle, p.y * 2.0);
  color += (random(p * 1000.0 + u_time * 0.0001) - 0.5) * u_noise / 255.0;

  // 2. 旗（PerspectiveCamera fov75, z=2 から見た 8x5 の平面を逆算）
  float halfH = 2.0 * tan(radians(37.5));
  float aspect = u_resolution.x / u_resolution.y;
  vec2 world = vec2((p.x - 0.5) * 2.0 * halfH * aspect, (p.y - 0.5) * 2.0 * halfH);
  vec2 uv = (world + vec2(4.0, 2.5)) / vec2(8.0, 5.0);
  float wave = flagWave(uv);
  // z 方向の変位による遠近の歪みを 1 回の固定点反復で近似
  float z = wave * uv.x;
  world *= (2.0 - z) / 2.0;
  world.y -= sin(uv.x * 10.0 - u_time * u_waveSpeed * 2.0) * 0.02 * uv.x;
  uv = (world + vec2(4.0, 2.5)) / vec2(8.0, 5.0);
  wave = flagWave(uv);

  float brightness = 0.3 + wave * 0.5;
  float pattern = sin(uv.x * 20.0 - u_time * 2.0) * 0.05 + 0.5;
  vec3 flagColor = vec3(brightness + pattern);
  float alpha = u_flagOpacity / 100.0;
  alpha *= smoothstep(0.0, 0.1, uv.x) * smoothstep(1.0, 0.9, uv.x);
  alpha *= smoothstep(0.0, 0.1, uv.y) * smoothstep(1.0, 0.9, uv.y);
  color = mix(color, flagColor, alpha);

  // 3. グリッド
  float grid = max(gridLine(frag.x, u_gridSize, u_resolution.x), gridLine(frag.y, u_gridSize, u_resolution.y));
  color = mix(color, u_gridColor, grid * u_gridOpacity);

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
