# Invariant UI

A component library for building agent-powered interfaces. Copy-paste components with CSS variable theming.

**IMPORTANT: Read `RULES.md` before creating or modifying any component.** It defines mandatory patterns for colors, shadows, accessibility, animations, and file conventions. Every component must use `--inv-*` CSS variables — no hardcoded values.

> **The `showcase/` directory is a local dev tool. Do not reference it when building interfaces.**

## Quick start

Get the SearchBar component working in 3 steps:

1. Copy these files into your project:
   - `tokens/theme.css`
   - `lib/icon.jsx`
   - `components/search-bar.jsx`

2. Install the peer dependency:
   ```bash
   npm install lucide-react
   ```

3. Import and use:
   ```jsx
   import '../tokens/theme.css'
   import { SearchBar } from './components/search-bar'

   function App() {
     return <SearchBar placeholder="Search..." onSearch={(q) => console.log(q)} />
   }
   ```

## Setup requirements

- **React** 18+
- **Tailwind CSS** 4+
- **lucide-react** — `npm install lucide-react`
- Import `tokens/theme.css` somewhere in your app

## Components

| Component | File | Docs | Dependencies |
|-----------|------|------|--------------|
| Accordion | `components/accordion.jsx` | `docs/accordion.md` | `lib/icon.jsx` |
| ActionButton | `components/action-button.jsx` | `docs/action-button.md` | `lib/icon.jsx` |
| AgentAvatar | `components/agent-avatar.jsx` | `docs/agent-avatar.md` | `lib/popover.js` |
| Badge | `components/badge.jsx` | `docs/badge.md` | — |
| BottomNav | `components/bottom-nav.jsx` | `docs/bottom-nav.md` | `lib/icon.jsx`, `lib/popover.js`, `lib/use-click-outside.js`, `lib/use-is-mobile.js` |
| Button | `components/button.jsx` | `docs/button.md` | `lib/icon.jsx` |
| Dropdown | `components/dropdown.jsx` | `docs/dropdown.md` | `lib/icon.jsx`, `lib/popover.js`, `lib/use-click-outside.js` |
| ExpandCard | `components/expand-card.jsx` | `docs/expand-card.md` | `lib/icon.jsx` |
| MessageBubble | `components/message-bubble.jsx` | `docs/message-bubble.md` | `lib/icon.jsx`, `components/agent-avatar.jsx`, `components/profile-avatar.jsx` |
| ProfileAvatar | `components/profile-avatar.jsx` | `docs/profile-avatar.md` | `lib/popover.js` |
| ProfileMenu | `components/profile-menu.jsx` | `docs/profile-menu.md` | `lib/icon.jsx`, `lib/popover.js`, `lib/use-click-outside.js` |
| PromptBar | `components/prompt-bar.jsx` | `docs/prompt-bar.md` | `lib/icon.jsx`, `lib/popover.js`, `lib/use-click-outside.js` |
| SearchBar | `components/search-bar.jsx` | `docs/search-bar.md` | `lib/icon.jsx` |
| SearchToggle | `components/search-toggle.jsx` | `docs/search-toggle.md` | `lib/icon.jsx`, `lib/use-click-outside.js` |
| SegmentedControl | `components/segmented-control.jsx` | `docs/segmented-control.md` | `lib/icon.jsx` |
| Select | `components/select.jsx` | `docs/select.md` | `lib/icon.jsx`, `lib/popover.js`, `lib/use-click-outside.js` |
| SpotlightCard | `components/spotlight-card.jsx` | `docs/spotlight-card.md` | — |
| StepIndicator | `components/step-indicator.jsx` | `docs/step-indicator.md` | — |
| TextInput | `components/text-input.jsx` | `docs/text-input.md` | `lib/icon.jsx` |
| Toast | `components/toast.jsx` | `docs/toast.md` | `lib/icon.jsx` |
| Toggle | `components/toggle.jsx` | `docs/toggle.md` | — |
| WorkspaceSwitcher | `components/workspace-switcher.jsx` | `docs/workspace-switcher.md` | `lib/icon.jsx`, `lib/popover.js`, `lib/use-click-outside.js` |

### Layout

| Component | File | Docs | Dependencies |
|-----------|------|------|--------------|
| Divider | `components/divider.jsx` | `docs/divider.md` | — |
| PageSection | `components/page-section.jsx` | `docs/page-section.md` | — |
| Row | `components/row.jsx` | `docs/row.md` | — |
| Stack | `components/stack.jsx` | `docs/stack.md` | — |
| Surface | `components/surface.jsx` | `docs/surface.md` | — |

**Machine-readable manifest:** `components.json` contains every component with its file path, export name, dependencies, and doc location.

## Adding a component

1. Copy the component file from `components/` into your project
2. Copy its dependencies from `lib/` (listed in the table above)
3. Ensure `tokens/theme.css` is imported in your app
4. Read the component's doc in `docs/` for props and usage examples
5. See `docs/patterns.md` for full-page composition examples showing how to combine components

## Theming

All components use `--inv-*` CSS variables defined in `tokens/theme.css`.

- **Light/dark mode:** Set `data-theme="light"` or `data-theme="dark"` on a parent element
- **Preset themes:** Add a CSS class like `theme-midnight` or `theme-forest`
- **Custom themes:** Override any `--inv-*` variable in your own CSS

See `docs/theming.md` for the full guide and variable reference.

## CSS variables

| Variable | Light | Dark |
|----------|-------|------|
| `--inv-bg` | `#FBFAF9` | `#121212` |
| `--inv-bg-alt` | `#F2F0ED` | `#2a2a2a` |
| `--inv-surface` | `#FFFFFF` | `#1e1e1e` |
| `--inv-accent` | `oklch(0.629 0.187 252)` | `oklch(0.629 0.187 252)` |
| `--inv-accent-soft` | `oklch(0.95 0.03 252)` | `oklch(0.25 0.05 252)` |
| `--inv-heading` | `#171717` | `#f0f0f0` |
| `--inv-body` | `#494440` | `#c5c2bf` |
| `--inv-muted` | `#767270` | `#8a8582` |
| `--inv-border` | `#E8E8E8` | `#363636` |
| `--inv-input` | `#f7f7f7` | `#343434` |
| `--inv-nav` | `#FFFFFF` | `#1e1e1e` |
| `--inv-nav-text` | `#767270` | `#a3a3a3` |
| `--inv-nav-text-active` | `#171717` | `#ffffff` |
| `--inv-nav-divider` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.1)` |
| `--inv-nav-hover-bg` | `#F5F3F0` | `rgba(255,255,255,0.1)` |
| `--inv-menu-bg` | `#FFFFFF` | `#1e1e1e` |
| `--inv-menu-text` | `#b5b3b1` | `#a3a3a3` |
| `--inv-menu-text-active` | `#171717` | `#ffffff` |
| `--inv-menu-hover-bg` | `#F5F3F0` | `rgba(255,255,255,0.1)` |
| `--inv-menu-divider` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.1)` |
| `--inv-shadow` | subtle | deeper |
| `--inv-shadow-sm` | border-shadow | border-shadow |
| `--inv-shadow-sm-hover` | border-shadow hover | border-shadow hover |
| `--inv-nav-shadow` | nav elevation | nav elevation |
| `--inv-menu-shadow` | menu elevation | menu elevation |
| `--inv-outline` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.15)` |
| `--inv-radius` | `12px` | `12px` |

## Animation system

`lib/popover.js` exports two animation styles:

- **`popoverStyle(isOpen, origin)`** — scale + blur from a transform origin. For menus that bloom from a button.
- **`slideStyle(isOpen, placement)`** — directional slide + blur. For dropdowns that open in a direction.

Placements: `bottom-left`, `bottom-center`, `bottom-right`, `top-left`, `top-center`, `top-right`, `left-top`, `left-center`, `left-bottom`, `right-top`, `right-center`, `right-bottom`

Both respect `prefers-reduced-motion`.

## Icon reference

The `lib/icon.jsx` component wraps Lucide React icons with a name-based API:

```jsx
import Icon from './lib/icon'
<Icon name="search" size={18} />
```

The `size` prop sets the display size in pixels. Icons render at native 24px viewBox and scale via CSS for crisp rendering.

Available icon names:

`alert`, `align-center`, `align-left`, `align-right`, `archive`, `arrow-down`, `arrow-left`, `arrow-right`, `arrow-up`, `article`, `bell-dot`, `briefcase`, `bulletlist`, `bullseye-arrow`, `calendar`, `calendar-check`, `chart`, `chart-bar`, `check`, `chevron-right`, `chevrons-vertical`, `circle`, `clipboard`, `clock`, `close`, `coin`, `coins`, `copy`, `cpu`, `crown`, `dashboard`, `database`, `edit`, `edit-box`, `external-link`, `file-text`, `folder`, `github`, `globe`, `grid`, `home`, `image`, `list`, `list-box`, `loader`, `lock`, `login`, `logout`, `mail`, `menu`, `message`, `mic`, `moon`, `more-vertical`, `note`, `notification`, `open`, `paperclip`, `plus`, `add-box`, `power`, `repeat`, `robot`, `search`, `send`, `settings`, `shield`, `shrimp`, `sliders`, `sliders-2`, `sparkle`, `speed`, `square`, `sun`, `sword`, `target`, `terminal`, `thumbs-down`, `thumbs-up`, `trophy`, `upload`, `user`, `users`, `wallet`, `zap`
