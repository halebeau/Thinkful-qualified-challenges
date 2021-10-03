import React from "react";

function Holiday(props) {
  return (
    <>
      <p>{props.name}: {props.month} {props.day}</p>
    </>
  );
}

export default Holiday;
