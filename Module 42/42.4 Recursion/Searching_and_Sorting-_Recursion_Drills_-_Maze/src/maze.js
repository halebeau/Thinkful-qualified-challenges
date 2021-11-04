/**
 * Return a string representing the path through the maze.
 * @param {array} maze
 * @param {array} index The starting point
 */
function mazeSolver(maze, index = [0, 0]) {
  let row = index[0];
  let col = index[1];

  // Base Case
  if (maze[row][col] === "e") {
    return "";
  }

  // Block off where you've been
  maze[row][col] = "*";

  //* all possible moves for a single turn- only one executes
  // Order attempted is always R L D U
  if (maze[row][col + 1] && maze[row][col + 1] !== "*") {
    col++;
    return "R" + mazeSolver(maze, [row, col]);
  }
  if (maze[row][col - 1] && maze[row][col - 1] !== "*") {
    col--;
    return "L" + mazeSolver(maze, [row, col]);
  } else if (maze[row + 1] && maze[row + 1][col] !== "*") {
    row++;
    return "D" + mazeSolver(maze, [row, col]);
  } else if (maze[row - 1] && maze[row - 1][col] !== "*") {
    row--;
    return "U" + mazeSolver(maze, [row, col]);
  }
}

module.exports = mazeSolver;