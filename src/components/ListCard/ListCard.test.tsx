import React from 'react';
import { render } from '@testing-library/react-native';
import ListCard from './ListCard';

describe('ListCard', () => {
    const mockList = {
        id: 1,
        name: 'Test List',
        color: '#ffffff',
        boardId: 1,
    };

    const mockTaskForm = {
        name: '',
        description: '',
    };

    it('renders list name correctly', () => {
        const { getByText } = render(
            <ListCard
                list={mockList}
                tasks={[]}
                availableLists={[]}
                taskForm={mockTaskForm}
                onDeleteList={() => {}}
                onDeleteTask={() => {}}
                onToggleTaskFinished={() => {}}
                onToggleTaskInProgress={() => {}}
                onMoveTask={() => {}}
                onTaskFormChange={() => {}}
                onAddTask={() => {}}
            />
        );
        expect(getByText('Test List')).toBeTruthy();
    });
});
