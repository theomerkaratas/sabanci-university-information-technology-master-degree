# Practice 20: Flexbox Visual Guide

This practice provides a comprehensive, interactive look at Flexbox layout properties. It includes a navigation hub to visualize how different properties affect element alignment and sizing.

## Visual Learning Hub

The project contains an interactive [Visual Guide (index.html)](./index.html) that allows you to swap between different Flexbox configurations:

- **Flex Wrap:** Single-line vs multi-line content.
- **Alignment:** Detailed examples for `justify-content`, `align-items`, and `align-content`.

## Topics Covered

- **Main vs Cross Axis:** Understanding how alignment changes based on direction.
- **Multi-line Alignment:** Using `flex-wrap` and `align-content` for complex layouts.
- **Flex Sizing:** Interaction between `flex-grow`, `flex-shrink`, and `flex-basis`.

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

## Flex Shorthand

The `flex` property is a shorthand for `flex-grow`, `flex-shrink`, and `flex-basis` (in that order).

| Shorthand          | Equivalent To                                      |
| :----------------- | :------------------------------------------------- |
| `flex: 1 0 300px;` | `flex-grow: 1; flex-shrink: 0; flex-basis: 300px;` |
| `flex: 1;`         | `flex-grow: 1; flex-shrink: 1; flex-basis: 0%;`    |
| `flex: 0 1 auto;`  | The default value.                                 |

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

## Further Reading

- For more info, check out the [Complete Guide to CSS Flexbox Layout](https://css-tricks.com/snippets/css/complete-guide-to-css-flexbox-layout/) on CSS-Tricks.
- You can also learn while playing a game: [Flexbox Froggy](https://appbrewery.github.io/flexboxfroggy/)
