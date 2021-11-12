const ParkingLot = require("../../src/queue/parkingLot");

describe("Parking lot", () => {
  describe("vacantSpaces", () => {
    test("is initially total number of spaces", () => {
      const parkingLot = new ParkingLot(50, 1);
      expect(parkingLot.vacantSpaces).toEqual(50);
    });

    test("is reduced when a car enters and is parked", () => {
      const parkingLot = new ParkingLot(5, 1);

      parkingLot.enter("N8881W");

      expect(parkingLot.vacantSpaces).toEqual(4);
    });

    test("is zero when lot is full", () => {
      const parkingLot = new ParkingLot(2, 1);

      parkingLot.enter("460-QRJ");
      parkingLot.enter("127-HLN");

      expect(parkingLot.vacantSpaces).toEqual(0);
    });
  });

  describe("occupants", () => {
    test("returns a list of spaces and their occupants ", () => {
      const parkingLot = new ParkingLot(2, 1);

      parkingLot.enter("670-POJ");

      expect(parkingLot.occupants).toHaveLength(2);
      expect(parkingLot.occupants).toContainEqual({
        space: 1,
        licensePlateNumber: "670-POJ",
      });
      expect(parkingLot.occupants).toContainEqual({
        space: 2,
        licensePlateNumber: "vacant",
      });
    });

    test("shows that cars are parked in the lowest number space first", () => {
      const parkingLot = new ParkingLot(10, 1);

      parkingLot.enter("806-OXF");
      parkingLot.enter("751-AXW");

      expect(parkingLot.occupants).toHaveLength(10);
      expect(parkingLot.occupants).toContainEqual({
        space: 1,
        licensePlateNumber: "806-OXF",
      });
      expect(parkingLot.occupants).toContainEqual({
        space: 2,
        licensePlateNumber: "751-AXW",
      });
    });
  });

  describe("queue", () => {
    test("is initially empty", () => {
      const parkingLot = new ParkingLot(3, 1);

      expect(parkingLot.queue.isEmpty()).toBe(true);
    });

    test("includes a car that enters when lot is full", () => {
      const parkingLot = new ParkingLot(1, 1);

      parkingLot.enter("342-TBZ");
      parkingLot.enter("699-VRG");

      expect(parkingLot.queue.isEmpty()).toBe(false);
      expect(parkingLot.queue.peek()).toBe("699-VRG");
    });

    test("includes multiple cars that enter when lot is full", () => {
      const parkingLot = new ParkingLot(2, 1);

      parkingLot.enter("509-WHV");
      parkingLot.enter("677-NMN");
      parkingLot.enter("427-WNA");
      parkingLot.enter("325-TFS");

      expect(parkingLot.queue.isEmpty()).toBe(false);
      expect(parkingLot.queue.dequeue()).toBe("427-WNA");
      expect(parkingLot.queue.peek()).toBe("325-TFS");
    });
  });

  describe("leave", () => {
    test("parks car from queue when a car leaves", () => {
      const parkingLot = new ParkingLot(1, 1);

      parkingLot.enter("211-BUG");
      parkingLot.enter("638-UCE");

      expect(parkingLot.queue.isEmpty()).toBe(false);
      expect(parkingLot.queue.peek()).toBe("638-UCE");

      parkingLot.leave("211-BUG");

      expect(parkingLot.queue.isEmpty()).toBe(true);
      expect(parkingLot.occupants).toContainEqual({
        space: 1,
        licensePlateNumber: "638-UCE",
      });
    });

    test("parks car from queue in order cars leave", () => {
      const parkingLot = new ParkingLot(3, 1);

      parkingLot.enter("RLC-6432");
      parkingLot.enter("201-ISW");
      parkingLot.enter("402-CWX");
      parkingLot.enter("BDU-6588");
      parkingLot.enter("GVJ-4559");
      parkingLot.enter("JZF-7876");

      expect(parkingLot.queue.isEmpty()).toBe(false);
      expect(parkingLot.queue.peek()).toBe("BDU-6588");

      parkingLot.leave("402-CWX");

      expect(parkingLot.occupants).toContainEqual({
        space: 3,
        licensePlateNumber: "BDU-6588",
      });
      expect(parkingLot.queue.peek()).toBe("GVJ-4559");

      parkingLot.leave("RLC-6432");

      expect(parkingLot.occupants).toContainEqual({
        space: 1,
        licensePlateNumber: "GVJ-4559",
      });
      expect(parkingLot.queue.peek()).toBe("JZF-7876");
    });

    test("does NOT park car from queue when an unknown car leaves", () => {
      const parkingLot = new ParkingLot(1, 1);

      parkingLot.enter("ZCU-3813");
      parkingLot.enter("GXS-3431");

      expect(parkingLot.queue.peek()).toBe("GXS-3431");

      parkingLot.leave("DFF-1749");

      expect(parkingLot.queue.peek()).toBe("GXS-3431");
    });

    test("removes car from front of queue if it leaves before being parked.", () => {
      const parkingLot = new ParkingLot(1, 1);

      parkingLot.enter("YMF 801");
      parkingLot.enter("GAR 683");

      expect(parkingLot.queue.isEmpty()).toBe(false);
      expect(parkingLot.queue.peek()).toBe("GAR 683");

      parkingLot.leave("GAR 683");

      expect(parkingLot.queue.isEmpty()).toBe(true);
    });

    test("removes car from middle of queue if it leaves before being parked.", () => {
      const parkingLot = new ParkingLot(1, 1);

      parkingLot.enter("RKK 895");
      parkingLot.enter("LRT 546");
      parkingLot.enter("RPL 839");
      parkingLot.enter("DTX 317");

      parkingLot.leave("RPL 839");

      expect(parkingLot.queue.dequeue()).toBe("LRT 546");
      expect(parkingLot.queue.dequeue()).toBe("DTX 317");
    });

    test("removes car from end of queue if it leaves before being parked.", () => {
      const parkingLot = new ParkingLot(1, 1);

      parkingLot.enter("XGH 793");
      parkingLot.enter("NPF 252");
      parkingLot.enter("YAC 644");
      parkingLot.enter("MAX 270");

      expect(parkingLot.queue.isEmpty()).toBe(false);

      parkingLot.leave("MAX 270");

      expect(parkingLot.queue.dequeue()).toBe("NPF 252");
      expect(parkingLot.queue.dequeue()).toBe("YAC 644");
      expect(parkingLot.queue.isEmpty()).toBe(true);
    });
  });
  describe("totalRevenue", () => {
    test("is initially zero", () => {
      const parkingLot = new ParkingLot(10, 10);
      expect(parkingLot.totalRevenue).toBe(0);
    });
    test("increases by rate when a car leaves", () => {
      const parkingLot = new ParkingLot(10, 9);

      parkingLot.enter("YGN-9484");
      parkingLot.enter("CNC-3349");
      parkingLot.enter("EBN-9309");

      parkingLot.leave("CNC-3349");

      expect(parkingLot.totalRevenue).toBe(9);
    });

    test("does NOT increase when an unknown car leaves", () => {
      const parkingLot = new ParkingLot(10, 11);

      parkingLot.enter("NXL-1530");

      parkingLot.leave("KHS-8928");

      expect(parkingLot.totalRevenue).toBe(0);
    });
  });
});
