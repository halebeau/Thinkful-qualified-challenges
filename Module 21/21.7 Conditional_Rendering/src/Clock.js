import React from "react";

function Clock () {
  const time = new Date().getHours()
  if (time < 12){
      return <p>Good Morning!</p>;
  } else if (time >= 12 && time <= 18){
      return <p>Good Afternoon!</p>;
  } else if (time >= 18) {
      return <p>Good Evening!</p>;     
  }
}

export default Clock;