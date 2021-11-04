const mazeSolver = require("../src/maze");

describe("Maze", () => {
  it("should find a single path", () => {
    let mySmallMaze = [
      [" ", "*", " "],
      [" ", "*", " "],
      [" ", " ", "e"],
    ];
    expect(mazeSolver(mySmallMaze)).toEqual("DDRR");
  });

  it("should find an alternate path", () => {
    let mySmallMaze = [
      [" ", "*", " "],
      [" ", " ", " "],
      [" ", "*", "e"],
    ];
    expect(mazeSolver(mySmallMaze)).toEqual("DRRD");
  });

  it("should find one path when multiple present", () => {
    let mySmallMaze = [
      [" ", " ", " "],
      [" ", "*", " "],
      [" ", " ", "e"],
    ];
    expect(["DDRR", "RRDD"]).toEqual(
      expect.arrayContaining([mazeSolver(mySmallMaze)])
    );
  });
});
