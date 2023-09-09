(function init() {
  const url = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-item .nav-link");
  navLinks.forEach((link) => {
    console.log(link);
    if (link.getAttribute("href") === url) {
      const navbarItem = link.closest(".nav-item");
      if (navbarItem) {
        navbarItem.classList.add("active");
      }
    }
  });
})();

function preload() {
  $(".preloader").fadeOut();
}
