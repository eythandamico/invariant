import Icon from '../lib/icon.jsx'
import { useClickOutside } from '../lib/use-click-outside.js'
import { popoverStyle } from '../lib/popover.js'

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) {
  useClickOutside(isOpen, onClose)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-150"
        style={{ opacity: isOpen ? 1 : 0 }}
      />

      <div
        className={`relative w-[90vw] max-w-[560px] max-h-[85vh] rounded-2xl bg-[var(--inv-surface)] flex flex-col overflow-hidden ${className}`}
        style={{
          boxShadow: 'var(--inv-shadow)',
          ...popoverStyle(isOpen, 'center'),
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-0 flex-shrink-0">
          {title && (
            <h2 className="text-[var(--inv-text-lg)] font-semibold text-[var(--inv-heading)]">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--inv-muted)] hover:text-[var(--inv-heading)] hover:bg-[var(--inv-nav-hover-bg)] transition-[color,background-color] duration-150 cursor-pointer ml-auto"
            aria-label="Close"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  )
}
