document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("register-form");
  const errorMessage = document.getElementById("error-message");
  const submitButton = document.getElementById("submit-button");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    errorMessage.textContent = "";

    const nama = document.getElementById("nama").value;
    const jenisKelamin = document.getElementById("jenis-kelamin").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const profilePicture = "";

    if (!nama || !jenisKelamin || !email || !password || !confirmPassword) {
      errorMessage.textContent = "Semua field harus diisi.";
    } else if (password !== confirmPassword) {
      errorMessage.textContent = "Password dan Confirm Password harus sama.";
    } else {
      const formData = {
        profilePicture: profilePicture,
        nama: nama,
        jenisKelamin: jenisKelamin,
        email: email,
        password: password,
      };

      fetch("https://645611f25f9a4f23613a06ba.mockapi.io/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(
            "Pendaftaran berhasil! Anda akan diarahkan ke halaman login dalam 2 detik."
          );

          // Arahkan pengguna ke halaman login setelah 2 detik
          setTimeout(function () {
            window.location.href = "../login/index.html";
          }, 2000);
        })
        .catch((error) => {
          errorMessage.textContent = "Terjadi kesalahan saat mengirim data.";
        });
    }
  });
});
