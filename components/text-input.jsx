import { forwardRef } from 'react'

export const TextInput = forwardRef(function TextInput({ label, placeholder = '', className = '', error, ...rest }, ref) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-[13px] font-medium text-[var(--inv-heading)]">{label}</label>
      )}
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 rounded-xl bg-[var(--inv-surface)] text-[15px] text-[var(--inv-heading)] placeholder-[var(--inv-muted)] outline-none focus:outline-none focus-visible:outline-none transition-[box-shadow] duration-150 [box-shadow:var(--inv-shadow-sm)] focus-visible:[box-shadow:var(--inv-shadow-sm-hover),0_0_0_2px_var(--inv-accent)] ${
          error ? '[box-shadow:var(--inv-shadow-sm),0_0_0_2px_#ef4444]' : ''
        }`}
        {...rest}
      />
      {error && (
        <span className="text-[13px] text-red-400">{error}</span>
      )}
    </div>
  )
})
