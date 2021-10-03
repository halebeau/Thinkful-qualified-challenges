import React from "react";

export const ErrorMessage = ({ error, children }) => (
  <main className="container">
    <p style={{ color: "red" }}>ERROR: {error.message}</p>
    {children}
  </main>
);

export default ErrorMessage;
