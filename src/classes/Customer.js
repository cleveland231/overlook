
export default class Customer {
    constructor(customerData, bookings) {
        this.id = customerData.id;
        this.name = customerData.name;
        this.bookings = bookings;
        this.totalSpent = 0;
        this.availableRooms = []
    }
    viewPastAndUpcomingBookings() {
        const userBookings = this.bookings.filter((singleBooking) => {
            return singleBooking.userID === this.id
        })
        return userBookings
    }
    returnTotalSpent(roomData) {
        this.bookings.forEach((booking) => {
            roomData.forEach((room) => {
                if (booking.roomNumber === room.number) {
                    this.totalSpent += room.costPerNight
                }
            })
        })
    }
    selectDateToBook(date) {

        /*
        get all data arrays to come on in
        match the booking.roomNumber and room.number?
        potential: forEach, find?
        show list of rooms that are available on that    date.
        */
    }
    filterRoomTypes(date, ) {

        /*
        call this.selectDateToBook(date)
        be able to filter through room data for .roomType
        potential: forEach, filter 
        */
    }
}

// 1. Dashboard
// As a customer:

// I should see a dashboard page that shows me:
// Any room bookings I have made (past or upcoming)
// The total amount I have spent on rooms

// 2. Customer Interaction
// As a customer:

// I should be able to select a date for which I’d like to book a room for myself
// Upon selecting a date, I should be shown a list of room details for only rooms that are available on that date
// I should be able to filter the list of available rooms by their roomType property
// I should be able to select a room for booking
// In the event that no rooms are available for the date/roomType selected, display a message fiercely apologizing to the user and asking them to adjust their room search