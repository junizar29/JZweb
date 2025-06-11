document.addEventListener("DOMContentLoaded", function() {
  const menuicon = document.getElementById("menu-icon");
  const menulist = document.getElementById("menu-list");
  const icon = document.getElementById("icon");

  if (menuicon && menulist) {
    menuicon.addEventListener("click", () => {
      menulist.classList.toggle("hidden");
    });
  }
});