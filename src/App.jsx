import { useEffect, useState } from 'react'
import { message } from './data/message'
import './App.css'

const seededNoise = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

const createHeartFlowers = () => {
  const result = []
  let id = 0

  for (let y = -1.15; y <= 1.2; y += 0.105) {
    for (let x = -1.25; x <= 1.25; x += 0.105) {
      const equation = Math.pow(x * x + y * y - 1, 3) - x * x * Math.pow(y, 3)

      if (equation <= 0) {
        result.push({
          id,
          x: 50 + x * 29 + (seededNoise(id + 10) - 0.5) * 1.4,
          y: 43 - y * 30 + (seededNoise(id + 30) - 0.5) * 1.4,
          size: 14 + Math.floor(seededNoise(id + 50) * 8),
          rotation: -18 + seededNoise(id + 70) * 36,
          delay: seededNoise(id + 90) * 5.5,
          drift: -2 + seededNoise(id + 110) * 4,
        })
        id += 1
      }
    }
  }

  return result
}

const flowers = createHeartFlowers()

function Sunflower({ size, rotation, delay, drift = 0, className = '' }) {
  return (
    <span className={`sunflower ${className}`} style={{ '--flower-size': `${size}px`, '--flower-rotation': `${rotation}deg`, '--flower-delay': `${delay}s`, '--flower-drift': `${drift}deg` }} aria-hidden="true">
      <span className="petals" />
      <span className="flower-center" />
    </span>
  )
}

function Tree() {
  return (
    <svg className="tree" viewBox="0 0 500 520" aria-hidden="true">
      <path className="trunk" d="M250 515 C248 440 249 370 250 300 C251 240 250 195 252 145" />
      <path className="branch branch-one" d="M250 330 C218 295 187 270 145 246" />
      <path className="branch branch-two" d="M250 302 C286 272 320 242 354 205" />
      <path className="branch branch-three" d="M250 258 C226 226 208 195 194 160" />
      <path className="branch branch-four" d="M251 238 C275 207 296 178 306 140" />
      <path className="branch twig twig-one" d="M190 274 C165 250 140 232 112 221" />
      <path className="branch twig twig-two" d="M312 249 C340 225 365 207 395 198" />
    </svg>
  )
}

function App() {
  const [started, setStarted] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (!started) return undefined
    const timer = window.setTimeout(() => setShowMessage(true), 16500)
    return () => window.clearTimeout(timer)
  }, [started])

  const beginExperience = () => {
    if (!started) setStarted(true)
  }

  const restart = () => {
    setShowMessage(false)
    setStarted(false)
  }

  return (
    <main className={`experience ${started ? 'is-started' : 'is-intro'} ${showMessage ? 'is-complete' : ''}`}>
      <section className="stage" aria-label="Experiencia de flores amarillas">
        <div className="intro-copy">
          <p className="hint">click aquí</p>
        </div>

        <div className="garden">
          <Tree />
          <div className="pollen" aria-hidden="true">
            <i className="pollen-dot pollen-one" />
            <i className="pollen-dot pollen-two" />
            <i className="pollen-dot pollen-three" />
            <i className="pollen-dot pollen-four" />
            <i className="pollen-dot pollen-five" />
          </div>
          <div className="flower-heart" aria-hidden="true">
            {flowers.map((flower) => (
              <span key={flower.id} className="flower-position" style={{ left: `${flower.x}%`, top: `${flower.y}%` }}>
                <Sunflower {...flower} />
              </span>
            ))}
          </div>
          <button className="intro-flower" type="button" onClick={beginExperience} aria-label="Iniciar animación de flores" disabled={started}>
            <Sunflower size={62} rotation={0} delay={0} />
          </button>
          <span className="stem-dot" />
        </div>

        <div className="message-panel">
          <p className="message-eyebrow">{message.eyebrow}</p>
          <h1>{message.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
          <div className="message-body">
            {message.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <p className="closing">{message.closing}</p>
          <blockquote>“{message.quote}”</blockquote>
          <p className="signature">{message.signature}</p>
          <button type="button" className="restart" onClick={restart}>↻ <span>ver de nuevo</span></button>
        </div>
        <div className="ground-line" aria-hidden="true" />
      </section>
    </main>
  )
}

export default App
