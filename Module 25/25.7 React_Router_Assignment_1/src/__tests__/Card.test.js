import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import Card from "../home/Card";
import { screen } from "@testing-library/dom";
import React from "react";
import { createMemoryHistory } from "history";

describe("Card component", () => {
  test("Displayed name links to users/:userId", async () => {
    const mockUser = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
      posts: [],
    };

    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Card key={mockUser.id} user={mockUser} />
      </Router>
    );

    await screen.findByText(/Leanne Graham/i);

    expect(getByText(/Leanne Graham/i).getAttribute("href")).toBe("/users/1");
  });
  test("# Posts » links to users/:userId/posts", async () => {
    const mockUser = {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
      posts: [],
    };

    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Card key={mockUser.id} user={mockUser} />
      </Router>
    );

    await screen.findByText(/Ervin Howell/i);

    expect(getByText(/Posts »/i).getAttribute("href")).toBe("/users/2/posts");
  });
});
