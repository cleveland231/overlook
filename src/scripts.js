import './css/styles.css';
import Customer from '../src/classes/Customer'
import Booking from '../src/classes/Booking'
import Room from '../src/classes/Room'
import Hotel from '../src/classes/Hotel'
import { fetchAll } from './api-calls';


// QUERY SELECTORS
const bookARoomButton = document.querySelector('.book-a-room-button')
let bookRoomButtons = document.querySelector('.book-room')
const submitFilterButton = document.querySelector('.submit-filter-button')
const calendarSubmitButton = document.querySelector('.submit-calendar-button')
const calendarValue = document.querySelector('.calendar-value')
const welcomeCustomerSpot = document.querySelector('.welcome-customer')
const bookingsSpot = document.querySelector('.bookings-spot')
let bookingCard = document.querySelector('.booking-card')
const filterDropDown = document.querySelector('.filter-drop-down')
const bookingMessage = document.querySelector('.booking-message')
const bookARoomSection = document.querySelector('.book-a-room-section')
const yourBookingsButton = document.querySelector('.your-bookings-button')
const bookingARoomSection = document.querySelector('#booking-a-room-section')
const roomType = document.querySelector('.room-type')
const bookARoomBar = document.querySelector('.book-a-room-bar')
const selectDropDown = document.querySelector('.selectDropDown')
const loginButton = document.querySelector('.login-button')
const loginPage = document.querySelector('.login-page')
const userName = document.querySelector('#userName')
const passWord = document.querySelector('#passWord')
const innerPage = document.querySelector('.inner-page')
const outerPage = document.querySelector('.outer-page')
const outerBanner = document.querySelector('.outer-banner')


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
const getFetch = (id) => {
    fetchAll(id)
    .then(data => {
        console.log(data)
        theCustomers = data[0]
        theBookings = data[1].bookings
        theRooms = data[2].rooms
        currentCustomer = new Customer(theCustomers, theBookings)
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
bookARoomButton.addEventListener('click', showBookingPage)
calendarSubmitButton.addEventListener('click', showAvailableBookingsFromCalendar)
yourBookingsButton.addEventListener('click', showYourBookingPage)
submitFilterButton.addEventListener('click', showRoomTypesFromFilter)
loginButton.addEventListener('click', function(event) {
    logIn(event)
})
window.addEventListener('load', function() {
    hide(bookARoomBar)
    hide(yourBookingsButton)
    hide(innerPage)
})


// FUNCTIONS
function logIn(event) {
    event.preventDefault()
    const currentUserName = userName.value
    const currentPassWord = passWord.value
    if (currentUserName.startsWith('customer') && currentPassWord === 'overlook2021') {
        const customerId = currentUserName.split('customer')[1]
        getFetch(customerId)
        hide(outerPage)
        show(innerPage)
    } else {
        outerBanner.innerText = 'INVALID NAME OR PASSWORD, TRY AGAIN'
        }
    }
    

function welcomeCustomer() {
    currentCustomer.returnTotalSpent(allRooms)
    welcomeCustomerSpot.innerHTML = `Howdy ${currentCustomer.name}! You have spent: $${currentCustomer.totalSpent.toFixed(2)}`
};


function showAvailableBookingsFromCalendar() {
    bookingMessage.innerText = `AVAILABLE ROOMS`
    bookARoomSection.innerHTML = ''
    let formattedDate = calendarValue.value.split('-').join('/')
    let theAvailableRooms = hotel.selectDateToBook(formattedDate)
    if (!theAvailableRooms.length) {
        bookingMessage.innerHTML = `<div> NO ROOMS AVAILABLE, PLEASE SEARCH AGAIN </div>`
    } else {
    theAvailableRooms.forEach((room, index) => {
        bookARoomSection.innerHTML += 
    `<div class="booking-card">
    <li> ROOM NUMBER: ${room.number} </li>
    <li> TYPE: ${room.roomType} </li>
    <li> BIDET: ${room.bidet} </li>
    <li> BED SIZE: ${room.bedSize} </li>
    <li> NUMBER OF BEDS: ${room.numBeds} </li>
    <li> COST: ${room.costPerNight} </li>
    <button id=${index} class="book-room"> BOOK ROOM </button>
    </div>`
    })
    bookRoomButtons = document.querySelectorAll('.book-room')
    bookRoomButtons.forEach(bookRoomButton => {
    bookRoomButton.addEventListener('click', function(event) {
    let room = theAvailableRooms[parseInt(event.target.id)]
        postApiHelper(room, formattedDate)})
        })
    }
    show(bookingMessage)
}


function showRoomTypesFromFilter(event) {
    event.preventDefault()
    bookingMessage.innerText = `FILTERED BY ROOM TYPE`
    bookARoomSection.innerHTML = ''
    let formattedDate = calendarValue.value.split('-').join('/')
    let dropDownValue = selectDropDown.value
    let theFilteredRoomTypes = hotel.filterRoomTypes(formattedDate, dropDownValue)
    if (!theFilteredRoomTypes.length) {
        bookingMessage.innerHTML = `<div> NO ROOMS AVAILABLE, PLEASE SEARCH AGAIN </div>`
    } else {
    theFilteredRoomTypes.forEach((room, index) => {
        bookARoomSection.innerHTML += 
    `<div class="booking-card">
    <li> ROOM NUMBER: ${room.number} </li>
    <li> TYPE: ${room.roomType} </li>
    <li> BIDET: ${room.bidet} </li>
    <li> BED SIZE: ${room.bedSize} </li>
    <li> NUMBER OF BEDS: ${room.numBeds} </li>
    <li> COST: $${room.costPerNight} </li>
    <button id=${index} class="book-room"> BOOK ROOM </button>
    </div>`
})
bookRoomButtons = document.querySelectorAll('.book-room')
bookRoomButtons.forEach(bookRoomButton => {
    bookRoomButton.addEventListener('click', function(event) {
    let room = theFilteredRoomTypes[parseInt(event.target.id)]
        postApiHelper(room, formattedDate)})
        })
    }
}


function postApiHelper(room, formattedDate) {
    justBookedRoom = { userID: currentCustomer.id, date: formattedDate, roomNumber: room.number }
    postApiData(justBookedRoom)
}


function postApiData(justBookedRoom) {
    fetch('http://localhost:3001/api/v1/bookings', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(justBookedRoom)
    }).then(data => data.json()).then(data => {
        console.log(data)
        hotel.bookings.push(data.newBooking)
        currentCustomer.bookings.push(data.newBooking)
        bookingMessage.innerText = `THANK YOU FOR BOOKING`
        hide(bookARoomSection)
        welcomeCustomer()
        renderBookingLinesOnPage()
    })
    .catch(error => console.log(error));
}


function showBookingPage() {
    show(bookARoomBar)
    show(bookARoomSection)
    show(yourBookingsButton)
    hide(bookARoomButton)
    hide(bookingsSpot)
    hide(bookingMessage)
    bookARoomSection.innerHTML = ''
}


function showYourBookingPage() {
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
    <h2> ROOM: ${currentRoom.number} - ROOMTYPE: ${currentRoom.roomType} - BIDET: ${currentRoom.bidet} - BEDSIZE: ${currentRoom.bedSize} - COST: $${currentRoom.costPerNight}</h2>
    </div>`
    })
};


function show(element) {
    element.classList.remove('hidden')
};


function hide(element) {
    element.classList.add('hidden')
};











































