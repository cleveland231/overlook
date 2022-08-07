import './css/styles.css';
import Customer from '../src/classes/Customer'
import Booking from '../src/classes/Booking'
import Room from '../src/classes/Room'

import { fetchAll } from './api-calls';

// import callCustomers from './api-calls.js'

// const getRandomCustomer = () => {
//     return Math.floor(Math.random() * 9) + 1;
// };


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
let theCustomers
let theBookings
let theRooms
const getFetch = () => {
    fetchAll()
    .then(data => {
        console.log(data)
        theCustomers = data[0].customers
        theBookings = data[1].bookings
        theRooms = data[2].rooms
    })
};


// EVENT LISTENERS
// signOutButton.addEventListener('click', )
// bookingsButton.addEventListener('click', renderBookingLinesOnPage)

window.addEventListener('load', function() {
    getFetch()
    welcomeCustomer(theCustomers)
    // renderBookingsOnPage()
})


// FUNCTIONS
function welcomeCustomer(theCustomers) {
    console.log('customers:', theCustomers)
    welcomeCustomerSpot.innerHTML = `Welcomes ${theCustomers.name}!`
};

// function renderBookingCardsOnPage() {
//     bookingCard.innerHTML = 
//     `<li> NUMBER </li>
//     <li> TYPE </li>
//     <li> BIDET </li>
//     <li> BED SIZE </li>
//     <li> NUMBER OF BEDS </li>
//     <li> COST PER NIGHT </li>`

//     hide(bookingsSpot)
//     show(bookingCard)
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

const setCustomerData = (customerData) => {
    return new Customer(customerData)
};

const setRoomData = (roomData) => {
    return new Room(roomData)
};

const setBookingData = (bookingData) => {
    return new Booking(bookingData)
};
























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