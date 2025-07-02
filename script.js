// This list should eventually be fetched from a server
const validTokens = ["abc123", "def456", "ghi789"]; // Example tokens

function verifyToken() {
  const input = document.getElementById("token-input").value.trim();
  const status = document.getElementById("status");

  if (validTokens.includes(input)) {
    status.style.color = "green";
    status.innerText = "Access Granted!";
    document.getElementById("token-section").style.display = "none";
    document.getElementById("installer-section").style.display = "block";
  } else {
    status.style.color = "red";
    status.innerText = "Invalid token. Please try again.";
  }
}
