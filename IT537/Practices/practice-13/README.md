# Practice 13: CSS Positioning

This practice introduces the difference between "Relative" and "Absolute" positioning.

## Topics Covered

- **Relative Positioning:** Moving an element relative to its original place in the document flow.
- **Absolute Positioning:** Moving an element relative to its nearest positioned ancestor.
- **Coordinates:** Using `top`, `bottom`, `left`, and `right` to place elements.
- **Nesting Dynamics:** How absolute children interact with relative parents.

## Positioning Methods

| Method       | Property              | Behavior                                                                              |
| :----------- | :-------------------- | :------------------------------------------------------------------------------------ |
| **Static**   | `position: static;`   | The default value. Elements follow the normal document flow.                          |
| **Relative** | `position: relative;` | Positioned relative to its normal position. Keeps its spot in the layout flow.        |
| **Absolute** | `position: absolute;` | Removed from the layout flow; positioned relative to the nearest positioned ancestor. |
| **Fixed**    | `position: fixed;`    | Positioned relative to the viewport. Stays in the same place even when scrolling.     |
| **Sticky**   | `position: sticky;`   | Switches between relative and fixed based on the user's scroll position.              |

## Helpful Hint

When using `position: absolute`, the coordinates (`top`, `left`) only work as expected if a parent container has `position: relative`.
