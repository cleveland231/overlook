import chai from 'chai';
const expect = chai.expect;
import { sampleCustomerData } from './sample-customer'
import { sampleBookingData } from './sample-booking'
import { sampleRoomData } from './sample-room'
import Customer from '../src/classes/Customer'
import Booking from '../src/classes/Booking'
import Room from '../src/classes/Room'

// console.log("scd", sampleCustomerData[0])

describe('Customer test',() => {

    let customer;
    let booking;
    let room;

    beforeEach(() => {
        customer = new Customer(sampleCustomerData[0]);
        booking = new Booking(sampleBookingData[0]);
        room = new Room(sampleRoomData[0])
    });

    it('Should be an instance of Room', () => {

        expect(room).to.be.an.instanceOf(Room)
    })

    it('Should be a function', () => {

        expect(Customer).to.be.a('function');
    })

    it('Should be able to have an id', () => {

        expect(customer.id).to.equal(1)
    })

    it('Should be able to have a name', () => {

        expect(customer.name).to.equal("Leatha Ullrich")
    })

    it('Should be able to view past and upcoming bookings', () => {
        console.log("45before booking", booking)
        viewPastAndUpcomingBookings(booking)
        console.log("47after booking", booking)
        expect(customer.viewPastAndUpcomingBookings(booking)).to.equal()
    })

    it('Should be able to select a date to book', () => {
        
        expect(customer.selectDateToBook).to.equal()
    })
})
