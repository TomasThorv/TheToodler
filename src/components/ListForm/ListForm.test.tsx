import React from 'react';
import { render } from '@testing-library/react-native';
import ListForm from './ListForm';

describe('ListForm', () => {
    const mockForm = {
        name: '',
        color: '#cccccc',
    };

    it('renders all input fields', () => {
        const { getByPlaceholderText } = render(
            <ListForm form={mockForm} onFormChange={() => {}} onSubmit={() => {}} />
        );
        expect(getByPlaceholderText('List name')).toBeTruthy();
        expect(getByPlaceholderText('Color (e.g. #ff0000)')).toBeTruthy();
    });
});
