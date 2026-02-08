# Practice 15: CSS Float

This practice illustrates how to use the `float` property to position elements and the `clear` property to reset layout behavior.

## Topics Covered

- **Floating Elements:** Using `float: left` and `float: right` to move elements out of their normal flow.
- **Clear Property:** Using `clear: both` to prevent elements (like footers) from wrapping around floats.
- **Inline-Block Comparison:** Using `display: inline-block` alongside floats for side-by-side layouts.

## Float Properties

| Property | Value   | Description                                         |
| :------- | :------ | :-------------------------------------------------- |
| `float`  | `left`  | Pushes element to the left.                         |
| `float`  | `right` | Pushes element to the right.                        |
| `clear`  | `both`  | Ensures element starts below all floating elements. |

## Layout Example

- `.cat` div floats left.
- `.dog` div floats right.
- `footer` uses `clear: both` to stay at the bottom.
