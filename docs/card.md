# Card

Content card with optional header image, title, description, and body slot.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| image | `string` | — | Header image URL. Omit to hide the image area. |
| title | `string` | — | Card heading |
| description | `string` | — | Secondary text below title |
| children | `ReactNode` | — | Additional body content below description |
| className | `string` | `''` | Additional CSS classes |

## Dependencies

- `tokens/theme.css`

## Usage

```jsx
{/* With image */}
<Card
  image="/cover.jpg"
  title="Project Alpha"
  description="A brief description of the project."
/>

{/* Without image */}
<Card
  title="Analytics"
  description="Track performance metrics in real time."
/>

{/* With custom body */}
<Card title="Settings">
  <Button label="Configure" variant="secondary" />
</Card>
```

## CSS Variables Used

`--inv-surface`, `--inv-shadow-sm`, `--inv-heading`, `--inv-muted`
