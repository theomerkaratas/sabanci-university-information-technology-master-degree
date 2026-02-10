# Practice 23: CSS Grid Sizing & Track Functions

Welcome to the **Grid Sizing Fundamentals** practice. While Flexbox is great for 1D layouts (rows _or_ columns), CSS Grid is designed for **2D layouts** (rows _and_ columns simultaneously). This practice focuses on how to define and control the size of those grid tracks.

## Core Concepts & Examples

This project is divided into several sections, each demonstrating a specific sizing technique.

### 1. Fixed Sizing (`px`)

Absolute units provide total control but lack flexibility.

```css
.grid-container {
  display: grid;
  grid-template-rows: 100px 200px;
  grid-template-columns: 400px 800px;
}
```

- **Use case**: When you know exactly how large an element (like a logo or sidebar) needs to be in pixels.
- **File**: `fixed-size.html`

### 2. Auto Sizing (`auto`)

The track grows to fit its contents.

```css
.grid-container {
  display: grid;
  grid-template-columns: 200px auto;
}
```

- **Behaviour**: The first column is 200px. The second column expands to fit the text or images inside it.
- **File**: `auto-size.html`

### 3. Fractional Units (`fr`)

The most powerful tool in Grid. It represents a "fraction" of the available space.

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
```

- **Pro Tip**: If the container is 1200px wide, `1fr` will be 400px and `2fr` will be 800px. It automatically recalculates as the window resizes!
- **File**: `fractional-size.html`

### 4. The `minmax()` Function

Prevents tracks from getting too small or too large.

```css
.grid-container {
  grid-template-columns: 200px minmax(400px, 5fr);
}
```

- **Logic**: "Keep this column at least 400px wide, but if there's more room, let it grow up to 5 fractional units."
- **File**: `minmax-size.html`

### 5. The `repeat()` Shorthand

Clean code for repeating patterns.

```css
/* Instead of: 200px 200px 200px */
grid-template-columns: repeat(3, 200px);
```

- **Usage**: Great for card galleries or chessboards.
- **File**: `repeat.html`

---

## 🏆 The "Test" Challenge

The `test.html` file serves as a final exercise. It provides a "Reference Layout" (Green) and asks you to write the CSS for a "Target Layout" (Purple) to match it.

**Challenge Goal**: Use a combination of `1fr`, `auto`, and `minmax()` to achieve a complex, responsive layout where:

- Columns have different growth rates.
- Some tracks have minimum boundary limits.
- The layout remains stable across different screen sizes.

## How to Run

1.  Start the container: `docker compose up -d`
2.  Open [http://localhost:8023](http://localhost:8023)
3.  Navigate through the examples to see how each CSS property changes the physical behaviour of the board.
