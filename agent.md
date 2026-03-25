# Invariant UI

A component library for building agent-powered interfaces. Copy-paste components with CSS variable theming.

**IMPORTANT: Read `RULES.md` before creating or modifying any component.** It defines mandatory patterns for colors, shadows, accessibility, animations, and file conventions. Every component must use `--inv-*` CSS variables — no hardcoded values.

## Quick start

Get the SearchInput component working in 3 steps:

1. Copy these files into your project:
   - `tokens/theme.css`
   - `lib/icon.jsx`
   - `components/search-input.jsx`

2. Install the peer dependency:
   ```bash
   npm install lucide-react
   ```

3. Import and use:
   ```jsx
   import '../tokens/theme.css'
   import { SearchInput } from './components/search-input'

   function App() {
     return <SearchInput placeholder="Search..." onSearch={(q) => console.log(q)} />
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
| BottomNav | `components/bottom-nav.jsx` | `docs/bottom-nav.md` | `lib/icon.jsx`, `lib/popover.js`, `lib/use-click-outside.js`, `lib/use-is-mobile.js` |
| ProfileDropdown | `components/profile-dropdown.jsx` | `docs/profile-dropdown.md` | `lib/icon.jsx`, `lib/popover.js`, `lib/use-click-outside.js` |
| StartupSwitcher | `components/startup-switcher.jsx` | `docs/startup-switcher.md` | `lib/icon.jsx`, `lib/popover.js`, `lib/use-click-outside.js` |
| SearchInput | `components/search-input.jsx` | `docs/search-input.md` | `lib/icon.jsx` |

## Adding a component

1. Copy the component file from `components/` into your project
2. Copy its dependencies from `lib/` (listed in the table above)
3. Ensure `tokens/theme.css` is imported in your app
4. Read the component's doc in `docs/` for props and usage examples

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
| `--inv-nav` | `#171717` | `#1e1e1e` |
| `--inv-radius` | `12px` | `12px` |

## Icon reference

The `lib/icon.jsx` component wraps Lucide React icons with a name-based API:

```jsx
import Icon from './lib/icon'
<Icon name="search" size={18} className="text-gray-500" />
```

The `size` prop sets the display size in pixels. Icons render at native 24px viewBox and scale via CSS for crisp rendering.

Available icon names:

`alert`, `archive`, `arrow-left`, `arrow-right`, `article`, `bullseye-arrow`, `bulletlist`, `briefcase`, `calendar`, `calendar-check`, `chart`, `chart-bar`, `check`, `chevron-right`, `chevrons-vertical`, `clipboard`, `clock`, `close`, `coin`, `coins`, `cpu`, `crown`, `dashboard`, `database`, `edit`, `edit-box`, `external-link`, `file-text`, `folder`, `globe`, `grid`, `home`, `image`, `list`, `list-box`, `loader`, `lock`, `login`, `logout`, `mail`, `menu`, `message`, `moon`, `more-vertical`, `note`, `notification`, `open`, `plus`, `add-box`, `power`, `repeat`, `robot`, `search`, `settings`, `shield`, `sliders`, `sliders-2`, `sparkle`, `speed`, `sun`, `sword`, `target`, `terminal`, `thumbs-down`, `thumbs-up`, `trophy`, `upload`, `user`, `wallet`, `zap`
