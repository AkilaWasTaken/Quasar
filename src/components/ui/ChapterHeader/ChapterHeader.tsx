import { BRANDING } from '../../../config'
import './ChapterHeader.css'

interface ChapterHeaderProps {
  title: string
  className?: string
  hideTitle?: boolean
}

export const ChapterHeader = ({ title, className = '', hideTitle = false }: ChapterHeaderProps) => {
  return (
    <div className={`chapter-header ${className}`}>
      <img className="chapter-header-logo" src={BRANDING.logo} alt="" />
      <h2 className={`chapter-header-title${hideTitle ? ' sr-only' : ''}`}>{title}</h2>
    </div>
  )
}
