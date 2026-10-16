import { AWARDS } from '../../../config'
import { ChapterOverlay } from '../../ui'
import type { ChapterProps } from '../types'
import './AwardsChapter.css'

const PARTICLES = { depth: 0.3 }

export const AwardsChapter = ({ scene, visible }: ChapterProps) => (
  <ChapterOverlay id="awards" scene={scene} visible={visible} particles={PARTICLES} className="awards-chapter">
    <div className="awards-grid">
      {AWARDS.map((award) => (
        <div key={award.id} className={`panel panel-lift award-card ${award.isMain ? 'main' : ''}`}>
          <span className="award-eyebrow">Premiu</span>
          <span className="award-name">{award.name}</span>
          <span className="award-event">{award.event}</span>
          <span className="award-divider" />
          <span className="award-year">{award.year}</span>
        </div>
      ))}
    </div>
  </ChapterOverlay>
)
