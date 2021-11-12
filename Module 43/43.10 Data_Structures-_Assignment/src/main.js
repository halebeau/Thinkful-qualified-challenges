const isPalindrome = require("./stack/isPalindrome");
const removeDuplicates = require("./linked-list/removeDuplicates");
const LinkedList = require("./linked-list/linkedList");
const ParkingLot = require("./queue/parkingLot");

console.log("isPalindrome('kayak')", isPalindrome("kayak"), "\n");

const sortedLinkedList = new LinkedList();
sortedLinkedList.insert(1);
sortedLinkedList.insert(2);
sortedLinkedList.insert(3);
sortedLinkedList.insert(3);

const noDuplicates = removeDuplicates(sortedLinkedList);
console.log(
  "removeDuplicates([1,2,3,3])",
  JSON.stringify(noDuplicates, null, 2),
  "\n"
);

const parkingLot = new ParkingLot(3, 5);

parkingLot.enter("786-XDX");
parkingLot.enter("443-XGL");
parkingLot.enter("516-XNM");
parkingLot.enter("272-XSX");
parkingLot.enter("674-ZSC");

parkingLot.leave("443-XGL");

console.log("parkingLot", JSON.stringify(parkingLot, null, 2), "\n");
