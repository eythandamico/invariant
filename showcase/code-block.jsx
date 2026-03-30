import { useEffect, useState, useRef } from 'react'
import { codeToHtml } from 'shiki'
import Icon from '../lib/icon.jsx'

export function CodeBlock({ code, lang = 'jsx', className = '' }) {
  const [html, setHtml] = useState('')
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    codeToHtml(code.trim(), {
      lang,
      theme: 'github-light-default',
    }).then(result => {
      if (!cancelled) setHtml(result)
    })
    return () => { cancelled = true }
  }, [code, lang])

  const handleCopy = () => {
    navigator.clipboard?.writeText(code.trim())
    setCopied(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      <div
        className="overflow-x-auto px-5 py-4 text-[14px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!bg-transparent"
        style={{ backgroundColor: 'var(--inv-bg-alt)' }}
        dangerouslySetInnerHTML={{ __html: html || `<pre style="color:var(--inv-muted)">${code.trim().replace(/</g, '&lt;')}</pre>` }}
      />
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 w-8 h-8 rounded-[4px] flex items-center justify-center text-[var(--inv-muted)] hover:text-[var(--inv-heading)] bg-[var(--inv-surface)]/50 hover:bg-[var(--inv-surface)] cursor-pointer transition-all duration-150"
        style={{ boxShadow: 'var(--inv-shadow-sm)' }}
      >
        <Icon name={copied ? 'check' : 'copy'} size={14} />
      </button>
    </div>
  )
}
