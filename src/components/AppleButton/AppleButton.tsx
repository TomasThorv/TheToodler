import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AppleButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    color?: string;
}

const AppleButton: React.FC<AppleButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    color
}) => {
    const buttonStyle = variant === 'primary'
        ? styles.primary
        : variant === 'danger'
            ? styles.danger
            : styles.secondary;

    const textStyle = variant === 'secondary'
        ? styles.secondaryText
        : styles.primaryText;

    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle, color && { backgroundColor: color }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginRight: 8,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    primary: {
        backgroundColor: '#ff6b35',
    },
    secondary: {
        backgroundColor: '#2d3142',
    },
    danger: {
        backgroundColor: '#ff3d00',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1,
        fontFamily: 'monospace',
        textTransform: 'uppercase',
    },
    primaryText: {
        color: '#ffffff',
    },
    secondaryText: {
        color: '#ff6b35',
    },
});

export default AppleButton;
