// 8 санамсаргүй нохойн зургийг gallery-д нэмэх. "Show More Pups" дарах бүрт дахин 8-ыг нэмнэ.
function loadGalleryImages() {
  fetch("https://dog.ceo/api/breeds/image/random/8").then(res => res.json()).then((result) => {
      const grid = document.getElementById("galleryGrid")

      result.message.forEach((imageUrl) => {
          // https://images.dog.ceo/breeds/terrier-wheaten/xxx.jpg -> "terrier wheaten"
          const breedName = imageUrl.split("/")[4].replace("-", " ")

          grid.insertAdjacentHTML("beforeend", `
            <div class="relative">
              <img src="${imageUrl}" class="w-full aspect-square object-cover rounded-2xl"/>
              <span class="absolute left-2 bottom-2 bg-[#00000059] text-white text-xs px-2 py-1 rounded-full capitalize">${breedName}</span>
            </div>`)
      })
  })
}
