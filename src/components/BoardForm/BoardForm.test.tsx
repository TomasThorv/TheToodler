import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BoardForm from './BoardForm';

describe('BoardForm', () => {
    const mockForm = {
        name: '',
        description: '',
        thumbnailPhoto: '',
    };

    it('renders all input fields', () => {
        const { getByPlaceholderText } = render(
            <BoardForm form={mockForm} onFormChange={() => {}} onSubmit={() => {}} />
        );
        expect(getByPlaceholderText('Board name')).toBeTruthy();
        expect(getByPlaceholderText('Description')).toBeTruthy();
        expect(getByPlaceholderText('Thumbnail URL')).toBeTruthy();
    });

    it('calls onFormChange when text input changes', () => {
        const onFormChangeMock = jest.fn();
        const { getByPlaceholderText } = render(
            <BoardForm form={mockForm} onFormChange={onFormChangeMock} onSubmit={() => {}} />
        );
        fireEvent.changeText(getByPlaceholderText('Board name'), 'New Board');
        expect(onFormChangeMock).toHaveBeenCalled();
    });

    it('calls onSubmit when Add Board button is pressed', () => {
        const onSubmitMock = jest.fn();
        const { getByText } = render(
            <BoardForm form={mockForm} onFormChange={() => {}} onSubmit={onSubmitMock} />
        );
        fireEvent.press(getByText('Add Board'));
        expect(onSubmitMock).toHaveBeenCalled();
    });
});
