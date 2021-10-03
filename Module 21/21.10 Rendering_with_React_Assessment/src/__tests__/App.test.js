import React from "react";
import { cleanup, render } from "@testing-library/react";
import App from "../App";
import Activity from "../Activity";
import ActivityList from "../ActivityList";
import Header from "../Header";
import HobbyList from "../HobbyList";

afterEach(cleanup);

test("Image is present in the Header component", () => {
  const { container } = render(<Header imageSrc={"https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"} />);
  const element = container.querySelector("img");
  expect(element).toBeTruthy();
  expect(element.src).toBe(
    "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"
  );
});

test("Name is present in the Header component", () => {
  const { getByText } = render(<Header name={"Kitty Kat"}/>);
  const element = getByText("Kitty Kat");
  expect(element).toBeTruthy();
});

test("Birthday is present in the Header component", () => {
  const { getByText } = render(<Header birthday={"January 1"}/>);
  const element = getByText(/January 1/);
  expect(element).toBeTruthy();
});

test("Hobbies label is present in the HobbyList component", () => {
  const hobbies = ["watching birds", "hiding in a box", "napping"];
  const { getByText } = render(<HobbyList hobbies={hobbies}/>);
  const element = getByText("Hobbies");
  expect(element).toBeTruthy();
});

test("Hobbies are present in the HobbyList component", () => {
  const hobbies = ["watching birds", "hiding in a box", "napping"];
  const { getByText } = render(<HobbyList hobbies={hobbies}/>);
  hobbies.forEach((hobby) => {
    const element = getByText(hobby);
    expect(element).toBeTruthy();
  });
});

test("Hobbies does not appear when hobbies list is empty", () => {
  const hobbies = [];
  const { container } = render(<HobbyList hobbies={hobbies}/>);
  expect(container.textContent).not.toContain("Hobbies");
})

test("Daily activities are present in the ActivityList component", () => {
  const activities = [
    { time: "8:00 am", description: "wake up" },
    { time: "8:30 am", description: "breakfast" },
    { time: "9:00 am", description: "morning nap" },
    { time: "12:00 pm", description: "lunch" },
    { time: "1:00 pm", description: "afternoon nap" },
    { time: "6:00 pm", description: "dinner" },
    { time: "7:00 pm", description: "play" },
    { time: "10:00 pm", description: "bedtime" },
  ];
  
  const { getByText } = render(<ActivityList activities={activities} />);
  
  activities.forEach((activity) => {
    const time = getByText(activity.time);
    const description = getByText(activity.description);
    expect(time).toBeTruthy();
    expect(description).toBeTruthy();
  });
});
