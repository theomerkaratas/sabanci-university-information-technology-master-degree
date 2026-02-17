const user = JSON.parse(localStorage.getItem("user"));
if (!user || user.type !== "admin") {
  window.location.href = "/";
}

document.getElementById("adminUsername").textContent = user.username;

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/";
});

document
  .getElementById("exportOrdersBtn")
  .addEventListener("click", () => {
    DataManager.exportOrdersToCSV();
  });

document
  .getElementById("exportLoginBtn")
  .addEventListener("click", () => {
    DataManager.exportLoginActivityToCSV();
  });

document.getElementById("exportAllBtn").addEventListener("click", () => {
  DataManager.exportAllDataToCSV();
});

document.getElementById("importBtn").addEventListener("click", () => {
  document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    DataManager.importOrdersFromCSV(file);
  }
});

let currentFilter = "all";

async function loadOrders() {
  const orders = await DataManager.fetchOrdersFromServer();
  updateStats(orders);
  displayOrders(orders, currentFilter);
}

function updateStats(orders) {
  const today = new Date().toDateString();
  const todayOrders = orders.filter(
    (order) => new Date(order.date).toDateString() === today,
  );
  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  );
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total,
    0,
  );

  document.getElementById("totalOrders").textContent = orders.length;
  document.getElementById("pendingOrders").textContent =
    pendingOrders.length;
  document.getElementById("totalRevenue").textContent =
    totalRevenue + "₺";
  document.getElementById("todayOrders").textContent = todayOrders.length;
}

function displayOrders(orders, filter) {
  const tbody = document.getElementById("ordersTableBody");

  let filteredOrders = orders;
  if (filter !== "all") {
    filteredOrders = orders.filter((order) => order.status === filter);
  }

  if (filteredOrders.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="8" class="no-orders">No orders found</td></tr>';
    return;
  }

  filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

  tbody.innerHTML = filteredOrders
    .map(
      (order) => `
          <tr>
              <td><strong>#${order.id}</strong></td>
              <td><strong style="color: var(--primary-color);">Table ${order.table || "N/A"}</strong></td>
              <td>${order.customer}</td>
              <td class="order-items">
                  ${order.items
                    .map(
                      (item) =>
                        `${item.name}${item.cookingLevel ? ` (${item.cookingLevel})` : ""}`,
                    )
                    .join(", ")}
              </td>
              <td><strong>${order.total}₺</strong></td>
              <td>${new Date(order.date).toLocaleString()}</td>
              <td><span class="status-badge status-${order.status}">${order.status.toUpperCase()}</span></td>
              <td>
                  <select class="action-select" onchange="updateOrderStatus('${order.id}', this.value)">
                      <option value="">Change Status</option>
                      <option value="pending" ${order.status === "pending" ? "disabled" : ""}>Pending</option>
                      <option value="preparing" ${order.status === "preparing" ? "disabled" : ""}>Preparing</option>
                      <option value="ready" ${order.status === "ready" ? "disabled" : ""}>Ready</option>
                      <option value="completed" ${order.status === "completed" ? "disabled" : ""}>Completed</option>
                  </select>
              </td>
          </tr>
      `,
    )
    .join("");
}

window.updateOrderStatus = async function (orderId, newStatus) {
  if (!newStatus) return;

  await DataManager.updateOrderStatusOnServer(orderId, newStatus);
  loadOrders();

  showToast(`Order #${orderId} status updated to ${newStatus}`);
};

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    loadOrders();
  });
});

document.getElementById("refreshBtn").addEventListener("click", () => {
  loadOrders();
  showToast("Orders refreshed");
});

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.top = "100px";
  toast.style.right = "20px";
  toast.style.backgroundColor = "var(--primary-color)";
  toast.style.color = "white";
  toast.style.padding = "15px 25px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
  toast.style.zIndex = "10000";
  toast.style.opacity = "0";
  toast.style.transform = "translateX(400px)";
  toast.style.transition = "all 0.3s ease";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(400px)";
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

loadOrders();

setInterval(loadOrders, 30000);
