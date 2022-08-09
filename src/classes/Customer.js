
export default class Customer {
    constructor(customerData, bookings) {
        this.id = customerData.id;
        this.name = customerData.name;
        this.bookings = bookings;
        this.totalSpent = 0;
    }
    viewPastAndUpcomingBookings() {
        this.bookings = this.bookings.filter((singleBooking) => {
            return singleBooking.userID === this.id
        })
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