// Firebase references
const dbRef = firebase.database().ref("messages");

// Function to send anonymous message
function sendMessage() {
  const message = document.getElementById("message").value.trim();
  if (message === "") {
    alert("Please write something before sending!");
    return;
  }

  const newMsgRef = dbRef.push();
  newMsgRef.set({
    text: message,
    timestamp: new Date().toISOString()
  });

  alert("Message sent anonymously!");
  document.getElementById("message").value = "";
}

// Show admin login section
function showAdminLogin() {
  document.querySelector(".user-section").style.display = "none";
  document.querySelector(".admin-login").style.display = "block";
}

// Admin credentials (simple for now)
const ADMIN_EMAIL = "admin@rangam.com";
const ADMIN_PASS = "rangam123";

// Admin login
function adminLogin() {
  const email = document.getElementById("adminEmail").value;
  const pass = document.getElementById("adminPass").value;

  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    document.querySelector(".admin-login").style.display = "none";
    document.querySelector(".admin-section").style.display = "block";
    loadMessages();
  } else {
    alert("Invalid admin credentials!");
  }
}

// Logout
function logout() {
  document.querySelector(".admin-section").style.display = "none";
  document.querySelector(".user-section").style.display = "block";
}

// Load all messages for admin
function loadMessages() {
  const msgDiv = document.getElementById("messages");
  msgDiv.innerHTML = "Loading...";

  dbRef.on("value", (snapshot) => {
    msgDiv.innerHTML = "";
    if (snapshot.exists()) {
      const data = snapshot.val();
      Object.keys(data).forEach((key) => {
        const msg = data[key];
        const msgBox = document.createElement("div");
        msgBox.className = "message";
        msgBox.innerHTML = `
          <p>${msg.text}</p>
          <small>${new Date(msg.timestamp).toLocaleString()}</small>
        `;
        msgDiv.appendChild(msgBox);
      });
    } else {
      msgDiv.innerHTML = "No messages yet.";
    }
  });
}
