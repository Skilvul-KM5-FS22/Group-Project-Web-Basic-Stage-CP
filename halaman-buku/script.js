document.getElementById("bookCarousel").addEventListener("swipe", (event) => {
    if (event.deltaX > 0) {
      document.getElementById("bookCarousel").carousel("next");
    } else {
      document.getElementById("bookCarousel").carousel("prev");
    }
  });