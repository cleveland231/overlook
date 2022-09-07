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

// test
