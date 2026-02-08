# Practice 11: CSS Cascade

This practice demonstrates how CSS rules conflict and resolve through specificity and inheritance.

## Topics Covered

- **Inheritance:** How child elements inherit styles from their parents.
- **Specificity Order:** ID > Class > Element.
- **Overriding:** How later rules in the stylesheet can replace earlier ones.
- **Box Nesting:** Managing styles for divs within divs.

## Selector Specificity Comparison

| Strategy  | Selector     | Priority |
| :-------- | :----------- | :------- |
| **ID**    | `#outer-box` | Highest  |
| **Class** | `.inner-box` | Medium   |
| **Tag**   | `p`          | Lowest   |

## Key Concept

Styles cascade down. If multiple rules apply to the same property, the most specific one wins.
