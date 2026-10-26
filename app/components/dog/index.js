
function loadComponent(id, path) {
    return fetch(path)
        .then((res) => res.text())
        .then((text) => {
        const doc = new DOMParser().parseFromString(text, "text/html");
        document.getElementById(id).innerHTML = doc.body.innerHTML;
    });
}

loadComponent("header", "/components/header/header.html").then(() =>
    updateThemeIcon(),);
loadComponent("hero", "/components/hero/hero.html").then(() =>
    loadHeroImage(),);
loadComponent("explore", "/components/explore/explore.html").then(() => {
    updateAllBreedsText();
    loadExploreImage();
    loadExploreImage2();
    loadExploreImage3();
    loadAllBreeds();
});

const mdQuery = window.matchMedia("(min-width: 768px)");
function updateAllBreedsText() {
    const option = document.getElementById("allBreedsOption");
    if (!option) return;
    option.textContent = mdQuery.matches
        ? "ALL Breeds"
        : "ALL Breeds (Selected)";
}

mdQuery.addEventListener("change", updateAllBreedsText);
loadComponent("gallery", "/components/gallery/gallery.html").then(() =>
    loadGalleryImages(),);
loadComponent("footer", "/components/footer.html");

document.addEventListener("click", (e) => {
    const link = e.target.closest(".nav-link");
    if (!link) return;
    document
        .querySelectorAll(".nav-link")
        .forEach((a) => a.removeAttribute("data-active"));
    link.setAttribute("data-active", "");
});

try {
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
    }
} catch (e) {}

function updateThemeIcon() {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;
    toggle.textContent = document.documentElement.classList.contains("dark")
        ? "☾"
        : "☼";
}

document.addEventListener("click", (e) => {
    const toggle = e.target.closest("#themeToggle");
    if (!toggle) return;
    const isDark = document.documentElement.classList.toggle("dark");
    updateThemeIcon();
    try {
        localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {}
});

document.addEventListener("click", (e) => {
    const search = e.target.closest("#search");
    if (!search) return;
    const searchBox = document.getElementById("searchBox");
    searchBox.classList.toggle("hidden");
    if (!searchBox.classList.contains("hidden")){
        document.getElementById("searchInput").focus();
    }
})

document.addEventListener("input", (e) => {
    if(e.target.id !== "searchInput") return;
    const text = e.target.value.toLowerCase().trim();
    const searchResults = document.getElementById("searchResults");

    if (text=== ""){
        searchResults.innerHTML = "";
        return;
    }

    const matches = allBreeds.filter((breed) => breed.includes(text)).slice(0, 8);

    if (matches.length === 0){
        searchResults.innerHTML = `<span class="text-[#554336] dark:text-[#D8C2B0] text-sm">No breeds found</span>`;
        return;
    }

    searchResults.innerHTML = matches.map((breed) => `<button class="bg-white dark:bg-[#252825] px-4 py-2
    rounded-full cursor-pointer capitalize" onClick="pickSearchResult('${breed}')">${breed}</button>`).join("");
})

function pickSearchResult(breed){
    showBreed(breed);
    document.getElementById("searchBox").classList.add("hidden");
    document.getElementById("searchInput").value = "";
    document.getElementById("searchResults").innerHTML = "";
    document.getElementById("breeds").scrollIntoView();
}