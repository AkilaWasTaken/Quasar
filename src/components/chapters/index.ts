import type { ComponentType } from 'react'
import type { ChapterId } from '../../config'
import { AwardsChapter } from './Awards/AwardsChapter'
import { ContactChapter } from './Contact/ContactChapter'
import { DonateChapter } from './Donate/DonateChapter'
import { OutreachChapter } from './Outreach/OutreachChapter'
import { RobotChapter } from './Robot/RobotChapter'
import { SponsorsChapter } from './Sponsors/SponsorsChapter'
import { TeamChapter } from './Team/TeamChapter'
import type { ChapterProps } from './types'

export type { ChapterProps } from './types'

export const CHAPTER_COMPONENTS: Record<ChapterId, ComponentType<ChapterProps>> = {
  robot: RobotChapter,
  awards: AwardsChapter,
  team: TeamChapter,
  outreach: OutreachChapter,
  sponsors: SponsorsChapter,
  donate: DonateChapter,
  contact: ContactChapter,
}
