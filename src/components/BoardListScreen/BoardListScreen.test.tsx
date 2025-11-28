import React from 'react';
import { render } from '@testing-library/react-native';
import BoardListScreen from './BoardListScreen';

describe('BoardListScreen', () => {
    const mockForm = {
        name: '',
        description: '',
        thumbnailPhoto: '',
    };

    it('renders title correctly', () => {
        const { getByText } = render(
            <BoardListScreen
                boards={[]}
                boardForm={mockForm}
                onOpenBoard={() => {}}
                onDeleteBoard={() => {}}
                onBoardFormChange={() => {}}
                onAddBoard={() => {}}
            />
        );
        expect(getByText('Your Boards')).toBeTruthy();
    });
});
