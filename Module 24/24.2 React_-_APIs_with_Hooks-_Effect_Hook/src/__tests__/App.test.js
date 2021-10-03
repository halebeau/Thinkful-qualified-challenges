import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

require("cross-fetch/polyfill");

describe("App", () => {
  it("has correct number of todo items", async () => {
    const mockToDos = [
      {
        userId: 3,
        id: 41,
        title:
          "aliquid amet impedit consequatur aspernatur placeat eaque fugiat suscipit",
        completed: false,
      },
      {
        userId: 3,
        id: 42,
        title: "rerum perferendis error quia ut eveniet",
        completed: false,
      },
      {
        userId: 3,
        id: 43,
        title: "tempore ut sint quis recusandae",
        completed: true,
      },
    ];

    const mockFetch = jest
      .spyOn(window, "fetch")
      .mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve(mockToDos) })
      );

    const { container } = render(<App />);

    await screen.findByText(/tempore ut sint quis recusandae/);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos?userId=2"
    );
    expect(container.querySelectorAll("li")).toHaveLength(3);
  });
});
