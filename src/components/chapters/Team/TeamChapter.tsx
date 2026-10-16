import { useCallback, useState, type CSSProperties } from 'react'
import { TEAM_CATEGORIES, TEAM_LEADER_ROLE, TEAM_MEMBERS } from '../../../config'
import type { TeamCategoryId, TeamMember } from '../../../config'
import { ChapterOverlay, Modal } from '../../ui'
import type { ChapterProps } from '../types'
import './TeamChapter.css'

type TeamSectionId = TeamCategoryId | 'all'

interface TeamSection {
  id: TeamSectionId
  title: string
  members: TeamMember[]
}

const CATEGORY_SECTIONS: TeamSection[] = TEAM_CATEGORIES
  .map(category => ({ ...category, members: TEAM_MEMBERS.filter(member => member.category === category.id) }))
  .filter(section => section.members.length > 0)

const ALL_SECTION: TeamSection = {
  id: 'all',
  title: 'Toți membrii',
  members: CATEGORY_SECTIONS.flatMap(section => section.members),
}

const TEAM_SECTIONS: TeamSection[] = [ALL_SECTION, ...CATEGORY_SECTIONS]

const PARTICLES = { depth: 0.3 }
const MODAL_TITLE_ID = 'team-modal-name'

export const TeamChapter = ({ scene, visible }: ChapterProps) => {
  const [activeSection, setActiveSection] = useState(ALL_SECTION)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [imageErrors, setImageErrors] = useState<Record<string, true>>({})

  const closeModal = useCallback(() => setSelectedMember(null), [])

  const hasPhoto = (member: TeamMember) => Boolean(member.image && !imageErrors[member.id])
  const handleImageError = (memberId: string) => {
    setImageErrors(prev => ({ ...prev, [memberId]: true }))
  }

  return (
    <ChapterOverlay id="team" scene={scene} visible={visible} particles={PARTICLES} className="team-chapter">
      <div className="team-content">
        <div className="team-tabs" role="group" aria-label="Categorii echipă">
          {TEAM_SECTIONS.map((section) => {
            const isActive = section.id === activeSection.id
            return (
              <button
                key={section.id}
                type="button"
                className={`team-tab ${isActive ? 'active' : ''}`}
                aria-pressed={isActive}
                onClick={(event) => {
                  setActiveSection(section)
                  event.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
                }}
              >
                {section.title}
                <span className="team-tab-count" aria-hidden="true">{section.members.length}</span>
              </button>
            )
          })}
        </div>

        <div
          key={activeSection.id}
          className={`team-panel ${activeSection.id === ALL_SECTION.id ? 'team-panel-all' : ''}`}
          role="group"
          aria-label={activeSection.title}
        >
          {activeSection.members.map((member, index) => (
            <button
              key={member.id}
              type="button"
              className={`team-card ${member.role === TEAM_LEADER_ROLE ? 'is-leader' : ''}`}
              style={{ '--i': index } as CSSProperties}
              onClick={() => setSelectedMember(member)}
              aria-label={`Vezi detalii despre ${member.name}`}
            >
              <div className="team-card-photo">
                {hasPhoto(member) ? (
                  <img
                    src={member.image}
                    alt=""
                    loading="lazy"
                    onError={() => handleImageError(member.id)}
                  />
                ) : (
                  <span className="team-card-initial">{member.name.charAt(0)}</span>
                )}
              </div>
              <div className="team-card-info">
                <span className="team-card-name">{member.name}</span>
                <span className="team-card-role">{member.role}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedMember && (
        <Modal onClose={closeModal} labelledBy={MODAL_TITLE_ID} className="team-modal-card">
          <div className="team-modal-photo">
            {hasPhoto(selectedMember) ? (
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="team-modal-img"
                onError={() => handleImageError(selectedMember.id)}
              />
            ) : (
              <div className="team-modal-initial">
                {selectedMember.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="team-modal-info">
            <h3 id={MODAL_TITLE_ID} className="team-modal-name">{selectedMember.name}</h3>
            <p className="team-modal-role">{selectedMember.role}</p>
            <div className="team-modal-divider" />
            <p className="team-modal-bio">{selectedMember.description}</p>
          </div>
        </Modal>
      )}
    </ChapterOverlay>
  )
}
