// Send message anonymously to Firebase
function sendMessage() {
  const msg = document.getElementById("message").value.trim();
  if (msg === "") {
    alert("Please write something before sending!");
    return;
  }

  const newMessageRef = firebase.database().ref("messages").push();
  newMessageRef.set({
    text: msg,
    time: new Date().toLocaleString()
  });

  document.getElementById("message").value = "";
  alert("Your message has been sent anonymously!");
}

// Show admin login form
function showAdminLogin() {
  document.querySelector(".user-section").style.display = "none";
  document.querySelector(".admin-login").style.display = "block";
}

// Admin login check
function adminLogin() {
  const email = document.getElementById("adminEmail").value;
  const pass = document.getElementById("adminPass").value;
  if (email === "admin@admin.com" && pass === "admin2025") {
    document.querySelector(".admin-login").style.display = "none";
    document.querySelector(".admin-section").style.display = "block";
    loadMessages();
  } else {
    alert("Invalid credentials!");
  }
}

// Load all messages from Firebase
function loadMessages() {
  const box = document.getElementById("messages");
  box.innerHTML = "<p>Loading...</p>";

  firebase.database().ref("messages").on("value", (snapshot) => {
    const data = snapshot.val();
    box.innerHTML = "";
    if (!data) {
      box.innerHTML = "<p>No messages yet.</p>";
      return;
    }
    const keys = Object.keys(data).reverse();
    keys.forEach((key) => {
      const m = data[key];
      box.innerHTML += `
        <div class='message-box'>
          <div class='message-content'>
            <p>${m.text}</p>
            <small>${m.time}</small>
          </div>
          <button class='delete-btn' onclick='deleteMessage("${key}")'>🗑️</button>
        </div>`;
    });
  });
}

// Delete a message
function deleteMessage(id) {
  if (confirm("Delete this message?")) {
    firebase.database().ref("messages/" + id).remove();
  }
}

// Logout
function logout() {
  document.querySelector(".admin-section").style.display = "none";
  document.querySelector(".user-section").style.display = "block";
}
