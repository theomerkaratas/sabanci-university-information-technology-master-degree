let userType = "customer";
let isRegisterMode = false;

const customerBtn = document.getElementById("customerBtn");
const adminBtn = document.getElementById("adminBtn");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");
const loginForm = document.getElementById("loginForm");
const submitBtn = document.getElementById("submitBtn");
const toggleMode = document.getElementById("toggleMode");
const toggleMsg = document.getElementById("toggleMsg");
const modeDescription = document.getElementById("modeDescription");
const userTypeContainer = document.getElementById("userTypeContainer");

if (customerBtn) {
  customerBtn.addEventListener("click", () => {
    userType = "customer";
    customerBtn.classList.add("active");
    adminBtn.classList.remove("active");
  });
}

if (adminBtn) {
  adminBtn.addEventListener("click", () => {
    userType = "admin";
    adminBtn.classList.add("active");
    customerBtn.classList.remove("active");
  });
}

function handleToggle(e) {
  if (e) e.preventDefault();
  isRegisterMode = !isRegisterMode;

  if (loginForm) loginForm.reset();

  if (isRegisterMode) {
    modeDescription.textContent = "Create a new customer account";
    submitBtn.textContent = "Register";
    toggleMsg.textContent = "Already have an account?";
    toggleMode.textContent = "Login";
    userTypeContainer.style.display = "none";
    userType = "customer";
  } else {
    modeDescription.textContent = "Please login to continue";
    submitBtn.textContent = "Login";
    toggleMsg.textContent = "Don't have an account?";
    toggleMode.textContent = "Create Account";
    userTypeContainer.style.display = "flex";
  }
}

if (toggleMode) {
  toggleMode.addEventListener("click", handleToggle);
}

function showMessage(msg, isError = true) {
  const target = isError ? errorMessage : successMessage;
  if (!target) return;
  target.textContent = msg;
  target.style.display = "block";
  setTimeout(() => {
    target.style.display = "none";
  }, 3000);
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      if (isRegisterMode) {
        await DataManager.registerUser({
          username,
          password,
          type: "customer",
        });
        showMessage("Account created! You can now login.", false);
        loginForm.reset();
        isRegisterMode = false;
        handleToggle();
      } else {
        const userData = await DataManager.loginUser({
          username,
          password,
        });

        if (userData.type !== userType) {
          throw new Error(`Invalid credentials for ${userType} login.`);
        }

        localStorage.setItem(
          "user",
          JSON.stringify({
            username: userData.username,
            type: userData.type,
            loginTime: new Date().toISOString(),
          }),
        );

        DataManager.logLogin(userData.username, userData.type);

        window.location.href =
          userData.type === "admin" ? "admin.html" : "/main";
      }
    } catch (error) {
      showMessage(error.message);
    }
  });
}
