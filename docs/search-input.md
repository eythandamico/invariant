# SearchInput

Styled search input bar with icon and keyboard shortcut badge.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| placeholder | `string` | `'Search...'` | Input placeholder text |
| shortcutKey | `string` | `'⌘K'` | Keyboard shortcut shown as badge (set to `null` to hide) |
| className | `string` | `''` | Additional CSS classes on the wrapper |
| onSearch | `(value) => void` | — | Called on input change |
| autoFocus | `boolean` | `false` | Auto-focus the input on mount |

## Dependencies

- `lib/icon.jsx`
- `tokens/theme.css`
- `lucide-react` (peer)

## Usage

```jsx
import { SearchInput } from './components/search-input'

<SearchInput
  placeholder="Search tasks, agents, actions..."
  onSearch={(query) => console.log(query)}
/>
```

## CSS Variables Used

`--inv-surface`, `--inv-heading`, `--inv-muted`, `--inv-bg-alt`, `--inv-border`
