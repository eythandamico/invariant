---
name: invariant-ui
description: Use when building UI components, interfaces, dashboards, or any frontend that needs buttons, inputs, modals, cards, navigation, or layout. Provides a copy-paste component library with CSS variable theming — fetch only the components you need.
---

# Invariant UI

A component library for building agent-powered interfaces. Don't clone the whole repo — fetch only what you need.

**Source:** https://github.com/eythandamico/invariant/tree/main/invariant-ui

## How to use

### Step 1: Fetch the manifest

Read `components.json` from the repo to see every available component, its file path, export name, dependencies, and docs:

```
https://raw.githubusercontent.com/eythandamico/invariant/main/invariant-ui/components.json
```

### Step 2: Fetch the theme (required, once)

Every component depends on `tokens/theme.css`. Copy it into the project first:

```
https://raw.githubusercontent.com/eythandamico/invariant/main/invariant-ui/tokens/theme.css
```

Import it once at the app root:

```jsx
import './tokens/theme.css'
```

### Step 3: Fetch only the components you need

Look up the component in `components.json`. It tells you:
- `file` — the component file to copy
- `deps` — lib files the component needs (copy these too)
- `peer` — npm packages to install (usually just `lucide-react`)

Example: to use `Button`, `components.json` says:
```json
{
  "file": "components/button.jsx",
  "deps": ["lib/icon.jsx"],
  "peer": ["lucide-react"]
}
```

So fetch:
- `components/button.jsx`
- `lib/icon.jsx`

Then `npm install lucide-react` if not already installed.

Base URL for all files:
```
https://raw.githubusercontent.com/eythandamico/invariant/main/invariant-ui/
```

### Step 4: Read the rules

Before writing or modifying any component, read `RULES.md`:

```
https://raw.githubusercontent.com/eythandamico/invariant/main/invariant-ui/RULES.md
```

Critical rules:
1. **Never hardcode colors** — use `--inv-*` CSS variables
2. **Never import lucide-react directly** — use `lib/icon.jsx`
3. **Never use `font-bold`** — use `font-medium` (500) or `font-semibold` (600)
4. **Use layout primitives** (`Stack`, `Row`, `Surface`) instead of raw divs
5. **Use `components.json`** to resolve all dependencies

### Step 5: Read component docs (optional)

Each component has a doc file with props, usage examples, and CSS variables used:

```
https://raw.githubusercontent.com/eythandamico/invariant/main/invariant-ui/docs/<component-name>.md
```

## Theming

All components use `--inv-*` CSS variables. Dark mode: set `data-theme="dark"` on a parent element. Override any variable to customize.

Key variables: `--inv-bg`, `--inv-bg-alt`, `--inv-surface`, `--inv-accent`, `--inv-heading`, `--inv-body`, `--inv-muted`, `--inv-border`

## Full reference

For the complete component table and detailed guide:

```
https://raw.githubusercontent.com/eythandamico/invariant/main/invariant-ui/agent.md
```
