import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
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
import { IconButton } from '../components/icon-button.jsx'
import { PinInput } from '../components/pin-input.jsx'
import { NumberInput } from '../components/number-input.jsx'
import { Textarea } from '../components/textarea.jsx'
import { Checkbox } from '../components/checkbox.jsx'
import { RadioGroup } from '../components/radio-group.jsx'
import { SliderInput } from '../components/slider-input.jsx'
import { Card } from '../components/card.jsx'
import { BottomSheet } from '../components/bottom-sheet.jsx'
import { ImageCarousel } from '../components/image-carousel.jsx'
import { SplitPane } from '../components/split-pane.jsx'
import { Table } from '../components/table.jsx'
import { Alert } from '../components/alert.jsx'
import { Tabs } from '../components/tabs.jsx'
import { Progress } from '../components/progress.jsx'
import { Dialog } from '../components/dialog.jsx'
import { Modal } from '../components/modal.jsx'
import Icon from '../lib/icon.jsx'
import { TABS, CHAT_TABS, STARTUPS } from './data.jsx'
import { CodeBlock } from './code-block.jsx'

const PROFILE = { name: 'Eythan D\'Amico', email: 'eythan@invariant.com' }
const PROFILE_ITEMS = [
  { label: 'Settings', icon: 'settings', onAction: () => console.log('Settings') },
  { label: 'Support', icon: 'message', onAction: () => console.log('Support') },
  { label: 'Feedback', icon: 'mail', onAction: () => console.log('Feedback') },
  { label: 'Log out', icon: 'logout', danger: true, onAction: () => console.log('Logout') },
]

function ComponentStage({ children }) {
  return (
    <div className="relative">
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
  const [cardVariant, setCardVariant] = useState('gradient')
  const [carouselAutoHide, setCarouselAutoHide] = useState(false)
  const [carouselPos, setCarouselPos] = useState('bottom')
  const [segVariant, setSegVariant] = useState('subdued')
  const [profileDir, setProfileDir] = useState('bottom')
  const [profileAlign, setProfileAlign] = useState('right')
  const [pinValue, setPinValue] = useState('')
  const [numberValue, setNumberValue] = useState(5)
  const [textareaValue, setTextareaValue] = useState('')
  const [checkboxA, setCheckboxA] = useState(false)
  const [checkboxB, setCheckboxB] = useState(true)
  const [radioValue, setRadioValue] = useState('pro')
  const [sliderValue, setSliderValue] = useState(40)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [activeTabDemo, setActiveTabDemo] = useState('all')
  const [progressValue, setProgressValue] = useState(65)
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
      id: 'welcome',
      label: 'Quick Start',
      render: () => (
        <div className="max-w-xl mx-auto px-8 pt-20 pb-24">
          <h1 className="text-[36px] font-semibold text-[var(--inv-heading)] leading-tight tracking-tight mb-3">
            Invariant UI
          </h1>
          <p className="text-[16px] text-[var(--inv-muted)] leading-relaxed mb-12">
            A component library built for AI agents. Give your agent a skill, point it at the repo, and it handles setup, theming, and composition on its own.
          </p>

          {/* For agents */}
          <div className="border-t border-[var(--inv-border)] pt-10 mb-10">
            <h2 className="text-[18px] font-semibold text-[var(--inv-heading)] mb-2">For agents</h2>
            <p className="text-[14px] text-[var(--inv-muted)] mb-4">
              Install the skill and your agent knows how to use every component.
            </p>
            <CodeBlock code="npx skills add invariant-ui" lang="bash" />
            <p className="text-[14px] text-[var(--inv-muted)] mt-4">
              The skill tells the agent where to pull components from, how the file structure works, and how to wire theming into whatever project it's building. No walkthrough needed — the agent reads the skill and gets to work.
            </p>
          </div>

          {/* For humans */}
          <div className="border-t border-[var(--inv-border)] pt-10 mb-10">
            <h2 className="text-[18px] font-semibold text-[var(--inv-heading)] mb-2">For humans</h2>
            <p className="text-[14px] text-[var(--inv-muted)] mb-4">
              If you're wiring things up manually, here's what's in the box.
            </p>
            <ol className="text-[14px] text-[var(--inv-muted)] mb-5 list-decimal list-inside flex flex-col gap-1.5">
              <li>Copy <code className="text-[var(--inv-heading)] font-mono text-[13px]">tokens/theme.css</code> into your project</li>
              <li>Copy any components you need from <code className="text-[var(--inv-heading)] font-mono text-[13px]">components/</code></li>
              <li>Import the theme CSS once at the root of your app</li>
            </ol>
            <CodeBlock code={`import './tokens/theme.css'
import { Button } from './components/button'

<Button label="Get started" />`} />
            <p className="text-[14px] text-[var(--inv-muted)] mt-5 mb-4">
              Some components use icons. If you're using one that does, install the peer dependency:
            </p>
            <CodeBlock code="npm install lucide-react" lang="bash" />
          </div>

          {/* Theming */}
          <div className="border-t border-[var(--inv-border)] pt-10 mb-10">
            <h2 className="text-[18px] font-semibold text-[var(--inv-heading)] mb-2">Theming</h2>
            <p className="text-[14px] text-[var(--inv-muted)] mb-4">
              Every color, shadow, and radius comes from <code className="text-[var(--inv-heading)] font-mono text-[13px]">--inv-*</code> CSS variables. Override any variable to customize. Toggle dark mode with a data attribute.
            </p>
            <CodeBlock code={`<html data-theme="dark">`} lang="html" />
          </div>

          {/* Components */}
          <div className="border-t border-[var(--inv-border)] pt-10 mb-10">
            <h2 className="text-[18px] font-semibold text-[var(--inv-heading)] mb-2">Components</h2>
            <p className="text-[14px] text-[var(--inv-muted)] mb-6">
              50 components across 9 categories. Browse them in the sidebar or press <kbd className="text-[12px] font-mono font-medium text-[var(--inv-muted)] bg-[var(--inv-surface)] px-1.5 py-0.5 rounded-md" style={{ boxShadow: 'var(--inv-shadow-sm)' }}>⌘K</kbd> to search.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {['Navigation', 'Inputs', 'Actions', 'Display', 'Controls', 'Layout', 'Feedback', 'Data', 'Overlays'].map(group => (
                <div key={group} className="rounded-xl bg-[var(--inv-bg-alt)] px-4 py-3">
                  <div className="text-[14px] font-medium text-[var(--inv-heading)]">{group}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      group: 'Navigation', id: 'bottom-nav',
      label: 'BottomNav',
      render: () => (
        <>
          <style>{`nav[aria-label="Navigation"] { left: 50% !important; bottom: 50% !important; transform: translateX(-50%) translateY(50%) !important; }`}</style>
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
        </>
      ),
    },
    {
      id: 'profile',
      label: 'ProfileMenu',
      render: () => {
        const isHorizontal = profileDir === 'left' || profileDir === 'right'
        return (
          <>
            <ComponentStage>
              <ProfileMenu
                avatarUrl="/profile_pic.jpg"
                profile={PROFILE}
                profileItems={PROFILE_ITEMS}
                placement={`${profileDir}-${profileAlign}`}
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
                activeTab={profileDir}
                onTabChange={(id) => { setProfileDir(id); if (id === 'left' || id === 'right') setProfileAlign('center') }}
              />
              <SegmentedControl
                tabs={[
                  { id: 'left', icon: 'align-left' },
                  { id: 'center', icon: 'align-center' },
                  { id: 'right', icon: 'align-right' },
                ]}
                activeTab={isHorizontal ? 'center' : profileAlign}
                onTabChange={(id) => !isHorizontal && setProfileAlign(id)}
                className={isHorizontal ? 'opacity-40 cursor-not-allowed [&_*]:pointer-events-none' : ''}
              />
            </div>
          </>
        )
      },
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
        <>
          <style>{`nav[aria-label="Navigation"] { left: 50% !important; bottom: 50% !important; transform: translateX(-50%) translateY(50%) !important; }`}</style>
          <ComponentStage>
            <BottomNav
              tabs={CHAT_TABS}
              activeTab={chatTab}
              onTabChange={setChatTab}
              chatTabId="chat"
              onSendMessage={(msg) => console.log('Send:', msg)}
            />
          </ComponentStage>
        </>
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
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3">
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
              className={isHorizontalDrop ? 'opacity-40 cursor-not-allowed [&_*]:pointer-events-none' : ''}
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
              <span className="text-[14px] text-[var(--inv-muted)]">Loading</span>
              <Toggle checked={btnLoading} onChange={setBtnLoading} size="small" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--inv-surface)]" style={{ boxShadow: 'var(--inv-shadow-sm)' }}>
              <span className="text-[14px] text-[var(--inv-muted)]">Disabled</span>
              <Toggle checked={btnDisabled} onChange={setBtnDisabled} size="small" />
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'icon-button',
      label: 'IconButton',
      render: () => (
        <ComponentStage>
          <div className="flex items-center gap-2">
            <IconButton icon="plus" label="Add" elevated />
            <IconButton icon="edit" label="Edit" elevated />
            <IconButton icon="upload" label="Upload" elevated />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <IconButton icon="close" label="Close" size="small" />
            <IconButton icon="settings" label="Settings" size="small" />
            <IconButton icon="search" label="Search" size="small" />
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
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--inv-surface)]" style={{ boxShadow: 'var(--inv-shadow-sm)' }}>
              <span className="text-[14px] text-[var(--inv-muted)]">Icon</span>
              <Toggle checked={inputIcon} onChange={setInputIcon} />
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'textarea',
      label: 'Textarea',
      render: () => (
        <ComponentStage>
          <div className="w-[360px]">
            <Textarea
              label="Bio"
              placeholder="Tell us about yourself..."
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              maxLength={280}
              rows={5}
            />
          </div>
        </ComponentStage>
      ),
    },
    {
      id: 'number-input',
      label: 'NumberInput',
      render: () => (
        <ComponentStage>
          <NumberInput
            value={numberValue}
            onChange={setNumberValue}
            min={0}
            max={99}
          />
        </ComponentStage>
      ),
    },
    {
      id: 'pin-input',
      label: 'PinInput',
      render: () => (
        <ComponentStage>
          <PinInput value={pinValue} onChange={setPinValue} />
        </ComponentStage>
      ),
    },
    {
      id: 'checkbox',
      label: 'Checkbox',
      render: () => (
        <ComponentStage>
          <div className="flex flex-col gap-3">
            <Checkbox checked={checkboxA} onChange={setCheckboxA} label="I agree to the terms" />
            <Checkbox checked={checkboxB} onChange={setCheckboxB} label="Send me updates" />
          </div>
        </ComponentStage>
      ),
    },
    {
      id: 'radio-group',
      label: 'RadioGroup',
      render: () => (
        <ComponentStage>
          <RadioGroup
            options={[
              { id: 'free', label: 'Free' },
              { id: 'pro', label: 'Pro' },
              { id: 'team', label: 'Team' },
            ]}
            value={radioValue}
            onChange={setRadioValue}
          />
        </ComponentStage>
      ),
    },
    {
      id: 'slider-input',
      label: 'SliderInput',
      render: () => (
        <ComponentStage>
          <div className="w-[360px]">
            <SliderInput
              label="Volume"
              value={sliderValue}
              onChange={setSliderValue}
              min={0}
              max={100}
              suffix="%"
            />
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
              className={avatarView === 'group' ? 'opacity-40 cursor-not-allowed [&_*]:pointer-events-none' : ''}
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

          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3">
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
        <>
          <ComponentStage>
            <SegmentedControl
              tabs={[
                { id: 'all', label: 'All' },
                { id: 'active', label: 'Active' },
                { id: 'archived', label: 'Archived' },
              ]}
              activeTab={tabDemo}
              onTabChange={setTabDemo}
              variant={segVariant}
            />
          </ComponentStage>
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3">
            <SegmentedControl
              tabs={[
                { id: 'default', label: 'Default' },
                { id: 'subdued', label: 'Subdued' },
              ]}
              activeTab={segVariant}
              onTabChange={setSegVariant}
            />
          </div>
        </>
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

          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveStep(s => Math.max(0, s - 1))}
              className="px-3 py-1.5 text-[14px] font-medium rounded-xl bg-[var(--inv-surface)] text-[var(--inv-muted)] hover:text-[var(--inv-heading)] transition-colors duration-150 cursor-pointer"
              style={{ boxShadow: 'var(--inv-shadow-sm)' }}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(s => Math.min(4, s + 1))}
              className="px-3 py-1.5 text-[14px] font-medium rounded-xl bg-[var(--inv-accent)] text-[var(--inv-bg)] transition-colors duration-150 cursor-pointer"
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
      id: 'split-pane',
      label: 'SplitPane',
      render: () => (
        <ComponentStage>
          <SplitPane
            height={360}
            className="w-[560px]"
            left={
              <div className="h-full flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="text-[var(--inv-text-lg)] font-semibold text-[var(--inv-heading)] mb-1">Editor</div>
                  <div className="text-[var(--inv-text-sm)] text-[var(--inv-muted)]">Drag the divider</div>
                </div>
              </div>
            }
            right={
              <div className="h-full flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="text-[var(--inv-text-lg)] font-semibold text-[var(--inv-heading)] mb-1">Preview</div>
                  <div className="text-[var(--inv-text-sm)] text-[var(--inv-muted)]">Resizable panes</div>
                </div>
              </div>
            }
          />
        </ComponentStage>
      ),
    },
    {
      id: 'image-carousel',
      label: 'ImageCarousel',
      render: () => (
        <>
          <ComponentStage>
            <div className="w-[480px]">
              <ImageCarousel
                images={[
                  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop',
                  'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&h=500&fit=crop',
                  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=500&fit=crop',
                  'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&h=500&fit=crop',
                ]}
                height={300}
                autoHide={carouselAutoHide}
                controlsPosition={carouselPos}
              />
            </div>
          </ComponentStage>
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3">
            <SegmentedControl
              tabs={[
                { id: 'top', icon: 'arrow-up' },
                { id: 'bottom', icon: 'arrow-down' },
                { id: 'left', icon: 'arrow-left' },
                { id: 'right', icon: 'arrow-right' },
              ]}
              activeTab={carouselPos}
              onTabChange={setCarouselPos}
            />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--inv-surface)]" style={{ boxShadow: 'var(--inv-shadow-sm)' }}>
              <span className="text-[14px] text-[var(--inv-muted)]">Auto-hide</span>
              <Toggle checked={carouselAutoHide} onChange={setCarouselAutoHide} size="small" />
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'card',
      label: 'Card',
      render: () => (
        <>
          <ComponentStage>
            <Card
              variant={cardVariant}
              gradientSeed={cardVariant === 'gradient' ? 'Project Alpha' : undefined}
              image={cardVariant === 'video' ? '/card-video.mp4' : undefined}
              title="Project Alpha"
              description="A next-generation interface for managing autonomous agent workflows."
              className="w-[340px]"
            />
          </ComponentStage>
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3">
            <SegmentedControl
              tabs={[
                { id: 'gradient', label: 'Gradient' },
                { id: 'subdued', label: 'Subdued' },
                { id: 'video', label: 'Video' },
              ]}
              activeTab={cardVariant}
              onTabChange={setCardVariant}
            />
          </div>
        </>
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
              <div className="text-[14px] text-[var(--inv-muted)]">Track performance metrics and user engagement in real time.</div>
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
            <Badge label="Active" variant="dark" />
            <Badge label="Pending" variant="subdued" />
            <Badge label="v2.1.0" variant="outline" />
          </div>
        </ComponentStage>
      ),
    },
    {
      id: 'accordion',
      label: 'Accordion',
      render: () => (
        <ComponentStage>
          <div className="w-[340px]">
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
    {
      id: 'dialog',
      label: 'Dialog',
      render: () => (
        <>
          <ComponentStage>
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="px-4 py-2.5 text-[15px] font-medium rounded-xl bg-[var(--inv-heading)] text-[var(--inv-bg)] cursor-pointer transition-[scale] duration-200 ease-out active:scale-[0.96]"
            >
              Open Dialog
            </button>
          </ComponentStage>
          {createPortal(
            <Dialog
              isOpen={dialogOpen}
              onClose={() => setDialogOpen(false)}
              title="Delete project?"
              description="This action cannot be undone. All data will be permanently removed."
              actions={
                <>
                  <Button label="Cancel" variant="ghost" onClick={() => setDialogOpen(false)} />
                  <Button label="Delete" variant="danger" onClick={() => setDialogOpen(false)} />
                </>
              }
            />,
            document.body
          )}
        </>
      ),
    },
    {
      id: 'modal',
      label: 'Modal',
      render: () => (
        <>
          <ComponentStage>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-4 py-2.5 text-[15px] font-medium rounded-xl bg-[var(--inv-heading)] text-[var(--inv-bg)] cursor-pointer transition-[scale] duration-200 ease-out active:scale-[0.96]"
            >
              Open Modal
            </button>
          </ComponentStage>
          {createPortal(
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Settings"
            >
              <div className="flex flex-col gap-4">
                <TextInput label="Display name" placeholder="Your name" />
                <TextInput label="Email" placeholder="you@example.com" />
                <div className="flex justify-end gap-2 pt-2">
                  <Button label="Cancel" variant="ghost" onClick={() => setModalOpen(false)} />
                  <Button label="Save" variant="primary" onClick={() => setModalOpen(false)} />
                </div>
              </div>
            </Modal>,
            document.body
          )}
        </>
      ),
    },
    {
      group: 'Data', id: 'table',
      label: 'Table',
      render: () => (
        <ComponentStage>
          <Table
            className="w-[600px]"
            columns={[
              { key: 'agent', label: 'Agent' },
              { key: 'status', label: 'Status' },
              { key: 'tasks', label: 'Tasks', align: 'right' },
              { key: 'uptime', label: 'Uptime', align: 'right' },
            ]}
            data={[
              { agent: 'Scout', status: 'Active', tasks: 142, uptime: '99.8%' },
              { agent: 'Forge', status: 'Active', tasks: 89, uptime: '99.2%' },
              { agent: 'Relay', status: 'Idle', tasks: 67, uptime: '98.5%' },
              { agent: 'Cipher', status: 'Active', tasks: 203, uptime: '99.9%' },
              { agent: 'Beacon', status: 'Paused', tasks: 31, uptime: '97.1%' },
              { agent: 'Nova', status: 'Active', tasks: 118, uptime: '99.4%' },
            ]}
          />
        </ComponentStage>
      ),
    },
    {
      id: 'tabs',
      label: 'Tabs',
      render: () => (
        <ComponentStage>
          <Tabs
            tabs={[
              { id: 'all', label: 'All', count: 24 },
              { id: 'active', label: 'Active', count: 12 },
              { id: 'archived', label: 'Archived', count: 3 },
            ]}
            activeTab={activeTabDemo}
            onTabChange={setActiveTabDemo}
          />
        </ComponentStage>
      ),
    },
    {
      id: 'progress',
      label: 'Progress',
      render: () => (
        <>
          <ComponentStage>
            <div className="w-[360px] flex flex-col gap-6">
              <Progress value={progressValue} label="Upload" showValue />
              <Progress value={progressValue} size="small" />
              <Progress value={100} label="Complete" size="large" />
            </div>
          </ComponentStage>
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3">
            <div className="w-[200px]">
              <SliderInput
                label="Value"
                value={progressValue}
                onChange={setProgressValue}
                min={0}
                max={100}
                suffix="%"
              />
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'alert',
      label: 'Alert',
      render: () => (
        <ComponentStage>
          <div className="w-[420px] flex flex-col gap-3">
            <Alert variant="info" title="New update available" description="Version 2.1 includes performance improvements and bug fixes." dismissible />
            <Alert variant="success" title="Deployment complete" description="Your changes are now live." />
            <Alert variant="warning" title="Rate limit" description="You're approaching your API quota." />
            <Alert variant="error" title="Build failed" description="Check the logs for details." dismissible />
          </div>
        </ComponentStage>
      ),
    },
    {
      group: 'Overlays', id: 'bottom-sheet',
      label: 'BottomSheet',
      render: () => {
        return (
          <>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="px-4 py-2.5 text-[15px] font-medium rounded-xl bg-[var(--inv-heading)] text-[var(--inv-bg)] cursor-pointer transition-[scale] duration-200 ease-out active:scale-[0.96]"
            >
              Open Bottom Sheet
            </button>
            {createPortal(
              <BottomSheet
                isOpen={sheetOpen}
                onClose={() => setSheetOpen(false)}
              />,
              document.body
            )}
          </>
        )
      },
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
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('inv-dark-mode')
    const initial = saved !== null ? saved === 'true' : true
    document.documentElement.setAttribute('data-theme', initial ? 'dark' : 'light')
    return initial
  })
  const toggleDarkMode = () => {
    const next = !darkMode
    setDarkMode(next)
    localStorage.setItem('inv-dark-mode', String(next))
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
  }

  const screens = useScreens(darkMode, toggleDarkMode)
  const [activeId, setActiveId] = useState(() => {
    const saved = localStorage.getItem('inv-active-component')
    return screens.find(s => s.id === saved) ? saved : 'welcome'
  })

  useEffect(() => {
    localStorage.setItem('inv-active-component', activeId)
  }, [activeId])
  const [cmdOpen, setCmdOpen] = useState(false)
  const [cmdQuery, setCmdQuery] = useState('')
  const cmdInputRef = useRef(null)
  const navListRef = useRef(null)
  const [navScrolledTop, setNavScrolledTop] = useState(true)

  useEffect(() => {
    const el = navListRef.current
    if (!el) return
    const onScroll = () => setNavScrolledTop(el.scrollTop < 10)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

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
  const [visible, setVisible] = useState(true)
  const [rendered, setRendered] = useState(activeId)
  const pendingId = useRef(null)

  const switchTo = useCallback((id) => {
    if (id === rendered) return
    pendingId.current = id
    setVisible(false)
    setTimeout(() => {
      setRendered(id)
      setActiveId(id)
      requestAnimationFrame(() => setVisible(true))
    }, 120)
  }, [rendered])

  const renderedScreen = screens.find(s => s.id === rendered)

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[var(--inv-bg)] text-[var(--inv-heading)]">
        <div className="min-h-screen flex items-center justify-center">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transition: visible
                ? 'opacity 0.2s ease-out'
                : 'opacity 0.1s ease-in',
            }}
          >
            {renderedScreen?.render()}
          </div>
        </div>

        {/* Top bar */}
        <header className="fixed top-0 left-0 right-0 z-[70] h-14 px-16 flex items-center justify-between border-b border-[var(--inv-border)]">
          {/* Left — shrimp + breadcrumbs */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button type="button" onClick={() => switchTo('welcome')} className="cursor-pointer hover:scale-110 transition-transform duration-150">
              <Icon name="shrimp" size={20} className="text-[var(--inv-accent)]" />
            </button>
            {(() => {
              if (activeId === 'welcome') {
                return <span className="text-[14px] font-medium text-[var(--inv-heading)]">Invariant UI</span>
              }
              const current = screens.find(s => s.id === activeId)
              const group = current?.group || screens.slice(0, screens.indexOf(current)).reverse().find(s => s.group)?.group
              return (
                <div className="flex items-center gap-1.5 text-[14px] text-[var(--inv-muted)]">
                  <span>Components</span>
                  {group && (
                    <>
                      <span className="opacity-30">/</span>
                      <span>{group}</span>
                    </>
                  )}
                  <span className="opacity-30">/</span>
                  <span className="text-[var(--inv-heading)] font-medium">{current?.label}</span>
                </div>
              )
            })()}
          </div>

          {/* Center — search trigger */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => { setCmdOpen(true); setCmdQuery('') }}
              className="h-9 w-[320px] px-4 flex items-center gap-2 rounded-xl bg-[var(--inv-bg-alt)] text-[14px] text-[var(--inv-muted)] hover:text-[var(--inv-heading)] transition-[color,background-color] duration-150 cursor-pointer"
            >
              <Icon name="search" size={14} />
              <span className="hidden sm:inline flex-1 text-left">Search components...</span>
              <kbd className="hidden sm:inline text-[12px] font-mono font-medium text-[var(--inv-muted)] bg-[var(--inv-surface)] px-1.5 py-0.5 rounded-md" style={{ boxShadow: 'var(--inv-shadow-sm)' }}>⌘K</kbd>
            </button>
          </div>

          {/* Right — GitHub + dark mode */}
          <div className="flex items-center justify-end gap-1 w-52 flex-shrink-0">
            <a
              href="https://github.com/eythandamico/invariant"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-2 flex items-center gap-1.5 rounded-xl text-[14px] font-medium text-[var(--inv-body)] hover:text-[var(--inv-heading)] hover:bg-[var(--inv-nav-hover-bg)] transition-[color,background-color] duration-150"
            >
              <Icon name="github" size={16} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <button
              type="button"
              onClick={toggleDarkMode}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[var(--inv-body)] hover:text-[var(--inv-heading)] hover:bg-[var(--inv-nav-hover-bg)] transition-[color,background-color] duration-150 cursor-pointer"
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
                <div className="flex items-center gap-3 px-4 py-3">
                  <Icon name="search" size={20} className="text-[var(--inv-muted)]" />
                  <input
                    ref={cmdInputRef}
                    type="text"
                    value={cmdQuery}
                    onChange={(e) => setCmdQuery(e.target.value)}
                    placeholder="Search components..."
                    className="flex-1 bg-transparent text-[16px] text-[var(--inv-heading)] placeholder-[var(--inv-muted)] outline-none"
                  />
                  <kbd className="text-[12px] font-mono font-medium text-[var(--inv-muted)] bg-[var(--inv-bg-alt)] px-1.5 py-0.5 rounded-md">ESC</kbd>
                </div>
                <div className="max-h-[360px] overflow-y-auto py-2">
                  {cmdResults.length === 0 ? (
                    <div className="px-5 py-8 text-center text-[15px] text-[var(--inv-muted)]">No components found</div>
                  ) : (
                    cmdResults.map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => { switchTo(s.id); setCmdOpen(false) }}
                        className={`w-full text-left px-5 py-2.5 text-[16px] flex items-center gap-2 cursor-pointer transition-[background-color] duration-100 hover:bg-[var(--inv-nav-hover-bg)] ${
                          activeId === s.id ? 'text-[var(--inv-accent)] font-medium' : 'text-[var(--inv-heading)]'
                        }`}
                      >
                        {s.label}
                        {s.group && <span className="text-[12px] text-[var(--inv-muted)] ml-auto">{s.group}</span>}
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

        <nav className="fixed left-0 top-0 bottom-0 w-64 z-[70] flex flex-col">
          <div className="h-14 flex-shrink-0" />
          <div className="flex-1 relative">
            <div ref={navListRef} className="absolute inset-0 overflow-y-auto px-16 pb-40 pt-24 flex flex-col gap-2" style={{ scrollbarWidth: 'none' }}>
              {screens.map((s, i) => (
                <div key={s.id}>
                  {s.group && (
                    <div className={`px-2 pt-4 pb-1 text-[12px] uppercase tracking-wider text-[var(--inv-muted)] opacity-50 ${i > 0 ? 'mt-2' : ''}`}>
                      {s.group}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => switchTo(s.id)}
                    className={`w-full text-left px-2 py-1.5 text-[15px] rounded-lg transition-colors duration-150 cursor-pointer flex items-center ${
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
            <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none transition-opacity duration-200" style={{ opacity: navScrolledTop ? 0 : 1, background: 'linear-gradient(to bottom, var(--inv-bg), transparent)', backdropFilter: 'blur(6px)', maskImage: 'linear-gradient(to bottom, black, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--inv-bg) 20%, transparent)', backdropFilter: 'blur(6px)', maskImage: 'linear-gradient(to top, black, transparent)', WebkitMaskImage: 'linear-gradient(to top, black, transparent)' }} />
          </div>
        </nav>
      </div>
    </ToastProvider>
  )
}
