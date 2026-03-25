# ProfileDropdown

Avatar button with a dropdown menu for profile actions and dark mode toggle.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| avatarUrl | `string` | — | Profile image URL (required) |
| profile | `{name, email}` | — | User name and email shown in menu |
| profileItems | `Array<{label, icon, danger?, onAction}>` | `[]` | Menu action items |
| darkMode | `boolean` | `false` | Current dark mode state |
| onToggleDarkMode | `() => void` | — | Dark mode toggle callback |

## Dependencies

- `lib/icon.jsx`
- `lib/popover.js`
- `lib/use-click-outside.js`
- `tokens/theme.css`
- `lucide-react` (peer)

## Usage

```jsx
import { ProfileDropdown } from './components/profile-dropdown'

<ProfileDropdown
  avatarUrl="/avatar.jpg"
  profile={{ name: 'Jane Doe', email: 'jane@example.com' }}
  profileItems={[
    { label: 'Settings', icon: 'settings', onAction: () => {} },
    { label: 'Log out', icon: 'logout', danger: true, onAction: () => {} },
  ]}
  darkMode={isDark}
  onToggleDarkMode={() => setIsDark(!isDark)}
/>
```

## CSS Variables Used

`--inv-nav`, `--inv-accent`
