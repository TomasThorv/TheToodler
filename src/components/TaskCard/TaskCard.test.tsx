import React from 'react';
import { render } from '@testing-library/react-native';
import TaskCard from './TaskCard';

const mockTask = {
    id: 1,
    name: 'Test Task',
    description: 'Test Description',
    isFinished: false,
    listId: 1,
};

describe('TaskCard', () => {
    it('renders task information correctly', () => {
        const { getByText } = render(
            <TaskCard
                task={mockTask}
                availableLists={[]}
                onDelete={() => { }}
                onToggleFinished={() => { }}
                onToggleInProgress={() => { }}
                onMoveToList={() => { }}
            />
        );
        expect(getByText('Test Task')).toBeTruthy();
        expect(getByText('Test Description')).toBeTruthy();
    });
});
