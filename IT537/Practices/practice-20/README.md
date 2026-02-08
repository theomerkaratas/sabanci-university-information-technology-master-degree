# Practice 20: Flex Direction and Sizing

This practice explores the core concepts of Flexbox, focusing on how to align items and manage their initial sizes.

## Topics Covered

- **Flex Container:** Using `display: flex` to enable the flex context.
- **Flex Direction:** Controlling the primary axis (row or column).
- **Flex Basis:** Setting the initial size of a flex item before free space is distributed.
- **Sizing with Width vs Basis:** Understanding how `flex-basis` interacts with `width`.

## Flexbox Container Properties

| Property         | Description         | Values                                           |
| :--------------- | :------------------ | :----------------------------------------------- |
| `display`        | Activates Flexbox.  | `flex`, `inline-flex`                            |
| `flex-direction` | Set the main axis.  | `row`, `row-reverse`, `column`, `column-reverse` |
| `flex-wrap`      | Multi-line control. | `nowrap`, `wrap`, `wrap-reverse`                 |
| `flex-flow`      | Shorthand.          | `row wrap`                                       |

## Alignment - Main Axis (`justify-content`)

| Value             | Description                                     |
| :---------------- | :---------------------------------------------- |
| **flex-start**    | Items packed at the start (default).            |
| **flex-end**      | Items packed at the end.                        |
| **center**        | Items packed in the middle.                     |
| **space-between** | Space only _between_ items.                     |
| **space-around**  | Space _around_ items (equal sides).             |
| **space-evenly**  | Space between all items and edges is identical. |

## Alignment - Cross Axis (`align-items`)

| Value          | Description                     |
| :------------- | :------------------------------ |
| **stretch**    | Fill the line height (default). |
| **flex-start** | Top of the cross axis.          |
| **flex-end**   | Bottom of the cross axis.       |
| **center**     | Middle of the cross axis.       |
| **baseline**   | Align based on text baselines.  |

## Flexbox Item Properties

| Property     | Description                             | Values                             |
| :----------- | :-------------------------------------- | :--------------------------------- |
| `order`      | Visual order of the item.               | `integer` (Default: 0)             |
| `align-self` | Override container's `align-items`.     | `auto`, `center`, `flex-end`, etc. |
| `flex`       | Shorthand for grow, shrink, basis.      | `1 1 200px`                        |
| `flex-basis` | Initial size before space distribution. | `length` or `auto`                 |

## Flex Sizing Table

| Property        | Usage               | Effect                                          |
| :-------------- | :------------------ | :---------------------------------------------- |
| **flex-grow**   | `flex-grow: 1`      | Element will expand to fill available space.    |
| **flex-shrink** | `flex-shrink: 0`    | Element will not shrink even if space is tight. |
| **flex-basis**  | `flex-basis: 300px` | Initial "ideal" size of the element.            |

## Code Snippet Example

```css
.container {
  display: flex;
  flex-direction: column; /* Stacks items vertically */
}

div > div {
  flex-basis: 100px; /* Each child starts with 100px height (in column mode) */
}
```
