import { useClickOutside } from '../lib/use-click-outside.js'
import { popoverStyle } from '../lib/popover.js'

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  actions,
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
        className={`relative w-[90vw] max-w-[400px] rounded-2xl bg-[var(--inv-surface)] p-6 ${className}`}
        style={{
          boxShadow: 'var(--inv-shadow)',
          ...popoverStyle(isOpen, 'center'),
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="text-[var(--inv-text-lg)] font-semibold text-[var(--inv-heading)]">
            {title}
          </h2>
        )}

        {description && (
          <p className="mt-2 text-[var(--inv-text-sm)] text-[var(--inv-muted)]">
            {description}
          </p>
        )}

        {actions && (
          <div className="mt-5 flex items-center justify-end gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
