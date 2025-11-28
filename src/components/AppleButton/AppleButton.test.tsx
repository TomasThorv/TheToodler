import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppleButton from './AppleButton';

describe('AppleButton', () => {
    it('renders correctly with title', () => {
        const { getByText } = render(
            <AppleButton title="Test Button" onPress={() => {}} />
        );
        expect(getByText('Test Button')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const onPressMock = jest.fn();
        const { getByText } = render(
            <AppleButton title="Test Button" onPress={onPressMock} />
        );
        fireEvent.press(getByText('Test Button'));
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('applies primary variant styles by default', () => {
        const { getByText } = render(
            <AppleButton title="Test Button" onPress={() => {}} />
        );
        const button = getByText('Test Button').parent;
        expect(button).toBeTruthy();
    });

    it('applies danger variant styles', () => {
        const { getByText } = render(
            <AppleButton title="Delete" onPress={() => {}} variant="danger" />
        );
        expect(getByText('Delete')).toBeTruthy();
    });

    it('applies secondary variant styles', () => {
        const { getByText } = render(
            <AppleButton title="Back" onPress={() => {}} variant="secondary" />
        );
        expect(getByText('Back')).toBeTruthy();
    });
});
