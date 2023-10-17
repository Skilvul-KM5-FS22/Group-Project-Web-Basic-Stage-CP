var scrollBtn = document.querySelector(".scroll-btn a");

scrollBtn.addEventListener("click", function (event) {
  event.preventDefault();

  var tombolKebawah = document.querySelector(".about-content");

  if (tombolKebawah) {
    window.scrollTo({
      top: tombolKebawah.offsetTop,
      behavior: "smooth",
    });
  }
});
