export const products = [
  // Appetizers
  {
    id: 'app-1',
    name: 'Crispy Onion Rings',
    price: 85,
    description: 'Fried onion rings with special sauce',
    category: 'baslangic',
    image: null // Add images if available later
  },
  {
    id: 'app-2',
    name: 'Mozzarella Sticks',
    price: 95,
    description: 'Crispy breaded mozzarella with marinara sauce',
    category: 'baslangic'
  },
  {
    id: 'app-3',
    name: 'Buffalo Wings',
    price: 120,
    description: 'Spicy chicken wings with ranch sauce',
    category: 'baslangic'
  },

  // Main Courses
  {
    id: 'main-1',
    name: 'Classic Burger',
    price: 180,
    description: '200g beef, lettuce, tomato, onion, pickle, special sauce',
    category: 'ana-yemek',
    hasCookingLevel: true
  },
  {
    id: 'main-2',
    name: 'BBQ Burger',
    price: 210,
    description: 'Beef, BBQ sauce, cheddar cheese, onion rings',
    category: 'ana-yemek',
    hasCookingLevel: true
  },
  {
    id: 'main-3',
    name: 'Chicken Schnitzel',
    price: 195,
    description: 'Crispy chicken schnitzel, french fries, salad',
    category: 'ana-yemek'
  },
  {
    id: 'main-4',
    name: 'Grilled Steak',
    price: 350,
    description: '250g beef tenderloin, garnish, special sauce',
    category: 'ana-yemek',
    hasCookingLevel: true
  },

  // Pizza
  {
    id: 'pizza-1',
    name: 'Margherita',
    price: 160,
    description: 'Mozzarella, tomato sauce, basil',
    category: 'pizza'
  },
  {
    id: 'pizza-2',
    name: 'Pepperoni',
    price: 185,
    description: 'Pepperoni salami, mozzarella, tomato sauce',
    category: 'pizza'
  },
  {
    id: 'pizza-3',
    name: 'Quattro Formaggi',
    price: 200,
    description: 'Mozzarella, gorgonzola, parmesan, ricotta',
    category: 'pizza'
  },
  {
    id: 'pizza-4',
    name: 'Meat Lovers',
    price: 220,
    description: 'Sausage, salami, pepperoni, meatballs, mozzarella',
    category: 'pizza'
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'Chocolate Soufflé',
    price: 90,
    description: 'Warm chocolate soufflé with vanilla ice cream',
    category: 'tatli'
  },
  {
    id: 'dessert-2',
    name: 'Cheesecake',
    price: 85,
    description: 'Classic New York cheesecake with fruit sauce',
    category: 'tatli'
  },
  {
    id: 'dessert-3',
    name: 'Tiramisu',
    price: 95,
    description: 'Italian tiramisu, espresso, mascarpone',
    category: 'tatli'
  },

  // Beverages
  {
    id: 'bev-1',
    name: 'Coca Cola',
    price: 35,
    description: '330ml can',
    category: 'icecek'
  },
  {
    id: 'bev-2',
    name: 'Freshly Squeezed Lemonade',
    price: 50,
    description: 'Homemade lemonade with mint',
    category: 'icecek'
  },
  {
    id: 'bev-3',
    name: 'Filter Coffee',
    price: 45,
    description: 'Specially blended coffee',
    category: 'icecek'
  },
  {
    id: 'bev-4',
    name: 'Milkshake',
    price: 70,
    description: 'Chocolate, vanilla or strawberry',
    category: 'icecek'
  }
];

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'baslangic', name: 'Appetizers' },
  { id: 'ana-yemek', name: 'Main Courses' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'tatli', name: 'Desserts' },
  { id: 'icecek', name: 'Beverages' }
];

export const cookingLevels = [
  { value: 'rare', label: 'Rare' },
  { value: 'medium-rare', label: 'Medium Rare' },
  { value: 'medium', label: 'Medium' },
  { value: 'medium-well', label: 'Medium Well' },
  { value: 'well-done', label: 'Well Done' }
];
