let allBreeds = [];

function loadExploreImage() {
  fetch("https://dog.ceo/api/breed/Labradoodle/images/random").then(res => res.json()).then((result) => {
      const imageUrl = result.message

      document.getElementById("exploreImage").innerHTML = `<img src="${imageUrl}" class="w-full min-h-64 max-h-87 md:rounded-4xl md:p-4"/>`
  })
}
function loadExploreImage2() {
  fetch("https://dog.ceo/api/breed/Malamute/images/random").then(res => res.json()).then((result) => {
      const imageUrl = result.message

      document.getElementById("exploreImage2").innerHTML = `<img src="${imageUrl}" class="w-full min-h-64 max-h-87 md:rounded-4xl md:p-4"/>`
  })
}
function loadExploreImage3() {
  fetch("https://dog.ceo/api/breed/husky/images/random").then(res => res.json()).then((result) => {
      const imageUrl = result.message

      document.getElementById("exploreImage3").innerHTML = `<img src="${imageUrl}" class="w-full min-h-64 max-h-87 md:rounded-4xl md:p-4"/>`
  })
}
// function loadExploreImage3() {
//   fetch("https://dog.ceo/api/breed/Shiba/images/random").then(res => res.json()).then((result) => {
//       const imageUrl = result.message

//       document.getElementById("exploreImage3").innerHTML = `<img src="${imageUrl}" class="w-full min-h-64 max-h-87 md:rounded-4xl md:p-4"/>`
//   })
// }
// function loadExploreImage3() {
//   fetch("https://dog.ceo/api/breed/Tervuren/images/random").then(res => res.json()).then((result) => {
//       const imageUrl = result.message

//       document.getElementById("exploreImage3").innerHTML = `<img src="${imageUrl}" class="w-full min-h-64 max-h-87 md:rounded-4xl md:p-4"/>`
//   })
// }

const exploreImageIds = ["exploreImage", "exploreImage2", "exploreImage3"]
const exploreLabelIds = ["exploreLabel", "exploreLabel2", "exploreLabel3"]

function showBreed(breed) {
  document.getElementById("breedSelect").value = breed

  document.querySelectorAll(".quick-pick").forEach((btn) => {
    if (btn.dataset.breed === breed) btn.setAttribute("data-active", "")
    else btn.removeAttribute("data-active")
  })

  if (breed === "all") {
    loadExploreImage()
    loadExploreImage2()
    loadExploreImage3()
    const defaultLabels = ["Labradoodle", "Malamute", "Husky"]
    exploreLabelIds.forEach((id, i) => {
      document.getElementById(id).textContent = defaultLabels[i]
    })
    return
  }

  const select = document.getElementById("breedSelect")
  let breedName = breed
  if (select.selectedIndex !== -1){
    breedName = select.options[select.selectedIndex].textContent.trim()
  }

  fetch(`https://dog.ceo/api/breed/${breed}/images/random/3`).then(res => res.json()).then((result) => {
      result.message.forEach((imageUrl, i) => {
          document.getElementById(exploreImageIds[i]).innerHTML = `<img src="${imageUrl}" class="w-full min-h-64 max-h-87 md:rounded-4xl md:p-4"/>`
          document.getElementById(exploreLabelIds[i]).textContent = breedName
      })
  })
}

function showSelectedBreed() {
  showBreed(document.getElementById("breedSelect").value)
}

function loadAllBreeds(){
  fetch("https://dog.ceo/api/breeds/list/all").then(res => res.json()).then((result) => {
    allBreeds = Object.keys(result.message)
  })
}
