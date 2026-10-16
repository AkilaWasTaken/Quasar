import { CONTACT, SPONSORS } from '../../../config'
import { ChapterOverlay } from '../../ui'
import type { ChapterProps } from '../types'
import './SponsorsChapter.css'

export const SponsorsChapter = ({ scene, visible }: ChapterProps) => (
  <ChapterOverlay id="sponsors" scene={scene} visible={visible} particles className="sponsors-chapter">
    <div className="sponsors-content">
      <div className="sponsors-grid">
        {SPONSORS.map((sponsor) => (
          <div key={sponsor.id} className="panel panel-lift sponsor-card">
            <span className="sponsor-name">{sponsor.name}</span>
          </div>
        ))}
      </div>

      <div className="sponsors-footer">
        <span>Vrei să devii partenerul nostru?</span>
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </div>
    </div>
  </ChapterOverlay>
)
