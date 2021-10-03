import React from "react";

function Header({ loggedIn, handleLoggedInClick, fontSize, handleFontSizeClick }) {
  return (
    <div>
      <button onClick={handleLoggedInClick}>
        {loggedIn ? "Log Out" : "Log In"}
      </button>
      <button onClick={handleFontSizeClick}>Increase Font Size</button>
    </div>
  );
}

export default Header;
