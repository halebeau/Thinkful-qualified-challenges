import React, { useState } from "react";
import ClickTimes from "./ClickTimes";
import TimestampsDisplay from "./TimestampsDisplay";

function App() {
  const [timestamps, setTimestamps] = useState([]);
  const handleClick = (date) => {
    date = Date.now();
    setTimestamps([...timestamps, date]);
  }
  return (
    <div>
      <ClickTimes handleClick={handleClick}/>
      <TimestampsDisplay timestamps={timestamps} />
    </div>
  
  )
}

export default App;