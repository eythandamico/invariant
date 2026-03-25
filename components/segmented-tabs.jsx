import { useRef, useEffect, useState } from 'react'

export function SegmentedTabs({ tabs = [], activeTab, onTabChange, className = '' }) {
  const containerRef = useRef(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const activeEl = container.querySelector(`[data-tab-id="${activeTab}"]`)
    if (!activeEl) return
    setIndicator({
      left: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
    })
    setReady(true)
  }, [activeTab])

  return (
    <div ref={containerRef} className={`relative flex gap-1 bg-[var(--inv-surface)] rounded-xl p-1 ${className}`} style={{ boxShadow: 'var(--inv-shadow-sm)' }}>
      <div
        className="absolute top-1 bottom-1 rounded-lg bg-[var(--inv-nav-hover-bg)]"
        style={{
          left: indicator.left,
          width: indicator.width,
          transition: ready ? 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        }}
      />
      {tabs.map(tab => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            data-tab-id={tab.id}
            type="button"
            onClick={() => onTabChange?.(tab.id)}
            className={`relative z-10 px-3 py-1.5 text-[13px] font-medium rounded-lg transition-colors duration-150 cursor-pointer ${
              isActive
                ? 'text-[var(--inv-heading)]'
                : 'text-[var(--inv-muted)] hover:text-[var(--inv-heading)]'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
