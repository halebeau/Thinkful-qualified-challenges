const path = require("path");

const StarshipEnterprise = require(path.resolve(
  `${process.env.SOLUTION_PATH || ""}`,
  "src/StarshipEnterprise"
));

describe("StarshipEnterprise", () => {
  let militaryAssignments;
  beforeEach(() => {
    militaryAssignments = new StarshipEnterprise();
    militaryAssignments.assignOfficer(10, "Captain Picard");
    militaryAssignments.assignOfficer(6, "Commander Riker");
    militaryAssignments.assignOfficer(11, "Commander Data");
    militaryAssignments.assignOfficer(4, "Lt. Cmdr. Worf");
    militaryAssignments.assignOfficer(7, "Lt. Cmdr. LaForge");
    militaryAssignments.assignOfficer(12, "Lt. Cmdr. Crusher");
    militaryAssignments.assignOfficer(5, "Lieutenant Security-Officer");
    militaryAssignments.assignOfficer(13, "Lieutenant Selar");
    /** 
    Resulting tree:
                  10. Captain Picard
                 /                  \
          6. Commander Riker       11. Commander Data
            /         \               \
    4. Lt. Cmdr.   7. Lt. Cmdr.     12. Lt. Cmdr.
        Worf           LaForge           Crusher
             \                           \
        5. Lieutenant                  13. Lieutenant
        security-officer                    Selar
    */
  });

  test("should have methods named 'assignOfficer()', 'findOfficersWithNoDirectReports()', 'listOfficersByExperience()', and 'listOfficersByRank()'", () => {
    expect(typeof militaryAssignments.assignOfficer).toEqual("function");
    expect(typeof militaryAssignments.findOfficersWithNoDirectReports).toEqual(
      "function"
    );
    expect(typeof militaryAssignments.listOfficersByExperience).toEqual(
      "function"
    );
    expect(typeof militaryAssignments.listOfficersByRank).toEqual("function");
  });

  test("should correctly assign officers to StarshipEnterprise", () => {
    expect(militaryAssignments.leftReport.officerName).toEqual(
      "Commander Riker"
    );
    expect(militaryAssignments.leftReport.leftReport.officerName).toEqual(
      "Lt. Cmdr. Worf"
    );
    expect(militaryAssignments.leftReport.rightReport.officerName).toEqual(
      "Lt. Cmdr. LaForge"
    );
    expect(
      militaryAssignments.leftReport.leftReport.rightReport.officerName
    ).toEqual("Lieutenant Security-Officer");
    expect(militaryAssignments.rightReport.officerName).toEqual(
      "Commander Data"
    );
    expect(militaryAssignments.rightReport.rightReport.officerName).toEqual(
      "Lt. Cmdr. Crusher"
    );
    expect(
      militaryAssignments.rightReport.rightReport.rightReport.officerName
    ).toEqual("Lieutenant Selar");
  });

  test("should return the names of officers who do not have any direct reports", () => {
    const officers = militaryAssignments.findOfficersWithNoDirectReports();
    expect(officers.length).toEqual(3);
    expect(officers).toEqual(
      expect.arrayContaining([
        "Lieutenant Security-Officer",
        "Lt. Cmdr. LaForge",
        "Lieutenant Selar",
      ])
    );
  });

  test("should list the officers from most experienced to least experienced", () => {
    const officers = militaryAssignments.listOfficersByExperience();
    expect(officers).toEqual([
      "Lieutenant Selar",
      "Lt. Cmdr. Crusher",
      "Commander Data",
      "Captain Picard",
      "Lt. Cmdr. LaForge",
      "Commander Riker",
      "Lieutenant Security-Officer",
      "Lt. Cmdr. Worf",
    ]);
  });

  test("should list the officers by rank", () => {
    const officers = militaryAssignments.listOfficersByRank(
      militaryAssignments
    );

    expect(officers).toEqual({
      1: expect.arrayContaining(["Captain Picard"]),
      2: expect.arrayContaining(["Commander Riker", "Commander Data"]),
      3: expect.arrayContaining([
        "Lt. Cmdr. Worf",
        "Lt. Cmdr. LaForge",
        "Lt. Cmdr. Crusher",
      ]),
      4: expect.arrayContaining([
        "Lieutenant Security-Officer",
        "Lieutenant Selar",
      ]),
    });
  });
});
