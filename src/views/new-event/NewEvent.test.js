import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import NewEvent from './NewEvent';
import "jest-dom/extend-expect";

afterEach(cleanup)

test("Fields title, description, date and coordinator are mandatory.", async () => {
    const { getByLabelText, getByTestId } = render(<NewEvent />);

    const title = getByLabelText("TITLE");
    expect(title).toBeTruthy();
    expect(title.required).toBeTruthy();

    const description = getByLabelText("DESCRIPTION");
    expect(description).toBeTruthy();
    expect(description.required).toBeTruthy();

    const date = getByLabelText("STARTS ON");
    expect(date).toBeTruthy();
    expect(date.required).toBeTruthy();
});

test("Description field has 140 character limit.", async () => {
    const { getByTestId } = render(<NewEvent />);

    const description = getByTestId("description");
    expect(description.maxLength).toBe(140);
});

test("There is a character counter below the description field.", async () => {
    const { getByTestId } = render(<NewEvent />);

    const description = getByTestId("description");
    const descriptionLength = getByTestId("description-length");

    expect(descriptionLength).toHaveTextContent("0/140");
    
    fireEvent.change(description, {target: {value: 'Text'}});
    expect(descriptionLength).toHaveTextContent("4/140");
});

test("Events can’t be created prior to the actual date.", async () => {
    const { getByTestId   } = render(<NewEvent />);
    const submitButton = getByTestId ('submit');
    expect(submitButton.disabled).toBeTruthy();
});

// test("Time field should accept 12 hours-time format but on the output, date should be formatted as YYYY-MM-DDTHH:mm in 24 hours format.", async () => {
//     expect(false).toBeTruthy();
// });

// test("Field payment is mandatory in case of paid events, and fee input appears only when payment field is filled", async () => {
//     expect(false).toBeTruthy();
// });

// test("Coordinator field has a default selected option with currently logged in user.", async () => {
//     expect(false).toBeTruthy();
// });

// test("The email field should have an appropriate format", async () => {
//     expect(false).toBeTruthy();
// });

// test("The title field should be verified for duplicate titles", async () => {
//     expect(false).toBeTruthy();
// });