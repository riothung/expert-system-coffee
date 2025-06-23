const form = document.getElementById("signIn");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  responseLogin();
});

const responseLogin = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const data = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await data.json();
    console.log(json);
    if (data.ok) {
      alert("Login Berhasil!")
      window.location.href = "./index.html";
    }else{
      alert(`Login Gagal! ${data.message}`)
    }
  } catch (e) {
    console.error(e);
    alert("An error occurred. Please try again later.", e.message);
  }
};

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    const result = await response.json();
    console.log(result.message);
    if (response.ok) {
      window.location.href = "./login.html";
    }
  } catch (e) {
    console.error(e);
    alert("An error occurred. Please try again later.", e.message);
  }
});
