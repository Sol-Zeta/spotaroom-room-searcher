import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from "@testing-library/react";
import { StandardButton } from "./index";

test('renders text', () => {
    const button = render(<StandardButton text={'Button text'}/>)
    button.getByText('Button text')
})

test('clicking button calls the function passed through props once', () => {
    const mockHandler = jest.fn();
    const button = render(<StandardButton text={'Button text'} onClick={mockHandler}/>)
    const btn = button.getByTestId('standard-button')
    fireEvent.click(btn)
    expect(mockHandler.mock.calls).toHaveLength(1)
})