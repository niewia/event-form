import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import CreateNewEvent from './CreateNewEvent';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux'
import { Router} from 'react-router-dom';
import {createMemoryHistory} from 'history'
import store from '../../../store'
afterEach(cleanup)

function renderWithRouter(
    ui,
    { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
    return {
        ...render(<Router history={history}>{ui}</Router>),
        // adding `history` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        history,
    }
}
function renderWithRedux(
    ui
) {
    return {
        ...renderWithRouter(<Provider store={store}>{ui}</Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store,
    }
}

/**
 * I tried to follow TDD but when I implemented redux + router it became to complicated
 */
test('Fields title, description, date and coordinator are mandatory.', async () => {
    let eventState;

    const { getByTestId } = renderWithRedux(<CreateNewEvent ref={(ref) => eventState = ref} />);

    const titleInput = getByTestId('Input');
    fireEvent.change(titleInput, { target: { value: 'Text' } });
    expect(titleInput.value).toBe('Text')
    
    const description = getByTestId('TextArea');
    fireEvent.change(description, { target: { value: 'Description' } });
    expect(description.value).toBe('Description')

    const date = getByTestId('date');
    fireEvent.change(date, { target: { value: '2100-01-01' } });
    expect(date.value).toBe('2100-01-01')
    
    const submit = getByTestId('submit');
    expect(submit).toBeTruthy();
    submit.click();
    
    const form = getByTestId('form');
    fireEvent.submit(form, {});

    expect(getByTestId('submit')).toBeFalsy();
});

test('Description field has 140 character limit.', async () => {
    const { getByTestId } = render(<CreateNewEvent />);

    const description = getByTestId('description');
    expect(description.maxLength).toBe(140);
});

test('There is a character counter below the description field.', async () => {
    const { getByTestId } = render(<CreateNewEvent />);

    const description = getByTestId('description');
    const descriptionLength = getByTestId('description-length');

    expect(descriptionLength).toHaveTextContent('0/140');

    fireEvent.change(description, { target: { value: 'Text' } });
    expect(descriptionLength).toHaveTextContent('4/140');
});

test('Events can’t be created prior to the actual date.', async () => {
    const { getByTestId } = render(<CreateNewEvent />);
    const submitButton = getByTestId('submit');
    expect(submitButton.disabled).toBeTruthy();

    fireEvent.change(getByTestId('title'), { target: { value: 'Text' } });
    fireEvent.change(getByTestId('description'), { target: { value: 'Text' } });
});