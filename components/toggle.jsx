import { useState } from 'react'

export function Toggle({ checked = false, onChange, size = 'default', className = '' }) {
  const isSmall = size === 'small'
  const [pressed, setPressed] = useState(false)

  const trackW = isSmall ? 'w-9' : 'w-11'
  const trackH = isSmall ? 'h-5' : 'h-7'
  const pad = isSmall ? 3 : 4
  const thumbH = isSmall ? 14 : 20
  const thumbW = pressed ? (isSmall ? 18 : 24) : (isSmall ? 14 : 20)
  const trackPx = isSmall ? 36 : 44
  const travel = trackPx - pad * 2 - (pressed ? thumbW : thumbH)
  const thumbX = checked ? travel : 0
  const thumbRadius = isSmall ? 'rounded-[4px]' : 'rounded-md'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => { setPressed(false); onChange?.(!checked) }}
      onMouseLeave={() => setPressed(false)}
      className={`relative ${trackW} ${trackH} rounded-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--inv-accent)] focus-visible:ring-offset-2 transition-[background-color] duration-200 overflow-hidden ${
        checked ? 'bg-[var(--inv-accent)]' : 'bg-[var(--inv-bg-alt)]'
      } ${className}`}
    >
      <span
        className={`absolute top-1/2 ${thumbRadius} bg-[var(--inv-surface)]`}
        style={{
          left: pad,
          width: thumbW,
          height: thumbH,
          transform: `translateY(-50%) translateX(${thumbX}px)`,
          transition: pressed
            ? 'width 0.15s ease-out, transform 0.15s ease-out'
            : 'width 0.25s cubic-bezier(0.34, 1.3, 0.64, 1), transform 0.25s cubic-bezier(0.34, 1.3, 0.64, 1)',
          boxShadow: 'var(--inv-shadow-sm)',
        }}
      />
    </button>
  )
}
