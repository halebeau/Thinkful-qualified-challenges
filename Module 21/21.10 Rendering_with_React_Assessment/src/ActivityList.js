import React from "react";
import "./ActivityList.css";
import Activity from "./Activity";

function ActivityList({activities}) {
  if(Activity){
    const rows = activities.map(({time, description}, index) => (
      <tr key ={index}>
        <td>{time}</td>
        <td>{description}</td>
      </tr>
    ))
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  } else {
    return null;
  }
}

export default ActivityList;