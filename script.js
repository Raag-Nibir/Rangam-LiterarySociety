// ✅ Initialize EmailJS once the page is loaded
(function() {
  emailjs.init("Hzy3nV2XezGcuOIbH"); // Your actual public key
})();

function sendMessage() {
  const msgBox = document.getElementById("message");
  const msg = msgBox.value.trim();

  if (!msg) {
    alert("Please write something before sending!");
    return;
  }

  // EmailJS Template Parameters
  const templateParams = {
    message: msg,
  };

  // Send the message using EmailJS
  emailjs.send("service_7mt04ch", "template_yekl5fh", templateParams)
    .then(() => {
      alert("✅ Your message has been sent anonymously!");
      msgBox.value = ""; // Clear the textarea
    })
    .catch((error) => {
      console.error("❌ EmailJS Error:", error);
      alert("Failed to send message. Please check console for details.");
    });
}
