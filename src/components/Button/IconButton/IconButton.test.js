import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { IconButton } from "./index";
import { icons } from "../../../assetsRoutes";

describe("IconButton", () => {
  let iconButton;

  beforeEach(() => {
    iconButton = render(<IconButton icon={icons.search}/>);
  });

  test("renders its children", () => {
    expect(iconButton.container).toHaveAttribute('src', icons.search)
    console.log("icon button", iconButton.container)
  });

//   test("clicking button calls the function passed through props once", () => {
//     const mockHandler = jest.fn();
//     const button = render(
//       <IconButton text={"Button text"} onClick={mockHandler} />
//     );
//     const btn = button.getByTestId("standard-button");
//     fireEvent.click(btn);
//     expect(mockHandler.mock.calls).toHaveLength(1);
//   });
});
