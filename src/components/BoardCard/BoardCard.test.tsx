import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BoardCard from './BoardCard';

const mockBoard = {
    id: 1,
    name: 'Test Board',
    description: 'Test Description',
    thumbnailPhoto: 'https://example.com/image.jpg',
};

describe('BoardCard', () => {
    it('renders board information correctly', () => {
        const { getByText } = render(
            <BoardCard board={mockBoard} onOpen={() => {}} onDelete={() => {}} />
        );
        expect(getByText('Test Board')).toBeTruthy();
        expect(getByText('Test Description')).toBeTruthy();
    });

    it('calls onOpen when Open button is pressed', () => {
        const onOpenMock = jest.fn();
        const { getByText } = render(
            <BoardCard board={mockBoard} onOpen={onOpenMock} onDelete={() => {}} />
        );
        fireEvent.press(getByText('Open'));
        expect(onOpenMock).toHaveBeenCalledWith(1);
    });

    it('calls onDelete when Delete button is pressed', () => {
        const onDeleteMock = jest.fn();
        const { getByText } = render(
            <BoardCard board={mockBoard} onOpen={() => {}} onDelete={onDeleteMock} />
        );
        fireEvent.press(getByText('Delete'));
        expect(onDeleteMock).toHaveBeenCalledWith(1);
    });
});
