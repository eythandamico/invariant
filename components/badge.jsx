export function Badge({ label, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-[var(--inv-bg-alt)] text-[var(--inv-muted)]',
    accent: 'bg-[var(--inv-accent)] text-white',
    success: 'bg-emerald-500/15 text-emerald-600',
    warning: 'bg-amber-500/15 text-amber-600',
    error: 'bg-red-500/15 text-red-500',
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${variants[variant] || variants.default} ${className}`}>
      {label}
    </span>
  )
}
