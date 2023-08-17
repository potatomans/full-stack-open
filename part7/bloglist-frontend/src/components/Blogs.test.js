import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  test("renders author and title only", () => {
    const blog = {
      title: "Why We Sleep",
      author: "Matthew Walker",
      url: "whywesleep.com",
      likes: 10,
    }; // note: use beforeEach() to ensure repeated lines get called before each test

    const { container } = render(<Blog blog={blog} />);
    const collapse = container.querySelector(".collapse");
    const expand = container.querySelector(".expand");
    expect(collapse).toHaveTextContent("Why We Sleep Matthew Walker");
    expect(collapse).not.toHaveStyle("display: none");
    expect(expand).toHaveStyle("display: none");
  });
  test("after clicking a button, children are displayed", async () => {
    const blog = {
      title: "Why We Sleep",
      author: "Matthew Walker",
      url: "whywesleep.com",
      likes: 10,
    };

    const { container } = render(<Blog blog={blog} />);
    const collapse = container.querySelector(".collapse");
    const expand = container.querySelector(".expand");

    expect(collapse).toHaveTextContent("Why We Sleep Matthew Walker");
    expect(collapse).not.toHaveStyle("display: none");
    expect(expand).toHaveStyle("display: none");

    const user = userEvent.setup();
    const button = container.querySelector(".view");
    await user.click(button);
    expect(expand).not.toHaveStyle("display: none");
  });
  test("like button is clicked twice", async () => {
    const blog = {
      title: "Why We Sleep",
      author: "Matthew Walker",
      url: "whywesleep.com",
      likes: 10,
    };

    const mockHandler = jest.fn();

    const { container } = render(<Blog blog={blog} handleLike={mockHandler} />);

    const user = userEvent.setup();
    const button = container.querySelector(".like");
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
