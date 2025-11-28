import React from 'react';
import { render } from '@testing-library/react-native';
import BoardDetailScreen from './BoardDetailScreen';

describe('BoardDetailScreen', () => {
    const mockBoard = {
        id: 1,
        name: 'Test Board',
        description: 'Test Description',
        thumbnailPhoto: 'https://example.com/image.jpg',
    };

    const mockListForm = {
        name: '',
        color: '#cccccc',
    };

    it('renders board name correctly', () => {
        const { getByText } = render(
            <BoardDetailScreen
                board={mockBoard}
                lists={[]}
                tasksByList={{}}
                listForm={mockListForm}
                taskForms={{}}
                onBack={() => {}}
                onListFormChange={() => {}}
                onAddList={() => {}}
                onDeleteList={() => {}}
                onDeleteTask={() => {}}
                onToggleTaskFinished={() => {}}
                onMoveTask={() => {}}
                onTaskFormChange={() => {}}
                onAddTask={() => {}}
            />
        );
        expect(getByText('Test Board')).toBeTruthy();
    });
});
