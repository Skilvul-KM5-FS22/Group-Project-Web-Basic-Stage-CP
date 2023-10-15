          // Fungsi untuk membuat kartu buku
          function createBookCard(book) {
            const card = document.createElement("div");
            card.className = "col-6";

            const authors = book.author.split(',').map(author => author.trim());
            card.innerHTML = `
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
            return card;
          }
          
          // Fungsi untuk mengambil data buku dari API
          async function fetchBooks() {
            try {
              const response = await fetch("https://645611f25f9a4f23613a06ba.mockapi.io/book");
              const data = await response.json();
          
              // Filter buku berdasarkan kategori
              const terpopulerBooks = data.filter((book) => book.category === "Terpopuler");
              const akademikBooks = data.filter((book) => book.category === "Akademik");
              const lainnyaBooks = data.filter((book) => book.category === "Lainnya");
          
              // Tampilkan buku terpopuler
              const terpopulerBooksContainer = document.getElementById("terpopuler-books");
              terpopulerBooksContainer.innerHTML = "";
              terpopulerBooks.forEach((book) => {
                const bookCard = createBookCard(book);
                terpopulerBooksContainer.appendChild(bookCard);
              });
          
              // Tampilkan buku akademik
              const akademikBooksContainer = document.getElementById("akademik-books");
              akademikBooksContainer.innerHTML = "";
              akademikBooks.forEach((book) => {
                const bookCard = createBookCard(book);
                akademikBooksContainer.appendChild(bookCard);
              });
          
              // Tampilkan buku lainnya
              const lainnyaBooksContainer = document.getElementById("lainnya-books");
              lainnyaBooksContainer.innerHTML = "";
              lainnyaBooks.forEach((book) => {
                const bookCard = createBookCard(book);
                lainnyaBooksContainer.appendChild(bookCard);
              });
          
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
          
          // Panggil fungsi untuk mengambil data buku dari API saat halaman dimuat
          fetchBooks();