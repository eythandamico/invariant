# Badge

Small status pill with variant colors.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | — | Badge text |
| variant | `'default'\|'accent'\|'success'\|'warning'\|'error'` | `'default'` | Color variant |
| className | `string` | `''` | Additional CSS classes |

## Dependencies

- `tokens/theme.css`

## Usage

```jsx
<Badge label="Active" variant="success" />
```

## CSS Variables Used

`--inv-bg-alt`, `--inv-muted`, `--inv-accent`
