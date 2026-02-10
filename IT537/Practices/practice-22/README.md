# Practice 22: Chessboard with CSS Grid

This practice project demonstrates how to create a responsive 8x8 chessboard layout using **CSS Grid**.

## Objective

The goal of this exercise is to:

- Learn and implement **CSS Grid Layout**.
- Use `grid-template-columns` and `grid-template-rows` to define a structured grid.
- Practice using semantic CSS classes for repeating patterns (white and black tiles).

## Technical Implementation

### CSS Grid Concepts Used

In this project, the `.container` class acts as the **Grid Container**, and all the `div` elements inside it are **Grid Items**. Here are the key parameters used:

1.  **`display: grid;`**
    - This property turns the element into a grid container. It enables the use of grid-specific properties on this element and its direct children.

2.  **`grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;`**
    - This defines the number and size of the columns.
    - We have **8 columns** to match a standard chessboard.
    - **`1fr` (Fractional Unit)**: This is a flexible unit that represents a fraction of the available space in the grid container. Here, by using `1fr` eight times, we ensure each column takes exactly 1/8th of the 800px width.

3.  **`grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;`**
    - Similar to columns, this defines **8 rows** of equal height.
    - Since the container has a fixed width and the items have fixed heights (100px), these rows align perfectly to form the grid.

4.  **`gap: 0px;`**
    - This defines the spacing between the grid cells. For a chessboard, we want the tiles to be perfectly adjacent, so the gap is set to `0`.

### Visual Structure

The grid automatically places the 64 `div` elements into these 8x8 cells in the order they appear in the HTML. By alternating the `.white` and `.black` classes, we achieve the classic chessboard pattern.

## Color Palette

- **White Tiles** (`#f0d9b5`): A light cream color.
- **Black Tiles** (`#b58863`): A wooden brown color.

## How to Run

You can run this practice project individually using Docker:

```bash
docker compose up -d
```

Once started, access the project at [http://localhost:8022](http://localhost:8022).
