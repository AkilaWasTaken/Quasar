export interface ChapterConfig {
  id: string
  title: string
  x: number
}

export const CHAPTERS = [
  {
    id: 'robot',
    title: 'THE ROBOT',
    x: -5,
  },
  {
    id: 'awards',
    title: 'AWARDS',
    x: -1,
  },
  {
    id: 'team',
    title: 'THE TEAM',
    x: 3,
  },
  {
    id: 'outreach',
    title: 'OUTREACH',
    x: 7,
  },
  {
    id: 'sponsors',
    title: 'SPONSORS',
    x: 11,
  },
  {
    id: 'donate',
    title: 'SUPPORT US',
    x: 15,
  },
  {
    id: 'contact',
    title: 'CONTACT US',
    x: 19,
  },
] as const satisfies readonly ChapterConfig[]

export type Chapter = (typeof CHAPTERS)[number]
export type ChapterId = Chapter['id']

export const getChapter = (id: ChapterId): Chapter =>
  CHAPTERS.find(chapter => chapter.id === id)!

export const getChapterNumber = (id: ChapterId): number =>
  CHAPTERS.findIndex(chapter => chapter.id === id) + 1

export const isChapterActive = (id: ChapterId, currentChapter: number): boolean =>
  CHAPTERS[currentChapter - 1].id === id

const getNarrowScreenPullback = (viewportWidth: number) =>
  viewportWidth < 480 ? 1 : viewportWidth < 768 ? 0.5 : 0

export const getCameraPosition = (scrollProgress: number, viewportWidth = Infinity) => {
  const startX = CHAPTERS[0].x
  const endX = CHAPTERS[CHAPTERS.length - 1].x
  return {
    x: startX + (endX - startX) * scrollProgress,
    y: 0.5 + Math.sin(scrollProgress * Math.PI) * 0.3,
    z: 3.5 + Math.sin(scrollProgress * Math.PI) * 1.5 + getNarrowScreenPullback(viewportWidth),
  }
}
