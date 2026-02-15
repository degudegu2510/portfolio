import { useEffect, useRef } from "react"
import * as THREE from "three"

const COLORS = {
  dark: { top: "#787878", middle: "#3c3c3c", bottom: "#000000" },
  light: { top: "#ffffff", middle: "#f5f5f5", bottom: "#e8e8e8" },
} as const

const MAX_PIXEL_RATIO = 1.5
const NOISE_INTENSITY = 30
const WAVE_SPEED = 0.5
const WAVE_AMPLITUDE = 0.3
const FLAG_OPACITY = 8

const backgroundVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const backgroundFragmentShader = `
  uniform vec3 uTopColor;
  uniform vec3 uMiddleColor;
  uniform vec3 uBottomColor;
  uniform float uNoiseIntensity;
  uniform float uTime;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec3 color;
    if (vUv.y > 0.5) {
      float t = (vUv.y - 0.5) * 2.0;
      color = mix(uMiddleColor, uTopColor, t);
    } else {
      float t = vUv.y * 2.0;
      color = mix(uBottomColor, uMiddleColor, t);
    }
    float noise = (random(vUv * 1000.0 + uTime * 0.0001) - 0.5) * uNoiseIntensity / 255.0;
    color += noise;
    gl_FragColor = vec4(color, 1.0);
  }
`

const flagVertexShader = `
  uniform float uTime;
  uniform float uWaveSpeed;
  uniform float uWaveAmplitude;
  varying vec2 vUv;
  varying float vWave;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float wave1 = snoise(vec2(uv.x * 3.0 - uTime * uWaveSpeed, uv.y * 2.0)) * uWaveAmplitude;
    float wave2 = snoise(vec2(uv.x * 5.0 - uTime * uWaveSpeed * 1.3, uv.y * 3.0 + uTime * 0.5)) * uWaveAmplitude * 0.5;
    float wave3 = snoise(vec2(uv.x * 2.0 - uTime * uWaveSpeed * 0.8, uv.y * 4.0 - uTime * 0.3)) * uWaveAmplitude * 0.3;
    float totalWave = wave1 + wave2 + wave3;
    pos.z += totalWave * uv.x;
    pos.y += sin(uv.x * 10.0 - uTime * uWaveSpeed * 2.0) * 0.02 * uv.x;
    vWave = totalWave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const flagFragmentShader = `
  uniform float uOpacity;
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    float brightness = 0.3 + vWave * 0.5;
    float pattern = sin(vUv.x * 20.0 - uTime * 2.0) * 0.05 + 0.5;
    vec3 color = vec3(brightness + pattern);
    float alpha = uOpacity / 100.0;
    alpha *= smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
    alpha *= smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
    gl_FragColor = vec4(color, alpha);
  }
`

const getIsDark = () => {
  const colorScheme = document.documentElement.style.colorScheme
  if (colorScheme === "dark") return true
  if (colorScheme === "light") return false
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

const getPixelRatio = () => Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO)

export const GradientBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const colors = getIsDark() ? COLORS.dark : COLORS.light

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 2

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(getPixelRatio())
    container.appendChild(renderer.domElement)

    // Background
    const backgroundMaterial = new THREE.ShaderMaterial({
      vertexShader: backgroundVertexShader,
      fragmentShader: backgroundFragmentShader,
      uniforms: {
        uTopColor: { value: new THREE.Color(colors.top) },
        uMiddleColor: { value: new THREE.Color(colors.middle) },
        uBottomColor: { value: new THREE.Color(colors.bottom) },
        uNoiseIntensity: { value: NOISE_INTENSITY },
        uTime: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    })

    const backgroundGeometry = new THREE.PlaneGeometry(2, 2)
    const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial)
    backgroundMesh.position.z = -5
    scene.add(backgroundMesh)

    // Flag
    const flagMaterial = new THREE.ShaderMaterial({
      vertexShader: flagVertexShader,
      fragmentShader: flagFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uWaveSpeed: { value: WAVE_SPEED },
        uWaveAmplitude: { value: WAVE_AMPLITUDE },
        uOpacity: { value: FLAG_OPACITY },
      },
      transparent: true,
      side: THREE.DoubleSide,
    })

    const flagGeometry = new THREE.PlaneGeometry(8, 5, 40, 30)
    const flagMesh = new THREE.Mesh(flagGeometry, flagMaterial)
    scene.add(flagMesh)

    // Animation
    const clock = new THREE.Clock()
    let animationId: number

    if (prefersReducedMotion) {
      renderer.render(scene, camera)
    } else {
      const animate = () => {
        const elapsedTime = clock.getElapsedTime()
        backgroundMaterial.uniforms.uTime.value = elapsedTime
        flagMaterial.uniforms.uTime.value = elapsedTime
        renderer.render(scene, camera)
        animationId = requestAnimationFrame(animate)
      }
      animate()
    }

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(getPixelRatio())
      renderer.setSize(window.innerWidth, window.innerHeight)
      if (prefersReducedMotion) {
        renderer.render(scene, camera)
      }
    }
    window.addEventListener("resize", handleResize)

    // Theme change
    const updateColors = () => {
      const c = getIsDark() ? COLORS.dark : COLORS.light
      backgroundMaterial.uniforms.uTopColor.value.set(c.top)
      backgroundMaterial.uniforms.uMiddleColor.value.set(c.middle)
      backgroundMaterial.uniforms.uBottomColor.value.set(c.bottom)
      if (prefersReducedMotion) {
        renderer.render(scene, camera)
      }
    }

    // ModeSelector による colorScheme 変更を検知
    const observer = new MutationObserver(() => updateColors())
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    })

    // auto モード時の OS テーマ変更を検知
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleMediaChange = () => updateColors()
    mediaQuery.addEventListener("change", handleMediaChange)

    return () => {
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
      mediaQuery.removeEventListener("change", handleMediaChange)
      cancelAnimationFrame(animationId)
      backgroundGeometry.dispose()
      backgroundMaterial.dispose()
      flagGeometry.dispose()
      flagMaterial.dispose()
      renderer.dispose()
      if (container.firstChild) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0" aria-hidden="true">
      <div className="bg-grid absolute inset-0" />
    </div>
  )
}
