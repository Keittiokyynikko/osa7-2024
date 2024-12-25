import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import { expect } from "vitest";

describe("<BlogForm />", () => {
  test("right information", async () => {
    const user = userEvent.setup();
    const createBlog = vi.fn();
    const setError = vi.fn();
    const setInfo = vi.fn();

    render(
      <BlogForm
        createBlog={createBlog}
        setErrorMessage={setError}
        setInfoMessage={setInfo}
      />,
    );
    const title = screen.getByTitle("title");
    const author = screen.getByTitle("author");
    const url = screen.getByTitle("url");
    const sendButton = screen.getByText("create");

    await user.type(title, "Otsikko");
    await user.type(author, "Hanski");
    await user.type(url, "example.com");
    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].newBlog.title).toBe("Otsikko");
    expect(createBlog.mock.calls[0][0].newBlog.author).toBe("Hanski");
    expect(createBlog.mock.calls[0][0].newBlog.url).toBe("example.com");
  });
});
