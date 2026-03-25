import { AgentAvatar } from './agent-avatar.jsx'
import { ProfileAvatar } from './profile-avatar.jsx'

function ThinkingDots({ agentName }) {
  return (
    <div className="flex items-center gap-1 py-1">
      <span className="text-[13px] text-[var(--inv-muted)]">{agentName || 'Agent'} is thinking</span>
      <span className="flex gap-0.5 items-center">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-1 h-1 rounded-full bg-[var(--inv-muted)]"
            style={{
              animation: 'thinking-dot 1.4s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </span>
      <style>{`
        @keyframes thinking-dot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(1); }
          40% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  )
}

export function MessageBubble({ content, role = 'user', thinking = false, agentName, avatarUrl, className = '' }) {
  const isAgent = role === 'agent'

  return (
    <div className={`flex gap-3 ${isAgent ? '' : 'flex-row-reverse'} ${className}`}>
      {/* Avatar */}
      <div className="flex-shrink-0 pt-0.5">
        {isAgent ? (
          <AgentAvatar name={agentName || 'Agent'} size={32} state={thinking ? 'thinking' : 'default'} />
        ) : (
          <ProfileAvatar
            name="You"
            avatarUrl={avatarUrl || ''}
            size={32}
            rounded="full"
          />
        )}
      </div>

      {/* Content */}
      <div
        className={`max-w-[75%] text-[15px] leading-relaxed ${
          isAgent
            ? 'py-1 text-[var(--inv-heading)]'
            : 'px-4 py-2.5 rounded-2xl rounded-tr-md bg-[var(--inv-bg-alt)] text-[var(--inv-heading)]'
        }`}
      >
        {isAgent && thinking ? <ThinkingDots agentName={agentName} /> : content}
      </div>
    </div>
  )
}
