import { useState, useEffect } from 'react'
import { BottomNav } from '../components/bottom-nav.jsx'
import { StartupSwitcher } from '../components/startup-switcher.jsx'
import { ProfileDropdown } from '../components/profile-dropdown.jsx'
import { SearchInput } from '../components/search-input.jsx'
import { TextInput } from '../components/text-input.jsx'
import { AgentAvatar } from '../components/agent-avatar.jsx'
import { SegmentedTabs } from '../components/segmented-tabs.jsx'
import { MorphCard } from '../components/morph-card.jsx'
import { StepIndicator } from '../components/step-indicator.jsx'
import Icon from '../lib/icon.jsx'
import { TABS, CHAT_TABS, STARTUPS } from './data.jsx'

const PROFILE = { name: 'Eythan D\'Amico', email: 'eythan@invariant.com' }
const PROFILE_ITEMS = [
  { label: 'Settings', icon: 'settings', onAction: () => console.log('Settings') },
  { label: 'Support', icon: 'message', onAction: () => console.log('Support') },
  { label: 'Feedback', icon: 'mail', onAction: () => console.log('Feedback') },
  { label: 'Log out', icon: 'logout', danger: true, onAction: () => console.log('Logout') },
]

function ComponentStage({ children }) {
  return (
    <div className="relative" style={{ transform: 'translate(0,0)' }}>
      {children}
    </div>
  )
}

const AVATAR_STATES = ['default', 'thinking', 'inactive']

function useScreens(darkMode, toggleDarkMode) {
  const [avatarState, setAvatarState] = useState('default')
  const [tabDemo, setTabDemo] = useState('all')
  const [activeStep, setActiveStep] = useState(0)
  const [activeTab, setActiveTab] = useState('home')
  const [chatTab, setChatTab] = useState('home')
  const [currentSlug, setCurrentSlug] = useState('acme-ai-labs')
  const currentStartup = STARTUPS.find(s => s.slug === currentSlug)

  const addItems = [
    { label: 'New Objective', icon: 'bullseye-arrow', onAction: () => console.log('New Objective') },
    { label: 'Upload File', icon: 'upload', onAction: () => console.log('Upload File') },
    { label: 'Invite Agent', icon: 'robot', onAction: () => console.log('Invite Agent') },
    { label: 'Post a Role', icon: 'target', onAction: () => console.log('Post Role') },
  ]

  return [
    {
      id: 'bottom-nav',
      label: 'BottomNav',
      render: () => (
        <ComponentStage>
          <BottomNav
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            addItems={addItems}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
            chatTabId="chat"
            onSendMessage={(msg) => console.log('Send:', msg)}
          />
        </ComponentStage>
      ),
    },
    {
      id: 'profile',
      label: 'ProfileDropdown',
      render: () => (
        <ComponentStage>
          <ProfileDropdown
            avatarUrl="/profile_pic.jpg"
            profile={PROFILE}
            profileItems={PROFILE_ITEMS}
          />
        </ComponentStage>
      ),
    },
    {
      id: 'startup',
      label: 'StartupSwitcher',
      render: () => (
        <ComponentStage>
          <StartupSwitcher
            currentStartup={currentStartup}
            startups={STARTUPS}
            onStartupChange={setCurrentSlug}
          />
        </ComponentStage>
      ),
    },
    {
      id: 'chat-nav',
      label: 'ChatNav',
      render: () => (
        <ComponentStage>
          <BottomNav
            tabs={CHAT_TABS}
            activeTab={chatTab}
            onTabChange={setChatTab}
            chatTabId="chat"
            onSendMessage={(msg) => console.log('Send:', msg)}
          />
        </ComponentStage>
      ),
    },
    {
      id: 'search',
      label: 'SearchInput',
      render: () => (
        <ComponentStage>
          <div className="w-[520px]">
            <SearchInput
              placeholder="Search anything..."
              autoFocus
            />
          </div>
        </ComponentStage>
      ),
    },
    {
      id: 'icon-buttons',
      label: 'IconButtons',
      render: () => (
        <ComponentStage>
          <div className="flex items-center gap-2">
            {[
              { icon: 'plus', label: 'Add' },
              { icon: 'edit', label: 'Edit' },
              { icon: 'upload', label: 'Upload' },
            ].map(btn => (
              <button
                key={btn.icon}
                type="button"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-[var(--inv-surface)] text-[var(--inv-muted)] hover:text-[var(--inv-heading)] transition-[color,box-shadow,transform] duration-200 ease-out cursor-pointer active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[var(--inv-accent)] focus-visible:ring-offset-1 [box-shadow:var(--inv-shadow-sm)] hover:[box-shadow:var(--inv-shadow-sm-hover)]"
                aria-label={btn.label}
              >
                <Icon name={btn.icon} size={20} />
              </button>
            ))}
          </div>
        </ComponentStage>
      ),
    },
    {
      id: 'text-input',
      label: 'TextInput',
      render: () => (
        <ComponentStage>
          <div className="w-[360px] flex flex-col gap-4">
            <TextInput label="Name" placeholder="Enter your name..." />
            <TextInput label="Email" placeholder="you@example.com" />
            <TextInput label="Website" placeholder="https://" error="Invalid URL" />
          </div>
        </ComponentStage>
      ),
    },
    {
      id: 'agent-avatar',
      label: 'AgentAvatar',
      render: () => (
        <>
          <ComponentStage>
            <div className="flex items-center gap-4">
              <AgentAvatar name="Max" size={80} state={avatarState} />
              <AgentAvatar name="Luna" size={80} state={avatarState} />
              <AgentAvatar name="Nova" size={80} state={avatarState} />
            </div>
          </ComponentStage>

          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60]">
            <SegmentedTabs
              tabs={AVATAR_STATES.map(s => ({ id: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))}
              activeTab={avatarState}
              onTabChange={setAvatarState}
            />
          </div>
        </>
      ),
    },
    {
      id: 'segmented-tabs',
      label: 'SegmentedTabs',
      render: () => (
        <ComponentStage>
          <div className="flex flex-col items-center gap-6">
            <SegmentedTabs
              tabs={[
                { id: 'all', label: 'All' },
                { id: 'active', label: 'Active' },
                { id: 'archived', label: 'Archived' },
              ]}
              activeTab={tabDemo}
              onTabChange={setTabDemo}
            />
          </div>
        </ComponentStage>
      ),
    },
    {
      id: 'morph-card',
      label: 'MorphCard',
      render: () => (
        <ComponentStage>
          <div className="w-[400px] flex flex-col gap-3">
            <MorphCard title="What is Invariant UI?" icon="sparkle">
              A component library for building agent-powered interfaces. Copy-paste components with CSS variable theming that work in light and dark mode.
            </MorphCard>
            <MorphCard title="How does theming work?" icon="settings">
              All components use --inv-* CSS variables. Override any variable to customize colors, shadows, radii, and typography. Preset themes are available as CSS classes.
            </MorphCard>
            <MorphCard title="Can I modify components?" icon="edit">
              Yes. Components are copied into your project — they become your code. Modify anything you want. No dependency lock-in.
            </MorphCard>
          </div>
        </ComponentStage>
      ),
    },
    {
      id: 'step-indicator',
      label: 'StepIndicator',
      render: () => (
        <>
          <ComponentStage>
            <StepIndicator steps={5} activeStep={activeStep} onStepChange={setActiveStep} />
          </ComponentStage>

          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex gap-2">
            <button
              type="button"
              onClick={() => setActiveStep(s => Math.max(0, s - 1))}
              className="px-3 py-1.5 text-[13px] font-medium rounded-lg bg-[var(--inv-surface)] text-[var(--inv-muted)] hover:text-[var(--inv-heading)] transition-colors duration-150 cursor-pointer"
              style={{ boxShadow: 'var(--inv-shadow-sm)' }}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(s => Math.min(4, s + 1))}
              className="px-3 py-1.5 text-[13px] font-medium rounded-lg bg-[var(--inv-accent)] text-white transition-colors duration-150 cursor-pointer"
            >
              Next
            </button>
          </div>
        </>
      ),
    },
  ]
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const toggleDarkMode = () => {
    const next = !darkMode
    setDarkMode(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
  }

  const screens = useScreens(darkMode, toggleDarkMode)
  const [activeId, setActiveId] = useState(screens[0].id)

  useEffect(() => { document.title = 'Components — Invariant UI' }, [])

  const active = screens.find(s => s.id === activeId)

  return (
    <div className="min-h-screen bg-[var(--inv-bg)] text-[var(--inv-heading)]">
      <div className="min-h-screen flex items-center justify-center">
        {active?.render()}
      </div>

      {/* Dark mode toggle */}
      <button
        type="button"
        onClick={toggleDarkMode}
        className="fixed top-5 right-5 z-[70] w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--inv-surface)] text-[var(--inv-muted)] hover:text-[var(--inv-heading)] transition-colors duration-150 cursor-pointer"
        style={{ boxShadow: 'var(--inv-shadow)' }}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <Icon name={darkMode ? 'sun' : 'moon'} size={16} />
      </button>

      <nav className="fixed left-0 top-0 bottom-0 w-52 px-4 flex flex-col justify-center gap-1 z-[70]">
        {screens.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveId(s.id)}
            className={`text-left px-2 py-1.5 text-[13px] rounded-lg transition-colors duration-150 cursor-pointer flex items-center ${
              activeId === s.id
                ? 'text-[var(--inv-heading)] font-medium'
                : 'text-[var(--inv-muted)] hover:text-[var(--inv-heading)]'
            }`}
          >
            {activeId === s.id && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--inv-accent)] mr-2" />}
            {s.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
