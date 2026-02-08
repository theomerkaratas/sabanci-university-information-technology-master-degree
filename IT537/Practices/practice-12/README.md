# Practice 12: Combining Selectors

This practice focuses on advanced targeting of elements using selector combinations.

## Topics Covered

- **Descendant Selector:** Targeting elements inside a container (e.g., `.box li`).
- **Child Selector:** Targeting direct children only (e.g., `.box > .done`).
- **Class/Tag Combination:** Targeting specific tags with a certain class (e.g., `li.done`).
- **Grouping Selectors:** Applying the same style to multiple tags at once (e.g., `h1, h2`).

## Selector Combinations Table

| Syntax    | Type        | Example                             |
| :-------- | :---------- | :---------------------------------- |
| `A, B`    | Grouping    | `h1, h2` (Both get the style)       |
| `A B`     | Descendant  | `.box p` (Any p inside box)         |
| `A > B`   | Child       | `.box > p` (Direct p child only)    |
| `A.class` | Combination | `li.done` (An li with class "done") |
