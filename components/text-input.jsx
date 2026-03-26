import { forwardRef } from 'react'
import Icon from '../lib/icon.jsx'

export const TextInput = forwardRef(function TextInput({ label, placeholder = '', className = '', error, disabled = false, icon, ...rest }, ref) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className={`text-[13px] font-medium ${disabled ? 'text-[var(--inv-muted)]' : 'text-[var(--inv-heading)]'}`}>{label}</label>
      )}
      <div
        className={`flex items-center rounded-xl bg-[var(--inv-surface)] transition-[box-shadow] duration-150 ${
          disabled
            ? 'opacity-40 pointer-events-none [box-shadow:var(--inv-shadow-sm)]'
            : error
              ? '[box-shadow:var(--inv-shadow-sm),0_0_0_2px_#ef4444]'
              : '[box-shadow:var(--inv-shadow-sm)] has-[:focus-visible]:[box-shadow:var(--inv-shadow-sm-hover),0_0_0_2px_var(--inv-accent)]'
        }`}
      >
        {icon && (
          <span className="pl-3 flex-shrink-0 text-[var(--inv-muted)]">
            <Icon name={icon} size={18} />
          </span>
        )}
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full py-2.5 bg-transparent text-[15px] text-[var(--inv-heading)] placeholder-[var(--inv-muted)] outline-none ${
            icon ? 'pl-2 pr-3' : 'px-3'
          }`}
          {...rest}
        />
      </div>
      {error && !disabled && (
        <span className="text-[13px] text-red-400">{error}</span>
      )}
    </div>
  )
})
