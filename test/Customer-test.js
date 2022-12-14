import chai from 'chai';
const expect = chai.expect;
import { sampleCustomerData } from './sample-customer'
import { sampleBookingData } from './sample-booking'
import { sampleRoomData } from './sample-room'
import Customer from '../src/classes/Customer'
import Booking from '../src/classes/Booking'
import Room from '../src/classes/Room'

describe('Customer test',() => {

    let customer;
    let bookings = [];
    let rooms = [];
    
    beforeEach(() => {
        sampleBookingData.forEach((booking) => {
            bookings.push(new Booking(booking))
        })
        customer = new Customer(sampleCustomerData[0], bookings);
        customer.viewPastAndUpcomingBookings()
        sampleRoomData.forEach((room) => {
            rooms.push(new Room(room))
        })
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
        expect(customer.bookings.length).to.equal(130)
    });

    it('Should be able to view past and upcoming bookings', () => {
        expect(customer.viewPastAndUpcomingBookings()).to.equal()
    })

    it('Should be able to round the total amount of spent cents', () => {
        customer.returnTotalSpent(sampleRoomData)
        customer.totalSpent = customer.totalSpent
        expect(customer.totalSpent).to.equal(61647.1099999999)
    })

    it('Should be able to return the total amount spent', () => {
        customer.returnTotalSpent(sampleRoomData)
        customer.totalSpent = customer.totalSpent.toFixed(2)
        expect(customer.totalSpent).to.equal('70453.84')
    })

})
