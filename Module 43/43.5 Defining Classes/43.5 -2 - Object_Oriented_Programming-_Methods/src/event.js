class Event {
  constructor(name, startTime, endTime, location) {
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
  }
  toString() {
    const { name, startTime, endTime, location } = this;
    return `${startTime} - ${endTime}: ${name} at ${location}`;
  }
  getStartHours() {
    return Number(this.startTime.split(":")[0]);
  }
  getStartMinutes() {
    return Number(this.startTime.split(":")[1]);
  }
  getEndHours() {
    return Number(this.endTime.split(":")[0]);
  }
  getEndMinutes() {
    return Number(this.endTime.split(":")[1]);
  }
  isBefore(other) {
    return (
      this.getEndHours() < other.getStartHours() ||
      (this.getEndHours() === other.getStartHours() &&
        this.getEndMinutes() <= other.getStartMinutes())
    );
  }
  durationMinutes() {
    const start = (this.getStartHours() * 60) + this.getStartMinutes()
    const end = (this.getEndHours() * 60) + this.getEndMinutes()
    return end - start
  }
  conflict(other) {
    let first
    let second
    if (this.getStartHours() <= other.getStartHours()) {
      first = this
      second = other
    } else {
      first = other
      second = this
    }
    return first.getEndHours() >= second.getStartHours();
  }
}

module.exports = Event;