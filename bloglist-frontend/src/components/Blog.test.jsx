import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect } from "vitest";

describe("<Blog />", () => {
  test("renders title", () => {
    const blog = {
      title: "Uusi blogiteksti",
      author: "Antsu Antikainen",
      url: "blogi.example.com",
      likes: 2,
      user: {
        name: "Testinimi",
      },
    };

    const user = {
      name: "Testinimi",
    };

    render(<Blog blog={blog} user={user} />);

    const element = screen.getByText("Uusi blogiteksti");
    expect(element).toBeDefined();
  });

  test("renders all info when clicked", async () => {
    const blog = {
      title: "Uusi blogiteksti",
      author: "Antsu Antikainen",
      url: "blogi.example.com",
      user: {
        name: "Testinimi",
      },
    };

    const user = {
      name: "Testinimi",
    };

    const mockHandler = vi.fn();

    const container = render(<Blog blog={blog} user={user} />).container;

    const userEv = userEvent.setup();
    const button = screen.getByText("show");
    await userEv.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test("like button press is registered", async () => {
    const blog = {
      title: "Uusi blogiteksti",
      author: "Antsu Antikainen",
      url: "blogi.example.com",
      user: {
        name: "Testinimi",
      },
    };

    const user = {
      name: "Testinimi",
    };

    const mockHandler = vi.fn();

    const container = render(
      <Blog blog={blog} user={user} handleEdit={mockHandler} />,
    ).container;

    const userEv = userEvent.setup();
    const button = screen.getByText("like");
    await userEv.click(button);
    await userEv.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
