import { getChapter, CONTACT } from '../../../config'
import { ChapterHeader, ChapterOverlay } from '../../ui'
import type { ChapterProps } from '../types'
import './ContactChapter.css'

export const ContactChapter = ({ visible }: ChapterProps) => {
  const { title } = getChapter('contact')

  return (
    <ChapterOverlay id="contact" visible={visible} header="none" className="contact-chapter">
      <div className="contact-content-wrapper">
        <div className="contact-header-section">
          <ChapterHeader title={title} />
          <p className="contact-subtitle">Ai o întrebare sau vrei să colaborăm? Ne-ar face plăcere să auzim de la tine.</p>
        </div>

        <div className="contact-main-grid">
          <div className="panel panel-lift contact-card">
            <span className="contact-card-label">Email</span>
            <a href={`mailto:${CONTACT.email}`} className="contact-card-value contact-link-value">
              {CONTACT.email}
            </a>
          </div>

          <div className="panel panel-lift contact-card">
            <span className="contact-card-label">Locație</span>
            <div className="contact-card-value">
              {CONTACT.address.join(', ')}
            </div>
          </div>
        </div>

        <div className="contact-footer-section">
          <div className="contact-socials">
            {CONTACT.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-pill"
              >
                {social.label}
              </a>
            ))}
          </div>

          <div className="contact-oss">
            <div className="contact-oss-line" />
            <p className="contact-oss-text">
              {CONTACT.openSource.text}
              <a
                href={CONTACT.openSource.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-oss-link"
              >
                {` ${CONTACT.openSource.linkText}`}
              </a>
            </p>
          </div>
        </div>
      </div>
    </ChapterOverlay>
  )
}
