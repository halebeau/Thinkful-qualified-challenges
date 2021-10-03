import React from "react";
import Roster from "./Roster";

function App() {
  const roster = [
    { id: "1", firstName: "John", lastName: "Smith", location: "California" },
    { id: "2", firstName: "April", lastName: "White", location: "Nebraska" },
    { id: "3", firstName: "Jane", lastName: "Doe", location: "Florida" },
  ];
  return <Roster detailed={true} roster={roster} />;
}

export default App;
