import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Explorer from '../features/explorer/ExplorerOverview';
import userEvent from '@testing-library/user-event';
import { addFiles, deleteItem } from '../redux/fileSystemSlices';


jest.mock('uuid', () => ({ v4: jest.fn(() => 'mocked-uuid') }));

const mockStore = configureMockStore();
const initialState = {
    fileSystem: {
        currentFile: null,
        files: {
            0: {
                id: 0,
                title: 'root',
                open: true,
                type: 'folder-root',
                parentId: null,
                content: null,
                children: [],
            },
        },
    },
};

let store;

beforeEach(() => {
    store = mockStore(initialState);
});

test('Explorer renders without crashing on Fresh/InitialState', async () => {
    const store = mockStore(initialState);

    render(
        <Provider store={store}>
            <Explorer />
        </Provider>
    );

    await waitFor(() => {
        expect(screen.getByText('root')).toBeInTheDocument();
    });
});
test('Test addition of a file in Redux store only', () => {
    const store = mockStore(initialState);

    // Before dispatching the action
    console.log('Before dispatch:', store.getState());

    // Dispatch an action to add a file
    store.dispatch(addFiles({
        title: 'File1',
        type: 'file',
        parentId: 0, // or the appropriate parent ID
    }));

    // After dispatching the action
    console.log('After dispatch:', store.getState());

    // Assert the state after dispatch
    expect(Object.keys(store.getState().fileSystem).length == 2);

});

test('Test creation of a new file', async () => {
    const store = mockStore(initialState);

    // Before dispatching the action


    render(
        <Provider store={store}>
            <Explorer />
        </Provider>
    );

    fireEvent.click(screen.getByTitle('Create New File'));

    // Wait for the input field to be present in the DOM
    await waitFor(() => {
        expect(screen.getByTestId('file-input')).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId('file-input'), 'File1', { allAtOnce: true });

    // Press Enter to create the file
    userEvent.type(screen.getByTestId('file-input'), '{enter}');

    // After dispatching the action


    // Wait for any asynchronous actions to complete
    await waitFor(() => {
        // Assertions

        expect(store.getActions()).toEqual([
            {
                type: 'filesSystem/addFiles',
                payload: {
                    title: 'File1',
                    type: 'file',
                    parentId: 0, // or the appropriate parent ID
                },
            },
        ]);
    });

});
