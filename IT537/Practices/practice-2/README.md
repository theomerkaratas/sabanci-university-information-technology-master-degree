# Practice 2: CSS Flag Project

A complex layout project using absolute positioning, circles, and nested elements to create a flag.

## Topics Covered

- **Absolute Placement:** Using absolute positions to overlap elements.
- **Creating Shapes:** Using `border-radius: 200px` to turn a square into a circle.
- **Z-Value Concept:** Understanding the stack order (background vs. foreground).
- **Hierarchical Selectors:** Styling direct children specifically (e.g., `div.flag > p`).

## Shape and Position Settings

| Feature       | Property             | Result                            |
| :------------ | :------------------- | :-------------------------------- |
| **Circle**    | `border-radius: 50%` | Rounds corners completely.        |
| **Layering**  | `position: absolute` | Allows overlaps.                  |
| **Centering** | `left` / `top`       | Manual placement on the "canvas". |

## Visual Structure

- Container (`.flag`): The overall canvas.
- Stripe: An absolute div nested inside the flag.
- Circle: A rounded div nested inside the stripe.
