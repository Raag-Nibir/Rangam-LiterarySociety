function sendMessage() {
  const msg = document.getElementById("message").value.trim();
  if (msg === "") {
    alert("Please write something before sending!");
    return;
  }
  let messages = JSON.parse(localStorage.getItem("anonMessages")) || [];
  messages.push({ text: msg, time: new Date().toLocaleString() });
  localStorage.setItem("anonMessages", JSON.stringify(messages));
  document.getElementById("message").value = "";
  alert("Your message has been sent anonymously!");
}

function showAdminLogin() {
  document.querySelector(".user-section").style.display = "none";
  document.querySelector(".admin-login").style.display = "block";
}

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

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem("anonMessages")) || [];
  const box = document.getElementById("messages");
  box.innerHTML = "";
  if (messages.length === 0) {
    box.innerHTML = "<p>No messages yet.</p>";
  } else {
    messages
      .slice()
      .reverse()
      .forEach((m, index) => {
        const id = messages.length - 1 - index;
        box.innerHTML += `
        <div class='message-box'>
          <div class='message-content'>
            <p>${m.text}</p>
            <small>${m.time}</small>
          </div>
          <button class='delete-btn' onclick='deleteMessage(${id})'>🗑️</button>
        </div>`;
      });
  }
}

function deleteMessage(index) {
  let messages = JSON.parse(localStorage.getItem("anonMessages")) || [];
  if (confirm("Delete this message?")) {
    messages.splice(index, 1);
    localStorage.setItem("anonMessages", JSON.stringify(messages));
    loadMessages();
  }
}

function logout() {
  document.querySelector(".admin-section").style.display = "none";
  document.querySelector(".user-section").style.display = "block";
}
