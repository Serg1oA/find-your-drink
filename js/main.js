//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
  // clean the caroussel by deleting all divs
  document.querySelectorAll('div').forEach(div => div.remove())
  // set ingredientChosen to what's in the input
  let ingredientChosen = document.querySelector("input").value
  // API url
  const url = `www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientChosen}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        /* EXAMPLE FOR CREATING AN ELEMENT: 
        for (let i = 0; i < data.photos.length; i++) {
          let newImg = document.createElement("img")
          newImg.src = data.photos[i].img_src
          document.querySelector("span").insertAdjacentElement("afterend", newImg)
        }
        */
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}