import React from 'react';
import { render } from '@testing-library/react-native';
import TaskForm from './TaskForm';

describe('TaskForm', () => {
    const mockForm = {
        name: '',
        description: '',
    };

    it('renders all input fields', () => {
        const { getByPlaceholderText } = render(
            <TaskForm form={mockForm} onFormChange={() => {}} onSubmit={() => {}} />
        );
        expect(getByPlaceholderText('Task name')).toBeTruthy();
        expect(getByPlaceholderText('Task description')).toBeTruthy();
    });
});
