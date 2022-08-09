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
    let bookings = [];
    let room;
    

    beforeEach(() => {
        sampleBookingData.forEach((booking) => {
            bookings.push(new Booking(booking))
        })
        customer = new Customer(sampleCustomerData[0], bookings);
        customer.viewPastAndUpcomingBookings()
        room = new Room(sampleRoomData[0]);
    });

    it('Should be an instance of Customer', () => {
        expect(customer).to.be.an.instanceOf(Customer)
    });

    it('Should be a function', () => {
        expect(Customer).to.be.a('function');
    });

    it('Should be able to have an id', () => {
        expect(customer.id).to.equal(1)
    });

    it('Should be able to have a name', () => {
        expect(customer.name).to.equal("Leatha Ullrich")
    });

    it('Should be able to view past and upcoming bookings', () => {
        expect(customer.bookings.length).to.equal(5040)
    });

    // it('Should be able to view past and upcoming bookings', () => {
    //     console.log("45", booking)
    //     viewPastAndUpcomingBookings(booking)
    //     console.log("47", booking)
    //     expect(customer.viewPastAndUpcomingBookings(booking)).to.equal()
    // })

    it('Should be able to return the total amount spent', () => {
        customer.returnTotalSpent(sampleRoomData)
        customer.totalSpent = customer.totalSpent.toFixed(2)
        expect(customer.totalSpent).to.equal('2110582.92')
    })

    // it('Should be able to select a date to book', () => {
        
    //     expect(customer.selectDateToBook).to.equal()
    // })
})
