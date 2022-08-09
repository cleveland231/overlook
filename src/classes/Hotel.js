// import { sampleCustomerData } from '../../test/sample-customer'
// import { sampleBookingData } from '../../test/sample-booking'
// import { sampleRoomData } from '../../test/sample-room'
// import Customer from './Customer'
// import Booking from './Booking'
// import Room from './Room'

export default class Hotel {
    constructor(customer, bookings, rooms) {
        this.customer = customer;
        this.bookings = bookings;
        this.rooms = rooms;
    }
    selectDateToBook(date) {
        const restOfRooms = [...this.rooms];
        const filteredBookings = this.bookings.filter(booking => booking.date === date)
        filteredBookings.forEach((booking) => {
            const indexOfRoom = restOfRooms.map(room => room.number).indexOf(booking.roomNumber)
            restOfRooms.splice(indexOfRoom, 1)
        })
        return restOfRooms
        

        /*
        be able to match the rooms number and bookings room number 

        get all sample data arrays to come on in
        match the booking.roomNumber and room.number?
        so I can check if the date.value is available.?
        potential: forEach, find?

        show list of rooms that are available on that    date.
        */
    }
    filterRoomTypes(date, type) {
        const datePassedThrough = this.selectDateToBook(date)
        const filteredByRoomTypes = datePassedThrough.filter((room) => {
            room.roomType === type
        })
        return filteredByRoomTypes
        /*
        also pass in room in parameter for room number
        call this.selectDateToBook(date) because we want to be able to choose rooms that are available.

        be able to filter through room data for .roomType in order to display filtered rooms depending on what roomtype is inputed.
        potential: forEach, filter, map
        */
    }
}