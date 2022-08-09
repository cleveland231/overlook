import chai from 'chai';
const expect = chai.expect;
import { sampleCustomerData } from './sample-customer'
import { sampleBookingData } from './sample-booking'
import { sampleRoomData } from './sample-room'
import Customer from '../src/classes/Customer'
import Booking from '../src/classes/Booking'
import Room from '../src/classes/Room'
import Hotel from '../src/classes/Hotel'

// console.log("scd", sampleCustomerData[0])

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
        // const rooms = new Room(sampleRoomData[0]);
        // console.log('31room', rooms)
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
        // console.log('date: ', date)
        hotel.selectDateToBook("2022/04/22")
        // hotel.selectDateToBook(date)
        expect(hotel.selectDateToBook("2022/04/22").length).to.be.a()
    });

    it('Should be able to select room types', () => {
        // console.log('date: ', date)
        // hotel.selectDateToBook(date)
        expect(hotel.filterRoomTypes("2022/04/22", "residential suite").length).to.equal(15)
    });

   

})