# Flexbox Pricing Table - Practice 21

This project demonstrates how to transform a simple pricing table into a modern, responsive, and perfectly centered layout using CSS Flexbox.

## Improvements Made

1.  **Perfect Centering:** The main container is centered both horizontally and vertically within the `body`.
2.  **Flexible Grid:** Pricing plans are arranged in a row and automatically wrap to a new line on smaller screens using `flex-wrap`.
3.  **Internal Alignment:** Content inside each card (title, price, features, button) is aligned vertically using a column-based Flexbox layout.
4.  **Modern Styling:** Implemented a dark theme background, card shadows, rounded corners, and interactive hover effects for buttons.

## Key Flexbox Concepts Explained

Here are the primary Flexbox properties used in this project:

### 1. `display: flex;`

This turns an element into a "flex container," making all its direct children "flex items."

- **Used on:** `body` and `.pricing-container`.

### 2. `justify-content: center;`

Aligns items along the **main axis** (horizontal by default).

- **center:** Packs items toward the center of the line.

### 3. `align-items: center;`

Aligns items along the **cross axis** (vertical by default).

- Used on the `body` to pull the entire container into the vertical center of the screen.

### 4. `flex-direction: column;`

Changes the direction of the main axis.

- **row (default):** Items are placed side-by-side.
- **column:** Items are stacked on top of each other.
- **Used on:** Each `.pricing-plan` card to stack content vertically.

### 5. `gap: 2rem;`

Sets the spacing between flex items. It provides a cleaner alternative to using margins on individual elements.

### 6. `min-height: 100vh;`

For vertical centering to work, the `body` must have a height. `100vh` ensures the body takes up at least 100% of the viewport height.

---

### How to Run

You can view this project by opening `index.html` in any browser or using Docker:

```bash
docker-compose up
```

Check `index.html` and `style.css` to see the implementation details.
