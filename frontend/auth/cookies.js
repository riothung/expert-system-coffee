const urlParams = new URLSearchParams(window.location.search);
const tempToken = urlParams.get("tempToken");
if (tempToken) {
  fetch("http://localhost:3000/api/verify-token", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tempToken }),
  })
    .then((res) => res.json())
    .then((data) => console.log("Verified:", data))
    .catch((err) => console.error("Error:", err));
}