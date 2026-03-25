export function Toggle({ checked = false, onChange, size = 'default', className = '' }) {
  const isSmall = size === 'small'
  const trackW = isSmall ? 'w-8' : 'w-10'
  const trackH = isSmall ? 'h-[18px]' : 'h-[22px]'
  const thumbSize = isSmall ? 'w-3 h-3' : 'w-4 h-4'
  const thumbOffset = isSmall ? 'left-[3px]' : 'left-[3px]'
  const thumbTranslate = isSmall ? 'translate-x-[14px]' : 'translate-x-[18px]'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={`relative ${trackW} ${trackH} rounded-full cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--inv-accent)] focus-visible:ring-offset-2 ${
        checked ? 'bg-[var(--inv-accent)]' : 'bg-[var(--inv-border)]'
      } ${className}`}
    >
      <span
        className={`absolute top-1/2 -translate-y-1/2 ${thumbOffset} ${thumbSize} rounded-full bg-white shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.34,1.3,0.64,1)] ${
          checked ? thumbTranslate : ''
        }`}
      />
    </button>
  )
}
