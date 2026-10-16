import { useCallback, useState } from 'react'
import { OUTREACH_EVENTS } from '../../../config'
import type { OutreachEvent } from '../../../config'
import { ChapterOverlay, Modal } from '../../ui'
import type { ChapterProps } from '../types'
import './OutreachChapter.css'

const PARTICLES = { count: 20, opacity: 0.15 }
const MODAL_TITLE_ID = 'outreach-modal-title'

export const OutreachChapter = ({ scene, visible }: ChapterProps) => {
  const [selectedEvent, setSelectedEvent] = useState<OutreachEvent | null>(null)
  const closeModal = useCallback(() => setSelectedEvent(null), [])

  return (
    <ChapterOverlay id="outreach" scene={scene} visible={visible} particles={PARTICLES} className="outreach-chapter">
      <div className="outreach-content">
        <div className="outreach-events">
          {OUTREACH_EVENTS.map((event) => (
            <button
              key={event.id}
              type="button"
              className="outreach-event"
              onClick={() => setSelectedEvent(event)}
            >
              <img src={event.image} alt="" loading="lazy" className="outreach-event-photo" />
              <span className="outreach-event-scrim" />
              <span className="outreach-event-title">{event.title}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <Modal onClose={closeModal} labelledBy={MODAL_TITLE_ID} className="outreach-modal-card">
          <div className="outreach-modal-photo">
            <img src={selectedEvent.image} alt={selectedEvent.title} />
          </div>

          <div className="outreach-modal-info">
            <h3 id={MODAL_TITLE_ID} className="outreach-modal-title">{selectedEvent.title}</h3>
            <div className="outreach-modal-divider" />
            <p className="outreach-modal-text">{selectedEvent.description}</p>
          </div>
        </Modal>
      )}
    </ChapterOverlay>
  )
}
