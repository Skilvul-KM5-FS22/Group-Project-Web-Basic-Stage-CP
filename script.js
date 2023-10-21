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
          avatarElement.src = './assets/men.svg'; // Avatar pria
      } else {
          avatarElement.src = './assets/women.svg'; // Avatar wanita
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