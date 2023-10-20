// Ambil ID buku dari URL
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

// Fungsi untuk mengambil detail buku dari API
async function fetchBookDetails() {
  try {
    const response = await fetch(`https://645611f25f9a4f23613a06ba.mockapi.io/book/${bookId}`);
    const book = await response.json();

    // Tampilkan detail buku di halaman
    const bookDetailsContainer = document.getElementById("card-detail-buku");
    bookDetailsContainer.innerHTML = `
    <div class="card-body">
        <div class="row">
          <div class="col-md-3 col-5">
            <img
              src="${book.img_url}"
              class="card-img-top p-2 rounded-4 mt-2"
              alt="detail-buku"
            />
            <div class="d-flex justify-content-end me-2">
              <a href="#" class="mx-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  class="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.920 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.060.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                  />
                </svg>
              </a>
              <a href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  class="bi bi-bookmark"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div class="col-md-8 col-12">
            <h5 class="fw-semibold mt-md-0 mt-3">${book.title}</h5>
            <p>${book.author}</p>
            <div class="d-flex">
            ${book.star}
            </div>
            <p class="mt-3 fw-medium">Deskripsi Buku :</p>
            <p class="mt-0">${book.description}</p>
            <div class="d-flex">
              <a href="${book.book_url}" target="_blank" class="me-3">
                <button
                  type="button"
                  class="btn text-white rounded-5 px-3 py-2 shadow-sm fw-semibold"
                  id="button-baca"
                >
                  Baca Buku
                </button>
              </a>
              <a href="${book.download_url}" target="_blank">
                <button
                  type="button"
                  class="btn rounded-5 px-3 py-2 shadow-sm fw-semibold"
                  id="button-unduh"
                >
                  Unduh Buku
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Gagal mengambil detail buku:", error);
  }
}

// Fungsi untuk membuat kartu buku
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

// Fungsi untuk mengambil data buku dari API dan menampilkan buku rekomendasi
async function fetchBooksAndDisplayRekomendasi() {
  try {
    const response = await fetch("https://645611f25f9a4f23613a06ba.mockapi.io/book");
    const data = await response.json();

    // Tampilkan "Direkomendasikan untuk Mu" setelah semua buku ditampilkan
    displayDirekomendasikanBooks(data);
  } catch (error) {
    console.error("Gagal mengambil data buku:", error);
  }
}

// Fungsi untuk menampilkan "Direkomendasikan untuk Mu"
function displayDirekomendasikanBooks(data) {
  const direkomendasikanBooksContainer = document.getElementById("direkomendasikan-books");
  direkomendasikanBooksContainer.innerHTML = "";

  // Mengambil 6 buku secara acak dari semua jenis kategori
  const randomDirekomendasikanBooks = getRandomBooks(data, 6);

  randomDirekomendasikanBooks.forEach((book) => {
    const bookCard = createBookCard(book);
    direkomendasikanBooksContainer.appendChild(bookCard);
  });
}

// Fungsi untuk mengambil n buku secara acak dari data
function getRandomBooks(data, n) {
  const shuffledData = [...data];
  for (let i = shuffledData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
  }
  return shuffledData.slice(0, n);
}

if (bookId) {
    fetchBookDetails();
    fetchBooksAndDisplayRekomendasi(); 
} else {
    console.error("ID buku tidak ditemukan.");
}

// Cek status login
document.addEventListener('DOMContentLoaded', function() {

  if (!isUserLoggedIn()) {
    alert('Anda harus login terlebih dahulu.');
      // Pengguna belum login, arahkan ke halaman login
      window.location.href = '../login/index.html'; 
  }

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