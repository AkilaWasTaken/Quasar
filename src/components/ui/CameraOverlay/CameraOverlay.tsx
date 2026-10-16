import { useEffect, useState, type CSSProperties } from 'react'
import { CHAPTERS, BRANDING } from '../../../config'
import './CameraOverlay.css'

interface CameraOverlayProps {
  currentChapter: number
  showScrollHint: boolean
  navigateToChapter: (chapter: number) => void
}

const enter = (x: number, y: number, duration: number, delay: number) => ({
  '--enter-x': `${x}px`,
  '--enter-y': `${y}px`,
  '--enter-duration': `${duration}s`,
  '--enter-delay': `${delay}s`,
}) as CSSProperties

const formatTime = (date: Date) => date.toLocaleTimeString('ro-RO', { hour12: false })
const formatDate = (date: Date) => date.toLocaleDateString('ro-RO', { year: 'numeric', month: '2-digit', day: '2-digit' })

// Ticks on its own so the rest of the HUD doesn't re-render every second.
const Clock = ({ format }: { format: (date: Date) => string }) => {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return format(now)
}

export const CameraOverlay = ({ currentChapter, showScrollHint, navigateToChapter }: CameraOverlayProps) => {
  return (
    <div className="camera-overlay">
      <div className="corner corner-tl hud-enter" style={enter(-20, -20, 0.8, 0.2)} aria-hidden="true" />
      <div className="corner corner-tr hud-enter" style={enter(20, -20, 0.8, 0.3)} aria-hidden="true" />
      <div className="corner corner-bl hud-enter" style={enter(-20, 20, 0.8, 0.4)} aria-hidden="true" />
      <div className="corner corner-br hud-enter" style={enter(20, 20, 0.8, 0.5)} aria-hidden="true" />

      {currentChapter === 1 && (
        <div className="crosshair" aria-hidden="true">
          <div className="crosshair-h" />
          <div className="crosshair-v" />
          <div className="crosshair-center" />
        </div>
      )}

      <div className="hud-element hud-top-left hud-enter" style={enter(-30, 0, 0.6, 1)} aria-hidden="true">
        <div className="rec-indicator">
          <span className="rec-dot" />
          <span className="rec-text">REC</span>
        </div>
        <div className="timecode"><Clock format={formatTime} /></div>
      </div>

      <div className="hud-element hud-top-right hud-enter" style={enter(30, 0, 0.6, 1.1)} aria-hidden="true">
        <div className="date-display"><Clock format={formatDate} /></div>
        <div className="mode-display">4K 60FPS</div>
      </div>

      <div className="hud-element hud-bottom-left hud-enter" style={enter(0, 30, 0.8, 1.2)}>
        <div className="brand-name">{BRANDING.teamName}</div>
        <div className="brand-sub">{BRANDING.teamNumber}</div>
      </div>

      <div className="hud-element hud-bottom-right hud-enter" style={enter(0, 30, 0.8, 1.3)}>
        <div className="chapter-indicator" aria-live="polite">
          <span className="chapter-label">CAPITOLUL {currentChapter}</span>
          <span className="chapter-name">{CHAPTERS[currentChapter - 1].title}</span>
        </div>
      </div>

      <nav className="scroll-indicator hud-enter" style={enter(20, 0, 0.8, 1.5)} aria-label="Capitole">
        <div className="scroll-track" aria-hidden="true">
          <div className="scroll-thumb" />
        </div>
        <div className="scroll-markers">
          {CHAPTERS.map((chapter, index) => {
            const isActive = currentChapter === index + 1
            return (
              <button
                key={chapter.id}
                type="button"
                className={`scroll-marker ${isActive ? 'active' : ''}`}
                aria-label={`Capitolul ${index + 1}: ${chapter.title}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => navigateToChapter(index + 1)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {showScrollHint && (
        <div className="scroll-hint" aria-hidden="true">
          <div className="scroll-hint-icon">
            <div className="scroll-hint-wheel" />
          </div>
          <span>DERULEAZĂ PENTRU A EXPLORA</span>
        </div>
      )}

      <div className="scan-line" aria-hidden="true" />

      {currentChapter === 1 && <div className="grid-overlay" aria-hidden="true" />}

      <div className="camera-vignette" aria-hidden="true" />
    </div>
  )
}
