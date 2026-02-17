const user = JSON.parse(localStorage.getItem("user"));
if (!user || user.type !== "customer") {
  window.location.href = "/";
}

document.getElementById("userWelcome").textContent =
  `Welcome, ${user.username}`;
document.getElementById("logoutBtn").style.display = "block";

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/";
});

let cart = [];
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

cartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
});

function updateCart() {
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    cartTotal.textContent = "0₺";
    return;
  }

  let total = 0;
  let html = "";

  cart.forEach((item, index) => {
    total += item.price;
    const cookingLevel = item.cookingLevel
      ? ` (${item.cookingLevel})`
      : "";

    html += `
              <div class="cart-item">
                  <div class="cart-item-info">
                      <div class="cart-item-name">${item.name}${cookingLevel}</div>
                      <div class="cart-item-price">${item.price}₺</div>
                  </div>
                  <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
              </div>
          `;
  });

  cartItems.innerHTML = html;
  cartTotal.textContent = total + "₺";
}

function addToCart(name, price, cookingLevel = null) {
  cart.push({ name, price, cookingLevel });
  updateCart();

  const message = cookingLevel
    ? `${name} (${cookingLevel}) added to cart!`
    : `${name} added to cart!`;

  showToast(message);
}

// Global function for onclick
window.removeFromCart = function(index) {
  cart.splice(index, 1);
  updateCart();
};

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

const categoryButtons = document.querySelectorAll(".cat-btn");
const sections = document.querySelectorAll(".category-section");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedCategory = button.getAttribute("data-category");

    sections.forEach((section) => {
      if (selectedCategory === "all") {
        section.classList.remove("hidden");
      } else {
        if (section.getAttribute("data-category") === selectedCategory) {
          section.classList.remove("hidden");
        } else {
          section.classList.add("hidden");
        }
      }
    });
  });
});

const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const cardBody = this.closest(".card-body");
    const itemName = cardBody.querySelector(".item-name").textContent;
    const itemPrice = parseFloat(
      cardBody.querySelector(".item-price").textContent.replace("₺", ""),
    );
    const levelSelect = cardBody.querySelector(".level-select");

    let cookingLevel = null;
    if (levelSelect) {
      cookingLevel = levelSelect.options[levelSelect.selectedIndex].text;
    }

    addToCart(itemName, itemPrice, cookingLevel);

    this.textContent = "✓ Added";
    this.style.backgroundColor = "var(--primary-color)";

    setTimeout(() => {
      this.textContent = "Add to Cart";
      this.style.backgroundColor = "";
    }, 1500);
  });
});

const tableModal = document.getElementById("tableModal");
const tableOverlay = document.getElementById("tableOverlay");
const closeTableModal = document.getElementById("closeTableModal");
const tableGrid = document.getElementById("tableGrid");
let selectedTable = null;

const tables = Array.from({ length: 10 }, (_, i) => ({
  number: i + 1,
  occupied: false,
}));

async function updateTableOccupancy() {
  try {
    const orders = await DataManager.fetchOrdersFromServer();
    const occupiedTables = orders
      .filter(
        (order) =>
          order.status !== "completed" && order.status !== "cancelled",
      )
      .map((order) => parseInt(order.table));

    tables.forEach((table) => {
      table.occupied = occupiedTables.includes(table.number);
    });
  } catch (error) {
    console.error("Error updating table occupancy:", error);
    showToast("Could not fetch live table status.");
  }
}

async function renderTables() {
  tableGrid.innerHTML =
    '<div style="grid-column: 1/-1; text-align: center; padding: 20px;">Checking table availability...</div>';

  await updateTableOccupancy();

  tableGrid.innerHTML = tables
    .map(
      (table) => `
          <div class="table-card ${table.occupied ? "occupied" : ""}" 
               data-table="${table.number}"
               onclick="selectTable(${table.number}, ${table.occupied})">
              <div class="table-icon">🪑</div>
              <div class="table-number">Table ${table.number}</div>
              <div class="table-status">${table.occupied ? "Occupied" : "Available"}</div>
          </div>
      `,
    )
    .join("");
}

window.selectTable = function(tableNumber, isOccupied) {
  if (isOccupied) {
    showToast("This table is already occupied!");
    return;
  }

  selectedTable = tableNumber;

  document.querySelectorAll(".table-card").forEach((card) => {
    card.classList.remove("selected");
  });
  const selectedCard = document.querySelector(`[data-table="${tableNumber}"]`);
  if (selectedCard) selectedCard.classList.add("selected");

  setTimeout(() => {
    completeOrder(tableNumber);
  }, 500);
};

async function completeOrder(tableNumber) {
  const order = {
    id: Date.now().toString(),
    customer: user.username,
    table: tableNumber,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price, 0),
    date: new Date().toISOString(),
    status: "pending",
  };

  await DataManager.saveOrderToServer(order);

  cart = [];
  updateCart();

  if (tableModal) tableModal.classList.remove("active");
  if (tableOverlay) tableOverlay.classList.remove("active");
  if (cartSidebar) cartSidebar.classList.remove("active");
  if (cartOverlay) cartOverlay.classList.remove("active");

  showToast(
    `Order #${order.id} placed for Table ${tableNumber}! Total: ${order.total}₺`,
  );
}

if (closeTableModal) {
  closeTableModal.addEventListener("click", () => {
    tableModal.classList.remove("active");
    tableOverlay.classList.remove("active");
  });
}

if (tableOverlay) {
  tableOverlay.addEventListener("click", () => {
    tableModal.classList.remove("active");
    tableOverlay.classList.remove("active");
  });
}

const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty!");
      return;
    }

    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");

    renderTables();
    tableModal.classList.add("active");
    tableOverlay.classList.add("active");
  });
}
