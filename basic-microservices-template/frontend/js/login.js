const outputEl = document.getElementById("output");

function print(data) {
  outputEl.textContent = JSON.stringify(data, null, 2);
}

async function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  try {
    const data = await apiRequest("/users/register", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    print({ message: "Registered successfully", data });
  } catch (error) {
    print({ error: error.message });
  }
}

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  try {
    const data = await apiRequest("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    print({ message: "Login successful", data });
  } catch (error) {
    print({ error: error.message });
  }
}

document.getElementById("registerBtn").addEventListener("click", register);
document.getElementById("loginBtn").addEventListener("click", login);
