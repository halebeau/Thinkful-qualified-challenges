import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

require("cross-fetch/polyfill");

describe("App", () => {
  it("cleanup function aborts fetch call", async () => {
    const mockToDos = [
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

    const abortHandler = jest.fn();

    const { container, unmount } = render(<App />);

    await screen.findByText(/tempore ut sint quis recusandae/);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos?userId=3",
      expect.objectContaining({
        signal: expect.any(Object),
      })
    );

    const signal = mockFetch.mock.calls[0][1].signal;

    signal.addEventListener("abort", abortHandler);

    unmount();

    expect(abortHandler).toHaveBeenCalled();
  });
});
