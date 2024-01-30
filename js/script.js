// Define the avneet function
function avneet() {
  // Your desired functionality goes here
  console.log("avneet function is called");

  // Toggle the visibility of the chat box
  toggleChatBoxVisibility();
}

// Your existing JavaScript code
document.addEventListener("DOMContentLoaded", function () {
  let back = document.querySelector(".back");

  back.addEventListener("click", function () {
    // Toggle the visibility of the chat box
    toggleChatBoxVisibility();
  });
});

// Function to toggle the visibility of the chat box
function toggleChatBoxVisibility() {
  let chatBox = document.querySelector(".chatBox");
  chatBox.classList.toggle("hide");
  // Additional logic can be added here for any specific functionality when toggling
}
