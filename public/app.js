// React-гүй, энгийн JavaScript (хуучин index.js-тэй адил).

// Dark / light горим солих товч
document.addEventListener("click", (e) => {
  const toggle = e.target.closest("#themeToggle");
  if (!toggle) return;

  const isDark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (e) {}
});

// Дарсан цэсийг идэвхтэй (шар) болгоно
document.addEventListener("click", (e) => {
  const link = e.target.closest(".nav-link");
  if (!link) return;

  document
    .querySelectorAll(".nav-link")
    .forEach((a) => a.removeAttribute("data-active"));
  link.setAttribute("data-active", "");
});
