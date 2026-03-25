export function StepIndicator({ steps = 5, activeStep = 0, onStepChange, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: steps }, (_, i) => {
        const isActive = i === activeStep
        const isCompleted = i < activeStep
        return (
          <button
            key={i}
            type="button"
            onClick={() => onStepChange?.(i)}
            className="cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--inv-accent)] focus-visible:ring-offset-2 rounded-full"
            aria-label={`Step ${i + 1}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <div
              className="h-2.5 rounded-full"
              style={{
                width: isActive ? 36 : 10,
                backgroundColor: isActive
                  ? 'var(--inv-accent)'
                  : isCompleted
                    ? 'var(--inv-heading)'
                    : 'var(--inv-border)',
                opacity: isCompleted ? 0.35 : 1,
                transition: 'width 0.5s cubic-bezier(0.34, 1.3, 0.64, 1), background-color 0.4s ease, opacity 0.4s ease',
              }}
            />
          </button>
        )
      })}
    </div>
  )
}
