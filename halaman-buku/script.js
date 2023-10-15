// Event listener untuk opsi dropdown
const filterOptions = document.querySelectorAll(".dropdown-item");
const filterButton = document.getElementById("filter-button");
const searchInput = document.getElementById("search-input");
const tombolPencarian = document.getElementById("search-button");
const hasilPencarian = document.getElementById("hasil-pencarian");
const direkomendasikanBooks = document.getElementById("direkomendasi");
const terpopulerBooks = document.getElementById("terpopuler");
const akademikBooks = document.getElementById("akademik");
const lainnyaBooks = document.getElementById("lainnya");

// Event listener untuk opsi dropdown
filterOptions.forEach((option) => {
  option.addEventListener("click", function () {
    const selectedFilter = option.getAttribute("data-filter");
    filterButton.innerText = selectedFilter; // Mengubah teks tombol dropdown
    // Setelah filter berubah, panggil fungsi pencarian kembali
    searchBooks();

    // Sembunyikan semua kategori
    direkomendasikanBooks.style.display = "none";
    terpopulerBooks.style.display = "none";
    akademikBooks.style.display = "none";
    lainnyaBooks.style.display = "none";

    if (selectedFilter === "search") {
      hasilPencarian.style.display = "block";
    } else if (selectedFilter === "direkomendasi") {
      direkomendasikanBooks.style.display = "block";
    } else if (selectedFilter === "terpopuler") {
      terpopulerBooks.style.display = "block";
    } else if (selectedFilter === "akademik") {
      akadmikBooks.style.display = "block";
    } else if (selectedFilter === "lainnya") {
      lainnyaBooks.style.display = "block";
    }
  });
});

// Fungsi untuk mengambil data dari API dan menampilkan buku sesuai filter pencarian
function searchBooks() {
  const filterText = filterButton.innerText.toLowerCase();
  const searchText = searchInput.value.toLowerCase();
  const apiUrl = "https://645611f25f9a4f23613a06ba.mockapi.io/book";

  // Hapus semua buku yang ditampilkan sebelumnya
  const booksContainer = document.getElementById("books-container");
  booksContainer.innerHTML = "";

  // Kirim permintaan ke API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((book) => {
        const title = book.title.toLowerCase();
        const author = book.author.toLowerCase();
        const shouldDisplay =
          (filterText === "all" || filterText === "title" && title.includes(searchText) || filterText === "author" && author.includes(searchText));

        if (shouldDisplay) {
          // Tampilkan buku yang sesuai
          const bookElement = createBookElement(book);
          booksContainer.appendChild(bookElement);
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Fungsi untuk membuat elemen buku
function createBookElement(book) {
  const bookElement = document.createElement("div");
  bookElement.className = "col-6";

  const authors = book.author.split(',').map(author => author.trim());
  bookElement.innerHTML = `
    <a href="detail-buku.html" target="_blank" class="text-decoration-none">
      <div class="list-buku card h-100 rounded-3" id="warna-card">
        <img src="${book.img_url}" class="card-img-top p-2 rounded-4" alt="...">
        <div class="card-body">
          <h6 class="card-title">${book.title}</h6>
          <p id="font-card-detail" class="opacity-50 mb-1">${authors[0]}</p>
          <div class="d-flex align-items-baseline" id="font-card-detail">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" class="bi bi-star-fill" viewBox="0 0 16 16">
              <defs>
                <linearGradient id="star-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color: #fffdee;" />
                  <stop offset="100%" style="stop-color: #ffee02;" />
                </linearGradient>
              </defs>
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256" fill="url(#star-gradient)" />
            </svg>
            <span class="ms-1">${book.rating}<span/>
          </div>
        </div>
      </div>
    </a>
  `;
  return bookElement;
}

// Event listener untuk input pencarian
searchInput.addEventListener("input", function () {
  searchBooks();
});

// Event listener awal untuk memuat semua buku saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  searchBooks();
});

tombolPencarian.addEventListener("click", function() {
  hasilPencarian.style.display = "block"; // Mengubah display menjadi "block" untuk menampilkan elemen
});
