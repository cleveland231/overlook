import './css/styles.css';
import Customer from '../src/classes/Customer'
import Booking from '../src/classes/Booking'
import Room from '../src/classes/Room'
import Hotel from '../src/classes/Hotel'

import { fetchAll } from './api-calls';

// import callCustomers from './api-calls.js'

const getRandomCustomer = () => {
    return Math.floor(Math.random() * theCustomers.length);
};

// QUERY SELECTORS
const bookARoomButton = document.querySelector('.book-a-room-button')
const signOutButton = document.querySelector('.sign-out')
const bookRoomButton = document.querySelector('.book-room')
const submitFilterButton = document.querySelector('.submit-filter-button')
const calendarSubmitButton = document.querySelector('.submit-calendar-button')
const calendarValue = document.querySelector('.calendar-value')
const spentSpot = document.querySelector('.spent-spot')
const welcomeCustomerSpot = document.querySelector('.welcome-customer')
const bookingsSpot = document.querySelector('.bookings-spot')
const bookingsBarSpot = document.querySelector('.bookings-bar-spot')
const bookingCard = document.querySelector('.booking-card')
const filterDropDown = document.querySelector('.filter-drop-down')
const bookingMessage = document.querySelector('.booking-message')
const bookARoomSection = document.querySelector('.book-a-room-section')
const yourBookingsButton = document.querySelector('.your-bookings-button')
const bookingARoomSection = document.querySelector('#booking-a-room-section')
const roomType = document.querySelectorAll('.roomType')




// GLOBAL VARIABLES
// let customerClass;
let allBookings = [];
let allRooms = [];
let currentRoom;
let currentCustomer;
let theCustomers;
let theBookings;
let theRooms;
let hotel;
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
        console.log('hotel: ', hotel)

        welcomeCustomer()
        // renderBookingCardsOnPage()
        renderBookingLinesOnPage()
    })
};


// EVENT LISTENERS
// signOutButton.addEventListener('click', )
bookARoomButton.addEventListener('click', renderBookingCardsOnPage)
calendarSubmitButton.addEventListener('click', showAvailableBookingsFromCalendar)
yourBookingsButton.addEventListener('click', renderBookingLinesOnPage)
submitFilterButton.addEventListener('click', showRoomTypesFromFilter)

window.addEventListener('load', function() {
    getFetch()
    // hide(yourBookingsButton)
    // welcomeCustomer()
})


// FUNCTIONS
function welcomeCustomer() {
    welcomeCustomerSpot.innerHTML = `${currentCustomer.name}! You have spent: ${currentCustomer.totalSpent}`
};



function showAvailableBookingsFromCalendar() {
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
}

function showRoomTypesFromFilter(event) {
    event.preventDefault()
    console.log('hello')
    bookARoomSection.innerHTML = ''
    let formattedDate = calendarValue.value.split('-').join('/')
    let dropDownValue = roomType.value
    let theFilteredRoomTypes = hotel.filterRoomTypes(formattedDate, dropDownValue)

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

function renderBookingCardsOnPage() {
    // bookARoomSection.innerHTML = ''
    // currentCustomer.bookings.forEach((booking) => {
    //     currentRoom = allRooms.find((room) => {
    //        return booking.roomNumber === room.number
    //     })
    // bookARoomSection.innerHTML += 
    // `<div class="booking-card">
    // <li> ROOM NUMBER: ${currentRoom.number} </li>
    // <li> TYPE: ${currentRoom.roomType} </li>
    // <li> BIDET: ${currentRoom.bidet} </li>
    // <li> BED SIZE: ${currentRoom.bedSize} </li>
    // <li> NUMBER OF BEDS: ${currentRoom.numBeds} </li>
    // <li> COST: ${currentRoom.costPerNight} </li>
    // <button class="book-room"> BOOK ROOM </button>
    // </div>`
    // })
    hide(bookingMessage)
    hide(bookingsSpot)
    show(bookingARoomSection)
    show(yourBookingsButton)
    show(bookARoomSection)
}





function renderBookingLinesOnPage() {
    bookingsSpot.innerHTML = ''
    currentCustomer.bookings.forEach((booking) => {
        currentRoom = allRooms.find((room) => {
           return booking.roomNumber === room.number
        })
    bookingsSpot.innerHTML += 
    `<div class="bookings-spot"> 
    <h3> ROOM: ${currentRoom.number} DATE: HERE COST:${currentRoom.costPerNight}</h3>
    </div>`
    })
    hide(bookingARoomSection)
    hide(bookingCard)
    // show(bookingsSpot)
    // show(bookingMessage)
}


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