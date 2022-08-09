import './css/styles.css';
import Customer from '../src/classes/Customer'
import Booking from '../src/classes/Booking'
import Room from '../src/classes/Room'
import Hotel from '../src/classes/Hotel'

import { fetchAll } from './api-calls';

const getRandomCustomer = () => {
    return Math.floor(Math.random() * theCustomers.length);
};

// QUERY SELECTORS
const bookARoomButton = document.querySelector('.book-a-room-button')
const signOutButton = document.querySelector('.sign-out')
let bookRoomButton = document.querySelector('.book-room')
const submitFilterButton = document.querySelector('.submit-filter-button')
const calendarSubmitButton = document.querySelector('.submit-calendar-button')
const calendarValue = document.querySelector('.calendar-value')
const welcomeCustomerSpot = document.querySelector('.welcome-customer')
const bookingsSpot = document.querySelector('.bookings-spot')
const bookingCard = document.querySelector('.booking-card')
const filterDropDown = document.querySelector('.filter-drop-down')
const bookingMessage = document.querySelector('.booking-message')
const bookARoomSection = document.querySelector('.book-a-room-section')
const yourBookingsButton = document.querySelector('.your-bookings-button')
const bookingARoomSection = document.querySelector('#booking-a-room-section')
const roomType = document.querySelector('.room-type')
const bookARoomBar = document.querySelector('.book-a-room-bar')
const selectDropDown = document.querySelector('.selectDropDown')


// GLOBAL VARIABLES
let allBookings = [];
let allRooms = [];
let currentRoom;
let currentCustomer;
let theCustomers;
let theBookings;
let theRooms;
let hotel;
let justBookedRoom;
const getFetch = () => {
    fetchAll()
    .then(data => {
        console.log(data)
        theCustomers = data[0].customers
        theBookings = data[1].bookings
        theRooms = data[2].rooms
        currentCustomer = new Customer(theCustomers[0], theBookings)
        currentCustomer.viewPastAndUpcomingBookings()     
        theBookings.forEach((booking) => {
            allBookings.push(new Booking(booking))
        })
        theRooms.forEach((room) => {
            allRooms.push(new Room(room))
        })
        hotel = new Hotel(currentCustomer, allBookings, allRooms)
        welcomeCustomer()
        renderBookingLinesOnPage()
        hide(bookARoomBar)
    })
};


// EVENT LISTENERS
// signOutButton.addEventListener('click', )
bookARoomButton.addEventListener('click', showBookingPage)
calendarSubmitButton.addEventListener('click', showAvailableBookingsFromCalendar)
yourBookingsButton.addEventListener('click', showYourBookingPage)
submitFilterButton.addEventListener('click', showRoomTypesFromFilter)

window.addEventListener('load', function() {
    getFetch()
    hide(bookARoomBar)
    hide(yourBookingsButton)
    // renderBookingLinesOnPage()
    // hide(bookARoomBar)
    // hide(yourBookingsButton)
})


// FUNCTIONS
function welcomeCustomer() {
    currentCustomer.returnTotalSpent(allRooms)
    welcomeCustomerSpot.innerHTML = `Howdy ${currentCustomer.name}! You have spent: ${currentCustomer.totalSpent.toFixed(2)}`
};


function showAvailableBookingsFromCalendar() {
    bookingMessage.innerText = `AVAILABLE ROOMS`
    bookARoomSection.innerHTML = ''
    let formattedDate = calendarValue.value.split('-').join('/')
    let theAvailableRooms = hotel.selectDateToBook(formattedDate)

    theAvailableRooms.forEach((room) => {
        bookARoomSection.innerHTML += 
    `<div class="booking-card">
    <li> ROOM NUMBER: ${room.number} </li>
    <li> TYPE: ${room.roomType} </li>
    <li> BIDET: ${room.bidet} </li>
    <li> BED SIZE: ${room.bedSize} </li>
    <li> NUMBER OF BEDS: ${room.numBeds} </li>
    <li> COST: ${room.costPerNight} </li>
    <button class="book-room"> BOOK ROOM </button>
    </div>`
    })
    // checkIfRoomsAreAvailableCop()
    // bookRoomButton = document.querySelector('.book-room')
    // bookRoomButton.addEventListener('click', postApiHelper)
    show(bookingMessage)
}

function showRoomTypesFromFilter(event) {
    console.log('hello')
    event.preventDefault()
    bookingMessage.innerText = `FILTERED RESULTS`
    bookARoomSection.innerHTML = ''
    let formattedDate = calendarValue.value.split('-').join('/')
    let dropDownValue = selectDropDown.value
    console.log('dropDownValue: ', dropDownValue)
    let theFilteredRoomTypes = hotel.filterRoomTypes(formattedDate, dropDownValue)
    console.log('thefrt:', theFilteredRoomTypes)
    if (!theFilteredRoomTypes.length) {
        bookARoomSection.innerHTML = `<div> NO ROOMS AVAILABLE, PLEASE SEARCH AGAIN </div>`
    } else {
    theFilteredRoomTypes.forEach((room) => {
        bookARoomSection.innerHTML += 
    `<div class="booking-card">
    <li> ROOM NUMBER: ${room.number} </li>
    <li> TYPE: ${room.roomType} </li>
    <li> BIDET: ${room.bidet} </li>
    <li> BED SIZE: ${room.bedSize} </li>
    <li> NUMBER OF BEDS: ${room.numBeds} </li>
    <li> COST: ${room.costPerNight} </li>
    <button class="book-room"> BOOK ROOM </button>
    </div>`
    })
}
    // checkIfRoomsAreAvailableCop()
    // bookRoomButton = document.querySelector('.book-room')
    // bookRoomButton.addEventListener('click', postApiHelper)
}


function showBookingPage() {
    console.log('hi from showbookingpage')
    show(bookARoomBar)
    show(bookARoomSection)
    show(yourBookingsButton)
    hide(bookARoomButton)
    hide(bookingsSpot)
    hide(bookingMessage)
}


function showYourBookingPage() {
    console.log('hello from showYourBookingPage')
    // hide(yourBookingsButton)
    // hide(bookARoomSection)
    // show(bookARoomButton)
    hide(bookARoomSection)
    hide(bookARoomBar)
    hide(yourBookingsButton)
    show(bookARoomButton)
    show(bookingsSpot)
    show(bookingMessage)
    bookingMessage.innerText = `YOUR BOOKINGS`
}


function renderBookingLinesOnPage() {
    bookingsSpot.innerHTML = ''
    currentCustomer.bookings.forEach((booking) => {
        currentRoom = allRooms.find((room) => {
           return booking.roomNumber === room.number
        })
    bookingsSpot.innerHTML += 
    `<div class="bookings-spot"> 
    <h2> ROOM: ${currentRoom.number} - ROOMTYPE: ${currentRoom.roomType} - BIDET: ${currentRoom.bidet} - BEDSIZE: ${currentRoom.bedSize} - COST: ${currentRoom.costPerNight}</h2>
    </div>`
    })
}


/*
function logIn() {
new view for hiding everything(page wrapper)
have login page from user name and password (inputs)

username - check id
potential: split

password - 

conditional if username and password are correct show page, hide login page
if wrong innerText = wrong password/username




}
*/


// function postApiHelper(event) {
//     event.preventDefault()
//     let newIngredientName = inputIngredient.value;
//     const findIngredient = ingredientsData.find(ingredient => ingredient.name === newIngredientName)
//     let newAmount = parseInt(inputAmount.value)
//     justBookedRoom = { userID: 48, date: 2019/09/23, roomNumber: 4 }
//     postApiData(increasedPantry, newIngredientName)
// }

// function postApiData(increasedPantry, newIngredientName) {
//     fetch('http://localhost:3001/api/v1/bookings', {
//         method: 'POST', 
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(justBookedRoom)
//     }).then(data => data.json()).then(data => {
//         console.log(data)
//         // pantry.addIngredients(increasedPantry, newIngredientName)
//         // showAllRecipeDetails(parseInt(thisRecipeId))
//     })
//     .catch(error => console.log(error));
// }

// function checkIfRoomsAreAvailableCop() {
//     if (there are no rooms available) {then  welcomeCustomerSpot.innerHTML = `SORRY NO ROOMS HERE< ADJUST YOUR SEARCH PLEASE`} else {
//     welcomeCustomerSpot.innerHTML = `Hi ${currentCustomer.name}! You have spent: ${currentCustomer.totalSpent}`
//     }
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




// function renderBookingCardsOnPage() {
//     bookARoomSection.innerHTML = ''
//     currentCustomer.bookings.forEach((booking) => {
//         currentRoom = allRooms.find((room) => {
//            return booking.roomNumber === room.number
//         })
//     bookARoomSection.innerHTML += 
//     `<div class="booking-card">
//     <li> ROOM NUMBER: ${currentRoom.number} </li>
//     <li> TYPE: ${currentRoom.roomType} </li>
//     <li> BIDET: ${currentRoom.bidet} </li>
//     <li> BED SIZE: ${currentRoom.bedSize} </li>
//     <li> NUMBER OF BEDS: ${currentRoom.numBeds} </li>
//     <li> COST: ${currentRoom.costPerNight} </li>
//     <button class="book-room"> BOOK ROOM </button>
//     </div>`
//     })
//     hide(bookingsSpot)
//     show(bookARoomSection)
// }



















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