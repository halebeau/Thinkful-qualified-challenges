const { expect } = require("chai");
const Event = require("../src/event");

describe("Event class", () => {
  describe("durationMinutes method", () => {
    it("duration of lunchEvent", () => {
      lunchEvent = new Event("Lunch", "12:00", "13:00", "Chipotle");
      expect(lunchEvent.durationMinutes()).to.equal(60);
    });
    it("duration of meeting", () => {
      meeting = new Event("Meeting", "14:00", "15:30", "Conference room");
      expect(meeting.durationMinutes()).to.equal(90);
    });
  });
  describe("conflict method", () => {
    it("lunchEvent and meeting overlap", () => {
      lunchEvent = new Event("Lunch", "12:00", "13:00", "Chipotle");
      meeting = new Event("Meeting", "14:00", "15:30", "Conference room");
      expect(lunchEvent.conflict(meeting)).to.be.false;
      expect(meeting.conflict(lunchEvent)).to.be.false;
    });
    it("meeting and soccerGame overlap", () => {
      meeting = new Event("Meeting", "14:00", "15:30", "Conference room");
      soccerGame = new Event("Soccer game", "15:00", "18:00", "Field");
      expect(soccerGame.conflict(meeting)).to.be.true;
      expect(meeting.conflict(soccerGame)).to.be.true;
    });
  });
});
