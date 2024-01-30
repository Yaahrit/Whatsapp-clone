// Define the avneet function
function avneet() {
  // Your desired functionality goes here
  console.log("avneet function is called");
}

// Your existing JavaScript code
let back = document.querySelector(".back");
let chatBox = document.querySelector(".chatBox");
let open = document.querySelector(".open");

back.onclick = () => {
  chatBox.classList.add("hide");
};

open.onclick = function () {
  chatBox.classList.remove("hide");
};
