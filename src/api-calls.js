
function fetchApiData(url) {
    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status + " " + response.statusText)
        } else {
            return response.json()
        }
    })
}

const fetchAll = (id) => {
return Promise.all([
    fetchApiData(`http://localhost:3001/api/v1/customers/${id}`), 
    fetchApiData('http://localhost:3001/api/v1/bookings'), 
    fetchApiData('http://localhost:3001/api/v1/rooms'),
    ])
};


export { fetchAll };

// export default function callCustomers() {
//     return fetch('http://localhost:3001/api/v1/customers')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.status + " " + response.statusText)
//         } else {
//             return response.json()
//         }
//     })
// }



// export { fetchApiData }

// function fetchApiData(url) {
//     return fetch(url)
//         .then(data => data.json())
// };
// export { fetchApiData }


// export default function callBooking() {
//     return fetch('http://localhost:3001/api/v1/bookings')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.status + " " + response.statusText)
//         } else {
//             return response.json()
//         }
//     })
// }

// export default function callRoom() {
//     return fetch('http://localhost:3001/api/v1/rooms')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.status + " " + response.statusText)
//         } else {
//             return response.json()
//         }
//     })
// }

// function postApiHelper(event) {
//     event.preventDefault()
//     let newIngredientName = inputIngredient.value;
//     const findIngredient = ingredientsData.find(ingredient => ingredient.name === newIngredientName)
//     let newAmount = parseInt(inputAmount.value)
//     let increasedPantry = { userID: ourUser.id, ingredientID: findIngredient.id, ingredientModification: newAmount }
//     postApiData(increasedPantry, newIngredientName)
// }

// function postApiData(increasedPantry, newIngredientName) {
//     fetch('http://localhost:3001/api/v1/users', {
//         method: 'POST', 
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(increasedPantry)
//     }).then(data => data.json()).then(data => {
//         console.log(data)
//         pantry.addIngredients(increasedPantry, newIngredientName)
//         showAllRecipeDetails(parseInt(thisRecipeId))
//     })
//     .catch(error => console.log(error));
// }

// can interpolate /______ (endpoint path)