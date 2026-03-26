import { useState, useEffect, useRef } from 'react'
import { BottomNav } from '../components/bottom-nav.jsx'
import { WorkspaceSwitcher } from '../components/workspace-switcher.jsx'
import { ProfileMenu } from '../components/profile-menu.jsx'
import { SearchBar } from '../components/search-bar.jsx'
import { SearchToggle } from '../components/search-toggle.jsx'
import { TextInput } from '../components/text-input.jsx'
import { AgentAvatar } from '../components/agent-avatar.jsx'
import { ProfileAvatar, ProfileAvatarGroup } from '../components/profile-avatar.jsx'
import { SegmentedControl } from '../components/segmented-control.jsx'
import { ExpandCard } from '../components/expand-card.jsx'
import { StepIndicator } from '../components/step-indicator.jsx'
import { ActionButton } from '../components/action-button.jsx'
import { ToastProvider, useToast } from '../components/toast.jsx'
import { SpotlightCard } from '../components/spotlight-card.jsx'
import { PromptBar } from '../components/prompt-bar.jsx'
import { MessageBubble } from '../components/message-bubble.jsx'
import { Dropdown } from '../components/dropdown.jsx'
import { Select } from '../components/select.jsx'
import { Button } from '../components/button.jsx'
import { Toggle } from '../components/toggle.jsx'
import { Accordion } from '../components/accordion.jsx'
import { Badge } from '../components/badge.jsx'
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
  const [avatarRounded, setAvatarRounded] = useState('xl')
  const [selectedModel, setSelectedModel] = useState('sonnet')
  const [selectValue, setSelectValue] = useState(null)
  const [dropdownDir, setDropdownDir] = useState('bottom')
  const [dropdownAlign, setDropdownAlign] = useState('left')
  const isHorizontalDrop = dropdownDir === 'left' || dropdownDir === 'right'
  const [messageState, setMessageState] = useState('default')
  const [inputState, setInputState] = useState('default')
  const [inputIcon, setInputIcon] = useState(false)
  const [btnVariant, setBtnVariant] = useState('primary')
  const [btnSize, setBtnSize] = useState('default')
  const [btnIcon, setBtnIcon] = useState('none')
  const [btnLoading, setBtnLoading] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [avatarAlert, setAvatarAlert] = useState(false)
  const [avatarView, setAvatarView] = useState('single')
  const [toggleOn, setToggleOn] = useState(false)
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
      group: 'Navigation', id: 'bottom-nav',
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
      label: 'ProfileMenu',
      render: () => (
        <ComponentStage>
          <ProfileMenu
            avatarUrl="/profile_pic.jpg"
            profile={PROFILE}
            profileItems={PROFILE_ITEMS}
          />
        </ComponentStage>
      ),
    },
    {
      id: 'startup',
      label: 'WorkspaceSwitcher',
      render: () => (
        <ComponentStage>
          <WorkspaceSwitcher
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
      group: 'Inputs', id: 'search',
      label: 'SearchBar',
      render: () => (
        <ComponentStage>
          <div className="flex flex-col items-center gap-8">
            <div className="w-[520px]">
              <SearchBar
                placeholder="Search anything..."
                autoFocus
              />
            </div>
            <SearchToggle placeholder="Search anything..." />
          </div>
        </ComponentStage>
      ),
    },
    {
      id: 'message-bubble',
      label: 'MessageBubble',
      render: () => (
        <>
          <ComponentStage>
            <div className="w-[500px] flex flex-col gap-4">
              <MessageBubble
                role="user"
                content="Can you help me deploy this to production?"
                avatarUrl="/profile_pic.jpg"
                timestamp="2:14 PM"
              />
              <MessageBubble
                role="agent"
                agentName="Nova"
                content="Sure! I'll run the build pipeline and set up the deployment. Give me a moment to check the configuration."
                timestamp="2:14 PM"
              />
              <MessageBubble
                role="user"
                content="Go for it."
                avatarUrl="/profile_pic.jpg"
                timestamp="2:15 PM"
              />
              <MessageBubble
                role="agent"
                agentName="Nova"
                content={messageState === 'thinking' ? undefined : "Done! Deployment is live at production.invariant.com"}
                thinking={messageState === 'thinking'}
                timestamp="2:15 PM"
              />
            </div>
          </ComponentStage>
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60]">
            <SegmentedControl
              tabs={[
                { id: 'default', label: 'Default' },
                { id: 'thinking', label: 'Thinking' },
              ]}
              activeTab={messageState}
              onTabChange={setMessageState}
            />
          </div>
        </>
      ),
    },
    {
      id: 'prompt-bar',
      label: 'PromptBar',
      render: () => (
        <ComponentStage>
          <div className="w-[600px]">
            <PromptBar
              placeholder="Ask anything..."
              models={[
                { id: 'sonnet', label: 'Sonnet 4' },
                { id: 'gpt4o', label: 'GPT-4o' },
                { id: 'gemini', label: 'Gemini 2.5 Pro' },
              ]}
              activeModel={selectedModel}
              onModelChange={setSelectedModel}
              onSubmit={(msg) => console.log('Send:', msg)}
              onUpload={() => console.log('Upload')}
              onMicPress={() => console.log('Mic')}
            />
          </div>
        </ComponentStage>
      ),
    },
    {
      id: 'select',
      label: 'Select',
      render: () => (
        <ComponentStage>
          <div className="w-[280px]">
            <Select
              label="Model"
              placeholder="Choose a model..."
              options={[
                { id: 'sonnet', label: 'Sonnet 4' },
                { id: 'opus', label: 'Opus 4' },
                { id: 'haiku', label: 'Haiku 4' },
                { id: 'gpt4o', label: 'GPT-4o' },
                { id: 'gemini', label: 'Gemini 2.5 Pro' },
              ]}
              value={selectValue}
              onChange={setSelectValue}
            />
          </div>
        </ComponentStage>
      ),
    },
    {
      id: 'dropdown',
      label: 'Dropdown',
      render: () => (
        <>
          <ComponentStage>
            <Dropdown
              placement={`${dropdownDir}-${dropdownAlign}`}
              items={[
                { label: 'Edit', icon: 'edit', onAction: () => console.log('Edit') },
                { label: 'Duplicate', icon: 'copy', onAction: () => console.log('Duplicate') },
                { label: 'Share', icon: 'external-link', onAction: () => console.log('Share') },
                { divider: true },
                { label: 'Delete', icon: 'close', danger: true, onAction: () => console.log('Delete') },
              ]}
            />
          </ComponentStage>
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3">
            <SegmentedControl
              tabs={[
                { id: 'top', icon: 'arrow-up' },
                { id: 'bottom', icon: 'arrow-down' },
                { id: 'left', icon: 'arrow-left' },
                { id: 'right', icon: 'arrow-right' },
              ]}
              activeTab={dropdownDir}
              onTabChange={(id) => { setDropdownDir(id); if (id === 'left' || id === 'right') setDropdownAlign('center') }}
            />
            <SegmentedControl
              tabs={[
                { id: 'left', icon: 'align-left' },
                { id: 'center', icon: 'align-center' },
                { id: 'right', icon: 'align-right' },
              ]}
              activeTab={isHorizontalDrop ? 'center' : dropdownAlign}
              onTabChange={(id) => !isHorizontalDrop && setDropdownAlign(id)}
              className={isHorizontalDrop ? 'opacity-40 pointer-events-none' : ''}
            />
          </div>
        </>
      ),
    },
    {
      group: 'Actions', id: 'button',
      label: 'Button',
      render: () => (
        <>
          <ComponentStage>
            <Button
              label="Button"
              variant={btnVariant}
              size={btnSize}
              iconLeft={btnIcon === 'left' || btnIcon === 'both' ? 'plus' : undefined}
              iconRight={btnIcon === 'right' || btnIcon === 'both' ? 'arrow-right' : undefined}
              loading={btnLoading}
              disabled={btnDisabled}
            />
          </ComponentStage>
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3">
            <SegmentedControl
              tabs={[
                { id: 'primary', label: 'Primary' },
                { id: 'secondary', label: 'Secondary' },
                { id: 'ghost', label: 'Ghost' },
                { id: 'danger', label: 'Danger' },
              ]}
              activeTab={btnVariant}
              onTabChange={setBtnVariant}
            />
            <SegmentedControl
              tabs={[
                { id: 'small', label: 'S' },
                { id: 'default', label: 'M' },
                { id: 'large', label: 'L' },
              ]}
              activeTab={btnSize}
              onTabChange={setBtnSize}
            />
            <SegmentedControl
              tabs={[
                { id: 'none', label: 'No Icon' },
                { id: 'left', icon: 'arrow-left' },
                { id: 'right', icon: 'arrow-right' },
                { id: 'both', label: 'Both' },
              ]}
              activeTab={btnIcon}
              onTabChange={setBtnIcon}
            />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--inv-surface)]" style={{ boxShadow: 'var(--inv-shadow-sm)' }}>
              <span className="text-[13px] text-[var(--inv-muted)]">Loading</span>
              <Toggle checked={btnLoading} onChange={setBtnLoading} size="small" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--inv-surface)]" style={{ boxShadow: 'var(--inv-shadow-sm)' }}>
              <span className="text-[13px] text-[var(--inv-muted)]">Disabled</span>
              <Toggle checked={btnDisabled} onChange={setBtnDisabled} size="small" />
            </div>
          </div>
        </>
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
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-[var(--inv-surface)] text-[var(--inv-muted)] hover:text-[var(--inv-heading)] transition-[color,box-shadow,scale] duration-200 ease-out cursor-pointer active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[var(--inv-accent)] focus-visible:ring-offset-1 [box-shadow:var(--inv-shadow-sm)] hover:[box-shadow:var(--inv-shadow-sm-hover)]"
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
        <>
          <ComponentStage>
            <div className="w-[360px]">
              <TextInput
                label="Email"
                placeholder="you@example.com"
                disabled={inputState === 'disabled'}
                error={inputState === 'error' ? 'Invalid email address' : undefined}
                autoFocus={inputState === 'focus'}
                icon={inputIcon ? 'mail' : undefined}
                key={`${inputState}-${inputIcon}`}
              />
            </div>
          </ComponentStage>
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3">
            <SegmentedControl
              tabs={[
                { id: 'default', label: 'Default' },
                { id: 'focus', label: 'Focus' },
                { id: 'error', label: 'Error' },
                { id: 'disabled', label: 'Disabled' },
              ]}
              activeTab={inputState}
              onTabChange={setInputState}
            />
            <div className="flex items-center gap-2 bg-[var(--inv-surface)] rounded-xl py-[9px] px-3" style={{ boxShadow: 'var(--inv-shadow-sm)' }}>
              <span className="text-[13px] font-medium text-[var(--inv-muted)]">Icon</span>
              <Toggle checked={inputIcon} onChange={setInputIcon} />
            </div>
          </div>
        </>
      ),
    },
    {
      group: 'Display', id: 'profile-avatar',
      label: 'ProfileAvatar',
      render: () => (
        <>
          <ComponentStage>
            {avatarView === 'single' ? (
              <ProfileAvatar name="Eythan D'Amico" avatarUrl="/profile_pic.jpg" size={40} rounded={avatarRounded} alert={avatarAlert} />
            ) : (
              <ProfileAvatarGroup
                size={40}
                rounded={avatarRounded}
                avatars={[
                  { name: 'Eythan', avatarUrl: '/profile_pic.jpg' },
                  { name: 'Sarah', avatarUrl: '/profile_pic.jpg' },
                  { name: 'James', avatarUrl: '/profile_pic.jpg' },
                  { name: 'Maria', avatarUrl: '/profile_pic.jpg' },
                  { name: 'Alex', avatarUrl: '/profile_pic.jpg' },
                ]}
              />
            )}
          </ComponentStage>
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3">
            <SegmentedControl
              tabs={[
                { id: 'single', icon: 'user' },
                { id: 'group', icon: 'users' },
              ]}
              activeTab={avatarView}
              onTabChange={setAvatarView}
            />
            <SegmentedControl
              tabs={[
                { id: 'xl', icon: 'square' },
                { id: 'full', icon: 'circle' },
              ]}
              activeTab={avatarRounded}
              onTabChange={setAvatarRounded}
            />
            <SegmentedControl
              tabs={[
                { id: 'off', icon: 'notification' },
                { id: 'on', icon: 'bell-dot' },
              ]}
              activeTab={avatarAlert ? 'on' : 'off'}
              onTabChange={(id) => avatarView === 'single' && setAvatarAlert(id === 'on')}
              className={avatarView === 'group' ? 'opacity-40 pointer-events-none' : ''}
            />
          </div>
        </>
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
            <SegmentedControl
              tabs={AVATAR_STATES.map(s => ({ id: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))}
              activeTab={avatarState}
              onTabChange={setAvatarState}
            />
          </div>
        </>
      ),
    },
    {
      group: 'Controls', id: 'segmented-tabs',
      label: 'SegmentedControl',
      render: () => (
        <ComponentStage>
          <div className="flex flex-col items-center gap-6">
            <SegmentedControl
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
      group: 'Layout', id: 'morph-card',
      label: 'ExpandCard',
      render: () => (
        <ComponentStage>
          <div className="w-[400px] flex flex-col gap-3">
            <ExpandCard title="Getting started" icon="home">
              Everything you need to set up your project and start building. Follow the quick start guide to get running in minutes.
            </ExpandCard>
            <ExpandCard title="Configuration" icon="settings">
              Customize your setup with flexible options. Adjust settings to match your workflow and preferences.
            </ExpandCard>
            <ExpandCard title="Resources" icon="folder">
              Guides, examples, and references to help you get the most out of your tools.
            </ExpandCard>
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
    {
      id: 'morph-button',
      label: 'ActionButton',
      render: () => (
        <ComponentStage>
          <ActionButton label="Save" icon="check" />
        </ComponentStage>
      ),
    },
    {
      id: 'spotlight-card',
      label: 'SpotlightCard',
      render: () => (
        <ComponentStage>
          <SpotlightCard className="w-[280px]">
            <div className="p-5">
              <div className="text-[15px] font-medium text-[var(--inv-heading)] mb-1">Analytics</div>
              <div className="text-[13px] text-[var(--inv-muted)]">Track performance metrics and user engagement in real time.</div>
            </div>
          </SpotlightCard>
        </ComponentStage>
      ),
    },
    {
      id: 'toggle',
      label: 'Toggle',
      render: () => (
        <ComponentStage>
          <div className="flex items-center gap-4">
            <Toggle checked={toggleOn} onChange={setToggleOn} />
            <Toggle checked={toggleOn} onChange={setToggleOn} size="small" />
          </div>
        </ComponentStage>
      ),
    },
    {
      id: 'badge',
      label: 'Badge',
      render: () => (
        <ComponentStage>
          <div className="flex items-center gap-2">
            <Badge label="Default" />
            <Badge label="Active" variant="accent" />
            <Badge label="Online" variant="success" />
            <Badge label="Pending" variant="warning" />
            <Badge label="Offline" variant="error" />
          </div>
        </ComponentStage>
      ),
    },
    {
      id: 'accordion',
      label: 'Accordion',
      render: () => (
        <ComponentStage>
          <div className="w-[400px]">
            <Accordion items={[
              { title: 'What is this?', content: 'A component library for building agent-powered interfaces with copy-paste components and CSS variable theming.' },
              { title: 'How do I install it?', content: 'Clone the repo, copy the components you need, install lucide-react, and import the theme CSS.' },
              { title: 'Can I customize it?', content: 'Override any --inv-* CSS variable to change colors, shadows, radii, and typography across all components.' },
            ]} />
          </div>
        </ComponentStage>
      ),
    },
    {
      group: 'Feedback', id: 'toast',
      label: 'Toast',
      render: () => <ToastDemo />,
    },
  ]
}

function ToastDemo() {
  const { addToast } = useToast()
  return (
    <ComponentStage>
      <button
        type="button"
        onClick={() => addToast('Bread alert', { message: 'Something just popped up' })}
        className="px-4 py-2.5 text-[15px] font-medium rounded-xl bg-[var(--inv-heading)] text-[var(--inv-bg)] cursor-pointer transition-[scale] duration-200 ease-out active:scale-[0.96]"
      >
        Show Toast
      </button>
    </ComponentStage>
  )
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
  const [cmdOpen, setCmdOpen] = useState(false)
  const [cmdQuery, setCmdQuery] = useState('')
  const cmdInputRef = useRef(null)

  useEffect(() => { document.title = 'Components — Invariant UI' }, [])

  // Cmd+K to toggle
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(prev => !prev)
        setCmdQuery('')
      }
      if (e.key === 'Escape') setCmdOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (cmdOpen) setTimeout(() => cmdInputRef.current?.focus(), 50)
  }, [cmdOpen])

  const cmdResults = cmdQuery.trim()
    ? screens.filter(s => s.label.toLowerCase().includes(cmdQuery.toLowerCase()))
    : screens

  const active = screens.find(s => s.id === activeId)

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[var(--inv-bg)] text-[var(--inv-heading)]">
        <div className="min-h-screen flex items-center justify-center">
          {active?.render()}
        </div>

        {/* Top bar */}
        <header className="fixed top-0 left-52 right-0 z-[70] h-14 px-5 flex items-center justify-between">
          {/* Center — search trigger (viewport centered) */}
          <div className="fixed left-1/2 top-0 h-14 -translate-x-1/2 flex items-center z-[70]">
            <button
              type="button"
              onClick={() => { setCmdOpen(true); setCmdQuery('') }}
              className="h-9 px-4 flex items-center gap-2 rounded-lg text-[13px] text-[var(--inv-muted)] hover:text-[var(--inv-heading)] hover:bg-[var(--inv-nav-hover-bg)] transition-[color,background-color] duration-150 cursor-pointer"
            >
              <Icon name="search" size={14} />
              <span className="hidden sm:inline">Search components...</span>
              <kbd className="hidden sm:inline text-[11px] font-mono font-medium text-[var(--inv-muted)]">⌘K</kbd>
            </button>
          </div>

          {/* Right — GitHub + dark mode */}
          <div className="ml-auto flex items-center gap-1">
            <a
              href="https://github.com/eythandamico/invariant"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-2 flex items-center gap-1.5 rounded-lg text-[13px] font-medium text-[var(--inv-body)] hover:text-[var(--inv-heading)] hover:bg-[var(--inv-nav-hover-bg)] transition-[color,background-color] duration-150"
            >
              <Icon name="github" size={16} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <button
              type="button"
              onClick={toggleDarkMode}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--inv-body)] hover:text-[var(--inv-heading)] hover:bg-[var(--inv-nav-hover-bg)] transition-[color,background-color] duration-150 cursor-pointer"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <Icon name={darkMode ? 'sun' : 'moon'} size={16} />
            </button>
          </div>
        </header>

        {/* Command palette */}
        {cmdOpen && (
          <>
            <div
              className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
              onClick={() => setCmdOpen(false)}
              style={{ animation: 'fadeIn 0.15s ease-out' }}
            />
            <div className="fixed top-[15%] left-1/2 z-[81] w-[90vw] max-w-[480px]" style={{ transform: 'translateX(-50%)', animation: 'cmdIn 0.2s cubic-bezier(0.34, 1.3, 0.64, 1)' }}>
              <div className="rounded-2xl bg-[var(--inv-surface)] overflow-hidden" style={{ boxShadow: 'var(--inv-shadow)' }}>
                <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--inv-border)]">
                  <Icon name="search" size={18} className="text-[var(--inv-muted)]" />
                  <input
                    ref={cmdInputRef}
                    type="text"
                    value={cmdQuery}
                    onChange={(e) => setCmdQuery(e.target.value)}
                    placeholder="Search components..."
                    className="flex-1 bg-transparent text-[15px] text-[var(--inv-heading)] placeholder-[var(--inv-muted)] outline-none"
                  />
                  <kbd className="text-[11px] font-mono font-medium text-[var(--inv-muted)]">ESC</kbd>
                </div>
                <div className="max-h-[320px] overflow-y-auto py-2">
                  {cmdResults.length === 0 ? (
                    <div className="px-4 py-6 text-center text-[13px] text-[var(--inv-muted)]">No components found</div>
                  ) : (
                    cmdResults.map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => { setActiveId(s.id); setCmdOpen(false) }}
                        className={`w-full text-left px-4 py-2 text-[15px] flex items-center gap-2 cursor-pointer transition-[background-color] duration-100 hover:bg-[var(--inv-nav-hover-bg)] ${
                          activeId === s.id ? 'text-[var(--inv-accent)] font-medium' : 'text-[var(--inv-heading)]'
                        }`}
                      >
                        {s.label}
                        {s.group && <span className="text-[11px] text-[var(--inv-muted)] ml-auto">{s.group}</span>}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
            <style>{`
              @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
              @keyframes cmdIn { from { opacity: 0; transform: translateX(-50%) scale(0.96); filter: blur(4px) } to { opacity: 1; transform: translateX(-50%) scale(1); filter: blur(0) } }
            `}</style>
          </>
        )}

        <nav className="fixed left-0 top-0 bottom-0 w-52 z-[70] flex flex-col">
          <div className="px-4 pt-5 pb-3 flex items-center gap-2 flex-shrink-0">
            <Icon name="shrimp" size={18} className="text-[var(--inv-accent)]" />
            <span className="text-[15px] font-semibold text-[var(--inv-heading)]">Invariant</span>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col justify-center gap-0.5" style={{ scrollbarWidth: 'none' }}>
            {screens.map((s, i) => (
              <div key={s.id}>
                {s.group && (
                  <div className={`px-2 pt-3 pb-1 text-[11px] uppercase tracking-wider text-[var(--inv-muted)] opacity-50 ${i > 0 ? 'mt-1' : ''}`}>
                    {s.group}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setActiveId(s.id)}
                  className={`w-full text-left px-2 py-1 text-[13px] rounded-lg transition-colors duration-150 cursor-pointer flex items-center ${
                    activeId === s.id
                      ? 'text-[var(--inv-heading)] font-medium'
                      : 'text-[var(--inv-muted)] hover:text-[var(--inv-heading)]'
                  }`}
                >
                  {activeId === s.id && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--inv-accent)] mr-2" />}
                  {s.label}
                </button>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </ToastProvider>
  )
}
