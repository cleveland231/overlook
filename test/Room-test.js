import chai from 'chai';
const expect = chai.expect;
import { sampleRoomData } from './sample-room'
import Room from '../src/classes/Room'

describe('Room test',() => {

    let room;

    beforeEach(() => {

        room = new Room(sampleRoomData[0])

    });

    it('Should be an instance of Room', () => {
        expect(room).to.be.an.instanceOf(Room)
    })

    it('Should be a function', () => {
        expect(Room).to.be.a('function');
    })

    it('Should be able to have a room number', () => {
        expect(room.number).to.equal(1)
    })

    it('Should be able to have a room type', () => {
        expect(room.roomType).to.equal("residential suite")
    })

    it('Should be able to have a bidet', () => {
        expect(room.bidet).to.equal(true)
    })

    it('Should be able to have a bed size', () => {
        expect(room.bedSize).to.equal("queen")
    })

    it('Should be able to have a number of beds', () => {
        expect(room.numBeds).to.equal(1)
    })

    it('Should be able to have a cost per night', () => {
        expect(room.costPerNight).to.equal(358.4)
    })
})