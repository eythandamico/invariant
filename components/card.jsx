export function Card({
  image,
  title,
  description,
  children,
  className = '',
}) {
  return (
    <div
      className={`rounded-2xl bg-[var(--inv-surface)] overflow-hidden ${className}`}
      style={{ boxShadow: 'var(--inv-shadow-sm)' }}
    >
      {image && (
        <div className="w-full h-40 overflow-hidden">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-5">
        {title && (
          <h3 className="text-[var(--inv-text-base)] font-semibold text-[var(--inv-heading)]">
            {title}
          </h3>
        )}

        {description && (
          <p className="text-[var(--inv-text-sm)] text-[var(--inv-muted)] mt-1">
            {description}
          </p>
        )}

        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
