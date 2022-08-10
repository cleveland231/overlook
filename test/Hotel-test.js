import chai from 'chai';
const expect = chai.expect;
import { sampleCustomerData } from './sample-customer'
import { sampleBookingData } from './sample-booking'
import { sampleRoomData } from './sample-room'
import Customer from '../src/classes/Customer'
import Booking from '../src/classes/Booking'
import Room from '../src/classes/Room'
import Hotel from '../src/classes/Hotel'

describe('Hotel test',() => {

    let customer;
    let bookings = [];
    let rooms = [];
    let hotel;

    beforeEach(() => {
        sampleBookingData.forEach((booking) => {
            bookings.push(new Booking(booking))
        })
        customer = new Customer(sampleCustomerData[0], bookings);
        customer.viewPastAndUpcomingBookings()
        sampleRoomData.forEach((room) => {
            rooms.push(new Room(room))
        })
        hotel = new Hotel(sampleCustomerData[0], bookings, rooms)
    });

    it('Should be an instance of Hotel', () => {
        expect(hotel).to.be.an.instanceOf(Hotel)
    });

    it('Should be able to have customers', () => {
        expect(hotel.customer).to.equal(sampleCustomerData[0])
    });

    it('Should be able to have bookings', () => {
        expect(hotel.bookings).to.equal(bookings)
    });

    it('Should be able to have rooms', () => {
        expect(hotel.rooms).to.equal(rooms)
    });

    it('Should be select date to book', () => {
        expect(hotel.selectDateToBook("2022/04/22").length).to.equal(115)
    });

    it('Should have a date to book', () => {
        expect(hotel.selectDateToBook().length).to.equal(150)
    })

    it('Should be able to select room types', () => {
        expect(hotel.filterRoomTypes("2022/04/22", "residential suite").length).to.equal(21)
    });

    it('Should be a room type to book', () => {
        expect(hotel.filterRoomTypes("2022/04/22").length).to.equal(0)
    });

})