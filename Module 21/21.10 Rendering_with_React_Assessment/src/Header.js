
import React from "react";
import "./Header.css";

function Header({imageSrc, name, birthday}) {
  return (
    <header>
      <img src ={imageSrc}></img>
      <div>{name}</div>
      <div>{birthday}</div>
    </header>
  );
}

export default Header;
