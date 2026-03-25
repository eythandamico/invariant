import { useState, useEffect } from 'react'
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
        <ComponentStage>
          <div className="w-[500px] flex flex-col gap-4">
            <MessageBubble
              role="user"
              content="Can you help me deploy this to production?"
              avatarUrl="/profile_pic.jpg"
            />
            <MessageBubble
              role="agent"
              agentName="Nova"
              content="Sure! I'll run the build pipeline and set up the deployment. Give me a moment to check the configuration."
            />
            <MessageBubble
              role="user"
              content="Go for it."
              avatarUrl="/profile_pic.jpg"
            />
            <MessageBubble
              role="agent"
              agentName="Nova"
              thinking
            />
          </div>
        </ComponentStage>
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

  useEffect(() => { document.title = 'Components — Invariant UI' }, [])

  const active = screens.find(s => s.id === activeId)

  return (
    <ToastProvider>
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

        <nav className="fixed left-0 top-0 bottom-0 w-52 px-4 flex flex-col justify-center gap-0.5 z-[70] overflow-y-auto">
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
        </nav>
      </div>
    </ToastProvider>
  )
}
