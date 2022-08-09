
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
    }
    filterRoomTypes(date, type) {
        // debugger
        const datePassedThrough = this.selectDateToBook(date)
        // console.log('datepassed', datePassedThrough)
        const filteredByRoomTypes = datePassedThrough.filter((room) => {
            return room.roomType === type
            // console.log('room', room)
        })
        // console.log('fbrt', filteredByRoomTypes)
        return filteredByRoomTypes
    }
}