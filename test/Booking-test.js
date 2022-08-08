import chai from 'chai';
const expect = chai.expect;
import { sampleBookingData } from './sample-booking'
import Booking from '../src/classes/Booking'

// describe('Booking test',() => {

//     let booking;

//     beforeEach(() => {

//         booking = new Booking(sampleBookingData[0]);

//     });

//     it('Should be a function', () => {
//         expect(Booking).to.be.a('function');
//     })

//     it('Should be an instance of Booking', () => {
//         expect(booking).to.be.an.instanceOf(Booking)
//     })

//     it('Should be able to have a booking id', () => {
//         expect(booking.id).to.equal('5fwrgu4i7k55hl6sz')
//     })

//     it('Should be able to have a user id', () => {
//         expect(booking.userID).to.equal(9)
//     })

//     it('Should be able to have an date', () => {
//         expect(booking.date).to.equal('2022/04/22')
//     })

//     it('Should be able to have a room number', () => {
//         expect(booking.roomNumber).to.equal(15)
//     })
    
// })
