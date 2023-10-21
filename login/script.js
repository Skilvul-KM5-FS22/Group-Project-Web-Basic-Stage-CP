document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Silakan isi email dan password.");
    } else {
      fetch("https://645611f25f9a4f23613a06ba.mockapi.io/account", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {

          const user = data.find(
            (item) => item.email === email && item.password === password
          );

          if (user) {
            // Simpan status login
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("email", user.email);
            localStorage.setItem("nama", user.nama);
            localStorage.setItem("jenisKelamin", user.jenisKelamin);

            alert("Login berhasil! Anda akan diarahkan ke HomePage.");
            window.location.href = "../index.html";
          } else {
            alert("Login gagal. Periksa email dan password Anda.");
          }
        })
        .catch((error) => {
          alert("Terjadi kesalahan saat mengambil data.");
        });
    }
  });
});
