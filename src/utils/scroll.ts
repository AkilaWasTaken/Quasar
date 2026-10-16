export type ScrollDirection = 1 | -1

interface ScrollMetrics {
  scrollTop: number
  scrollHeight: number
  clientHeight: number
}

export const canScrollInDirection = (el: ScrollMetrics, direction: ScrollDirection): boolean => {
  if (el.scrollHeight - el.clientHeight <= 1) return false
  return direction > 0
    ? el.scrollTop + el.clientHeight < el.scrollHeight - 1
    : el.scrollTop > 0
}

export const findScrollableAncestor = (target: EventTarget | null): HTMLElement | null => {
  let el = target instanceof HTMLElement ? target : null

  while (el && el !== document.body) {
    const { overflowY } = window.getComputedStyle(el)
    if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight - el.clientHeight > 1) {
      return el
    }
    el = el.parentElement
  }

  return null
}

export const isTextEntryTarget = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
