# Practice 17: Media Queries

This practice focuses on the syntax and implementation of CSS Media Queries to change styles based on the viewport size.

## Topics Covered

- **Breakpoints:** Defining `min-width` and `max-width` ranges.
- **Dynamic Styling:** Changing background colors as the browser window is resized.
- **Viewport Meta Tag:** Importance of `<meta name="viewport" ...>` for mobile device rendering.

## Media Query Example Breakpoints

| Range             | Color Result | Device Category          |
| :---------------- | :----------- | :----------------------- |
| `319px - 480px`   | Light Salmon | Mobile Devices           |
| `481px - 1200px`  | Powder Blue  | Tablets / Small Laptops  |
| `1201px - 1600px` | Lime Green   | Large Screens / Desktops |
| `> 1601px`        | Sea Green    | Ultra-wide Screens       |

## Syntax Hint

```css
@media (min-width: 481px) and (max-width: 1200px) {
  body {
    background-color: powderblue;
  }
}
```
