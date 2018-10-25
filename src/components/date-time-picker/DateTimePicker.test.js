import React from "react";
import { render, cleanup, fireEvent, waitForElement } from "react-testing-library";
import DateTimePicker from './DateTimePicker';
import "jest-dom/extend-expect";

afterEach(cleanup)

test("Fields title, description, date and coordinator are mandatory.", async () => {
    const onDateTimeChange = jest.fn()
    const { getByTestId } = render(<DateTimePicker onChange={onDateTimeChange} />);
 
    fireEvent.change(getByTestId('ampm'), {})

    expect(onDateTimeChange).toHaveBeenCalledWith("abc")
});