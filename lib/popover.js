const POPOVER_OPEN = 'scale 0.3s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.2s ease-out, filter 0.3s cubic-bezier(0.34, 1.3, 0.64, 1)'
const POPOVER_CLOSE = 'scale 0.15s cubic-bezier(0.4, 0, 1, 1), opacity 0.12s ease-in, filter 0.15s cubic-bezier(0.4, 0, 1, 1)'

const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

export function popoverStyle(isOpen, origin) {
  if (prefersReducedMotion) {
    return {
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? 'auto' : 'none',
    }
  }
  return {
    transformOrigin: origin,
    scale: isOpen ? '1' : '0.85',
    opacity: isOpen ? 1 : 0,
    filter: isOpen ? 'blur(0px)' : 'blur(8px)',
    transition: isOpen ? POPOVER_OPEN : POPOVER_CLOSE,
    pointerEvents: isOpen ? 'auto' : 'none',
  }
}

export const menuShadow = {
  boxShadow: 'var(--inv-menu-shadow)',
}
