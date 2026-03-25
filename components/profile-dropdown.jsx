import { useState } from 'react'
import Icon from '../lib/icon.jsx'
import { popoverStyle, menuShadow } from '../lib/popover.js'
import { useClickOutside } from '../lib/use-click-outside.js'

export function ProfileDropdown({ avatarUrl, profile, profileItems = [] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useClickOutside(menuOpen, () => setMenuOpen(false))

  if (!avatarUrl) return null

  return (
    <div className="relative w-10 h-10 flex-shrink-0" onMouseDown={e => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setMenuOpen(prev => !prev)}
        className="relative w-10 h-10 rounded-xl cursor-pointer transition-[scale,opacity] duration-150 ease-out active:scale-[0.96] hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--inv-accent)] focus-visible:ring-offset-1"
        aria-label="Profile menu"
        aria-expanded={menuOpen}
        aria-haspopup="true"
        style={{ boxShadow: 'var(--inv-shadow)' }}
      >
        <img src={avatarUrl} alt="" className="w-full h-full rounded-xl object-cover" />
        <span className="absolute inset-0 rounded-xl pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px var(--inv-outline)' }} />
      </button>

      <div
        className="absolute top-full right-0 mt-2"
        style={popoverStyle(menuOpen, 'top right')}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="rounded-[20px] bg-[var(--inv-menu-bg)]/90 backdrop-blur-xl py-2 px-2 w-56" role="menu" style={menuShadow}>
          {profile && (
            <>
              <div className="px-2 py-1.5">
                <div className="text-[15px] font-semibold text-[var(--inv-menu-text-active)] truncate">{profile.name}</div>
                <div className="text-[13px] text-[var(--inv-menu-text)] truncate">{profile.email}</div>
              </div>
              <div className="border-t border-[var(--inv-menu-divider)] mx-2.5 my-1" aria-hidden="true" />
            </>
          )}
          {profileItems.map((item, i) => (
            <button
              key={i}
              type="button"
              role="menuitem"
              onClick={() => { setMenuOpen(false); item.onAction?.() }}
              className="w-full text-left px-2 py-1.5 text-[15px] text-[var(--inv-menu-text-active)] hover:bg-[var(--inv-menu-hover-bg)] rounded-xl transition-[color,background-color,scale] duration-150 ease-out cursor-pointer flex items-center gap-2.5 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[var(--inv-accent)] focus-visible:ring-offset-1"
            >
              <Icon name={item.icon} size={18} className="text-[var(--inv-menu-text)]" aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
