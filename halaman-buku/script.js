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
          const bookCard = createBookCard(book);
          booksContainer.appendChild(bookCard);
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Fungsi untuk membuat elemen buku
function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "col-6";

  const authors = book.author.split(",").map((author) => author.trim());

  // Tambahkan event listener untuk mengarahkan ke halaman detail buku
  card.addEventListener("click", function () {
    // Redirect ke halaman detail dengan mengirimkan ID buku sebagai parameter
    window.location.href = `detail-buku.html?id=${book.id}`;
  });

  card.innerHTML = `
                <a href="detail-buku.html?id=${book.id}" target="_blank" class="text-decoration-none">
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
  return card;
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

// Login
function isUserLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Function to update the navigation elements based on login status
function updateNavigation() {
  const loginButton = document.getElementById('login');
  const registerButton = document.getElementById('register');
  const profilDropdown = document.getElementById('profil-dropdown');
  const logoutButton = document.getElementById('logout-button');

  if (isUserLoggedIn()) {
      // Pengguna telah login, tampilkan dropdown profil dan tombol logout
      loginButton.style.display = 'none';
      registerButton.style.display = 'none';
      profilDropdown.style.display = 'block';
      // Mengganti nama dengan data dari localStorage
      const nama = localStorage.getItem('nama');
      const namaElement = document.getElementById('user-name');
      if (nama) {
          namaElement.textContent = nama;
      }
      // Menentukan avatar berdasarkan jenis kelamin
      const jenisKelamin = localStorage.getItem('jenisKelamin');
      const avatarElement = document.getElementById('user-avatar');
      if (jenisKelamin === 'laki-laki') {
          avatarElement.src = '../assets/men.svg'; // Avatar pria
      } else {
          avatarElement.src = '../assets/women.svg'; // Avatar wanita
      }
  } else {
      // Pengguna belum login, tampilkan tombol login
      loginButton.style.display = 'block';
      registerButton.style.display = 'block';
      profilDropdown.style.display = 'none';
  }
}

// Add event listener for logout button
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', function() {
  // Lakukan tindakan logout, seperti mengubah status login dalam localStorage
  localStorage.setItem('isLoggedIn', 'false');

  localStorage.removeItem('nama');
  localStorage.removeItem('email');
  localStorage.removeItem('jenisKelamin');
  // Perbarui tampilan navigasi
  updateNavigation();
});

// Call the function to update navigation on page load
updateNavigation();
