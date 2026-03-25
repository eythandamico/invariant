# StartupSwitcher

Displays the current startup with a dropdown to switch between startups.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| currentStartup | `{name, slug, initials, color, avatarUrl?}` | — | Active startup (required) |
| startups | `Array<{name, slug, initials, color, avatarUrl?, role?}>` | `[]` | All available startups |
| onStartupChange | `(slug) => void` | — | Callback when startup is switched |

## Dependencies

- `lib/icon.jsx`
- `lib/popover.js`
- `lib/use-click-outside.js`
- `tokens/theme.css`
- `lucide-react` (peer)

## Usage

```jsx
import { StartupSwitcher } from './components/startup-switcher'

const startups = [
  { name: 'Acme Labs', initials: 'AL', color: '#6366f1', slug: 'acme', role: 'Owner' },
  { name: 'Neon Grid', initials: 'NG', color: '#10b981', slug: 'neon' },
]

<StartupSwitcher
  currentStartup={startups[0]}
  startups={startups}
  onStartupChange={(slug) => setCurrentSlug(slug)}
/>
```

## CSS Variables Used

`--inv-heading`, `--inv-muted`, `--inv-nav`, `--inv-accent`
