import { useEffect, useRef } from "react"
import fragmentShaderSource from "./gradientBackground.glsl?raw"

// design/gradient-background.pen と同じシェーダーを WebGL で直接描画する
const COLORS = {
  dark: { top: "#4a4a4a", middle: "#202020", bottom: "#000000" },
  light: { top: "#ffffff", middle: "#f5f5f5", bottom: "#e8e8e8" },
} as const

const MAX_PIXEL_RATIO = 1.5
const NOISE_INTENSITY = 30
const WAVE_SPEED = 0.5
const WAVE_AMPLITUDE = 0.3
const FLAG_OPACITY = 8
// グリッドは CSS の .bg-grid で描画する（デバイスピクセルに合わせてくっきり描けるため）
const GRID_OPACITY = 0

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

const getIsDark = () => {
  const colorScheme = document.documentElement.style.colorScheme
  if (colorScheme === "dark") return true
  if (colorScheme === "light") return false
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

const getPixelRatio = () => Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO)

const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

interface Props {
  isAnimating?: boolean
}

export const GradientBackground = ({ isAnimating = true }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isAnimatingRef = useRef(isAnimating)

  useEffect(() => {
    isAnimatingRef.current = isAnimating
  }, [isAnimating])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false })
    if (!gl) return

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    // 画面全体を覆う 1 枚の三角形
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const positionLocation = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const uniform = (name: string) => gl.getUniformLocation(program, name)
    const uResolution = uniform("u_resolution")
    const uTime = uniform("u_time")
    const uTop = uniform("u_top")
    const uMiddle = uniform("u_middle")
    const uBottom = uniform("u_bottom")

    gl.uniform1f(uniform("u_noise"), NOISE_INTENSITY)
    gl.uniform1f(uniform("u_waveSpeed"), WAVE_SPEED)
    gl.uniform1f(uniform("u_waveAmplitude"), WAVE_AMPLITUDE)
    gl.uniform1f(uniform("u_flagOpacity"), FLAG_OPACITY)
    gl.uniform3f(uniform("u_gridColor"), 1, 1, 1)
    gl.uniform1f(uniform("u_gridOpacity"), GRID_OPACITY)
    gl.uniform1f(uniform("u_gridSize"), 192)

    const updateColors = () => {
      const c = getIsDark() ? COLORS.dark : COLORS.light
      gl.uniform3fv(uTop, hexToRgb(c.top))
      gl.uniform3fv(uMiddle, hexToRgb(c.middle))
      gl.uniform3fv(uBottom, hexToRgb(c.bottom))
    }

    const resize = () => {
      const ratio = getPixelRatio()
      canvas.width = Math.floor(window.innerWidth * ratio)
      canvas.height = Math.floor(window.innerHeight * ratio)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uResolution, canvas.width, canvas.height)
    }

    const render = (time: number) => {
      gl.uniform1f(uTime, time)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    updateColors()
    resize()

    // Animation
    let accumulatedTime = 0
    let lastTime = performance.now()
    let wasAnimating = isAnimatingRef.current
    let needsRender = false
    let animationId: number

    const animate = () => {
      const now = performance.now()
      if (isAnimatingRef.current) {
        if (!wasAnimating) {
          lastTime = now
          wasAnimating = true
        }
        accumulatedTime += (now - lastTime) / 1000
        lastTime = now
        render(accumulatedTime)
      } else {
        wasAnimating = false
        lastTime = now
        if (needsRender) {
          render(accumulatedTime)
          needsRender = false
        }
      }
      animationId = requestAnimationFrame(animate)
    }

    // Initial render
    render(accumulatedTime)
    animate()

    // Resize
    const handleResize = () => {
      resize()
      needsRender = true
    }
    window.addEventListener("resize", handleResize)

    // Theme change
    const handleThemeChange = () => {
      updateColors()
      needsRender = true
    }

    // ModeSelector による colorScheme 変更を検知
    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    })

    // auto モード時の OS テーマ変更を検知
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", handleThemeChange)

    return () => {
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
      mediaQuery.removeEventListener("change", handleThemeChange)
      cancelAnimationFrame(animationId)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [])

  return (
    <div className="fixed inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="bg-grid absolute inset-0" />
    </div>
  )
}
