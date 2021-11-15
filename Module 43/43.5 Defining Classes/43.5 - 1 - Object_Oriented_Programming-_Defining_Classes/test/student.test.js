const { expect } = require("chai");
const Student = require("../src/student");

describe("Student class", () => {
  it("Can instantiate Student class", () => {
    const newStudent = new Student("Mary", "Lee", 2000, 1, 1, "female");
  });
  it("Instance has correct attributes", () => {
    const newStudent = new Student("Bobby", "Smith", 2001, 2, 3, "male");
    expect(newStudent.firstName).to.equal("Bobby");
    expect(newStudent.lastName).to.equal("Smith");
    expect(newStudent.birthYear).to.equal(2001);
    expect(newStudent.birthMonth).to.equal(2);
    expect(newStudent.birthDay).to.equal(3);
    expect(newStudent.gender).to.equal("male");
  });
});
