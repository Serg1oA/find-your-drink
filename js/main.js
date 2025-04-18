document.querySelector('button').addEventListener('click', getFetch)

// function to clean the gallery by deleting all divs
function deleteDivs() {
  document.querySelectorAll('div').forEach(div => div.remove())
}

function getFetch() {
  // clean the gallery
  deleteDivs()
  // set ingredientChosen to what's in the input
  let ingredientChosen = document.querySelector("input").value
  // API url
  const drinksByIngredientURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientChosen}`

  fetch(drinksByIngredientURL)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        
        // if no drinks are found
        if (data.drinks === "no data found") {
          document.querySelector("#possibleDrinks").innerText = "0 drinks found, try again!"
          return
        } else {
          document.querySelector("#possibleDrinks").innerText = "Possible drinks with this ingredient:"
        }

        // for each drink found
        for (let i = 0; i < data.drinks.length; i++) {

          // create a new div to later add as the last child of the section drinkCards
          let newCard = document.createElement("div")
          
          // add the drink title
          let newTitle = document.createElement("p")
          newTitle.innerText = data.drinks[i].strDrink
          newCard.insertAdjacentElement("beforeend", newTitle)
          
          // add the drink image
          let newImg = document.createElement("img")
          newImg.src = data.drinks[i].strDrinkThumb
          newCard.insertAdjacentElement("beforeend", newImg)

          let currentDrinkID = data.drinks[i].idDrink
          // now 
          const drinkURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${currentDrinkID}`

          fetch(drinkURL)
              .then(res => res.json()) // parse response as JSON
              .then(data => {
                console.log(data)
                
                // add the drink instructions
                let drinkInstruction = document.createElement("p")
                drinkInstruction.innerText = data.drinks[0].strInstructions
                newCard.insertAdjacentElement("beforeend", drinkInstruction)
        
                }
              )
              .catch(err => {
                  console.log("something went wrong with the drink ID")
                  console.log(`error ${err}`)
              });
          
          // at the end, add the card to the section drinkCards
          document.querySelector("#drinkCards").insertAdjacentElement("beforeend", newCard)         
        }

      })
      .catch(err => {
          // if the ingredient typed is invalid
          deleteDivs()
          document.querySelector("#possibleDrinks").innerText = "0 drinks found, try again!"
          console.log(`error ${err}`)
      });
}