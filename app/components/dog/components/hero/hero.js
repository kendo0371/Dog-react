const heroNames = ["Sunny Cooper", "Luna Frost", "Max Blizzard", "Koda Snow", "Bella Storm"];

function loadHeroImage() {
  fetch("https://dog.ceo/api/breed/husky/images/random").then(res => res.json()).then((result) => {
      const imageUrl = result.message

      document.getElementById("heroName").textContent = heroNames[Math.floor(Math.random() * heroNames.length)]
      document.getElementById("heroImage").innerHTML = `<img src="${imageUrl}" class="mx-auto rounded-t-4xl md:rounded-4xl md:relative p-6 md:m-auto min-h-100 min-w-150"/>`
  })
}