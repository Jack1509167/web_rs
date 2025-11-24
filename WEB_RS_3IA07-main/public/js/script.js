const menus = document.querySelector("#menus");
const navMenu = document.querySelector("#nav-menu");
menus.addEventListener("click", () => {
  menus.classList.toggle("menus-active");
  navMenu.classList.remove("opacity-0");
  navMenu.classList.toggle("hidden");
});
window.addEventListener("click", function (e) {
  if (e.target != menus && e.target != navMenu) {
    menus.classList.remove("menus-active");
    navMenu.classList.add("hidden");
    if (!menus.classList.contains("menus-active")) {
      navMenu.classList.add("opacity-0");
    }
  }
});

window.onscroll = () => {
  const header = document.querySelector("header");
  const navTop = document.querySelector("#navTop");

  if (window.pageYOffset > header.offsetTop + 20) {
    header.classList.add("fixed-navbar");
    navTop.classList.add("-translate-y-24");
  } else {
    header.classList.remove("fixed-navbar");
    navTop.classList.remove("-translate-y-24");
  }
};

const copyButtons = document.querySelectorAll("[data-copy-to-clipboard-target]");

copyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // 1. Ambil ID dari input target
    const targetId = button.getAttribute("data-copy-to-clipboard-target");
    const targetInput = document.getElementById(targetId);

    // 2. Ambil elemen pesan di dalam tombol
    const defaultMessage = button.querySelector("#default-message");
    const successMessage = button.querySelector("#success-message");

    if (targetInput) {
      // 3. Salin teks ke clipboard menggunakan Clipboard API
      navigator.clipboard
        .writeText(targetInput.value)
        .then(() => {
          // 4. Tampilkan pesan sukses
          defaultMessage.classList.add("hidden");
          successMessage.classList.remove("hidden");

          // 5. Kembalikan ke pesan "Copy" setelah 2 detik
          setTimeout(() => {
            defaultMessage.classList.remove("hidden");
            successMessage.classList.add("hidden");
          }, 2000);
        })
        .catch((err) => {
          console.error("Gagal menyalin teks: ", err);
        });
    }
  });
});
