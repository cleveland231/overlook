import './css/styles.css';
import Customer from '../src/classes/Customer'
import Booking from '../src/classes/Booking'
import Room from '../src/classes/Room'

import { fetchAll } from './api-calls';

// import callCustomers from './api-calls.js'

const getRandomCustomer = () => {
    return Math.floor(Math.random() * theCustomers.length);
};


// QUERY SELECTORS
const bookingsButton = document.querySelector('.view-bookings-button')
const signOutButton = document.querySelector('.sign-out')
const bookRoomButton = document.querySelector('.book-room')
const submitFilterButton = document.querySelector('.submit-filter-button')
const calendarSubmitButton = document.querySelector('.submit-calendar-button')
const calendar = document.querySelector('.calendar')
const spentSpot = document.querySelector('.spent-spot')
const welcomeCustomerSpot = document.querySelector('.welcome-customer')
const bookingsSpot = document.querySelector('.bookings-spot')
const bookingsBarSpot = document.querySelector('.bookings-bar-spot')
const bookingCard = document.querySelector('.booking-card')
const filterDropDown = document.querySelector('.filter-drop-down')
const bookingMessage = document.querySelector('.booking-message')


// GLOBAL VARIABLES
let customerClass;
let currentBooking;
let currentRoom;
let currentCustomer;
let theCustomers;
let theBookings;
let theRooms;
const getFetch = () => {
    fetchAll()
    .then(data => {
        console.log(data)
        theCustomers = data[0].customers
        theBookings = data[1].bookings
        theRooms = data[2].rooms
        currentCustomer = new Customer(theCustomers[getRandomCustomer()])
        // currentBooking = new Booking(theBookings[])
        currentRoom = new Room(theRooms)
        welcomeCustomer()
        // renderBookingCardsOnPage()
    })
};


// EVENT LISTENERS
// signOutButton.addEventListener('click', )
// bookingsButton.addEventListener('click', renderBookingLinesOnPage)

window.addEventListener('load', function() {
    getFetch()
    // welcomeCustomer()
})


// FUNCTIONS
function welcomeCustomer() {
    welcomeCustomerSpot.innerHTML = `${currentCustomer.name}!`
};

// function renderBookingCardsOnPage() {
//     customerClass = new Customer(customerData)
//     const allBookings = customerClass.viewPastAndUpcomingBookings()
//     bookingCard.innerHTML = ''
//     allBookings.forEach((booking) => {
//     bookingCard.innerHTML = 
//     `<li> ROOM NUMBER: ${currentRoom.number} </li>
//     <li> TYPE: ${currentRoom.roomType} </li>
//     <li> BIDET: ${currentRoom.bidet} </li>
//     <li> BED SIZE: ${currentRoom.bedSize} </li>
//     <li> NUMBER OF BEDS: ${currentRoom.numBeds} </li>
//     <li> COST PER NIGHT: ${currentRoom.costPerNight} </li>`
//     })
//     hide(bookingsSpot)
//     show(bookingCard)
// }



// {
//     number: 1,
//     roomType: "residential suite",
//     bidet: true,
//     bedSize: "queen",
//     numBeds: 1,
//     costPerNight: 358.4
//     },

// function showAllRecipes() {
//     recipeRepo = new RecipeRepository(recipes, ingredients)
//     const allRecipes = recipeRepo.createAllRecipes(thisIngredient)
//     recipeCardWrapper.innerHTML = '';
//     allRecipes.forEach((recipe) => {
//         recipeCardWrapper.innerHTML += `
//         <div class="recipe-card">
//         <button class="view-recipe-button" id=${recipe.id} data-recipeId=${recipe.id}> <h2 data-recipeId=${recipe.id}> ${recipe.name} </h2> 
//       <img class='card-image' src=${recipe.image} data-recipeId=${recipe.id} alt=${recipe.name}>
//       </button>
//       </div>`
//     })
//     hide(ingredientCardWrapper)
//     hide(pantryButton)
//     show(recipeCardWrapper)
//     addRecipeEventListeners()
//     cookbookIsActive = false;
// }

// function renderBookingLinesOnPage() {
//     bookingsSpot.innerHTML =

//     hide(bookingCard)
//     hide(calendar)
//     hide(filterDropDown)
//     show(bookingsSpot)
//     show(bookingMessage)
// }

function show(element) {
    element.classList.remove('hidden')
};

function hide(element) {
    element.classList.add('hidden')
};

// const setCustomerData = (customerData) => {
//     console.log('cd', customerData)
//     return new Customer(customerData)
// };

// const setRoomData = (roomData) => {
//     return new Room(roomData)
// };

// const setBookingData = (bookingData) => {
//     return new Booking(bookingData)
// };
























// function callCustomers() {
//     return fetch('http://localhost:3001/api/v1/customers')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(response.status + " " + response.statusText)
//         } else {
//             return response.json()
//         }
//     })
//     .then((data) => {
//         console.log(data)
//         customers = data
//     })
//     .catch((error) => {
//         console.log(error)
//     })
// }

// callCustomers().then((data) => {
//     console.log(data)
//     customers = data
// })
// .catch((error) => {
//     console.log(error)
// })