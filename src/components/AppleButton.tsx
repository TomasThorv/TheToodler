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
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
    },
    primary: {
        backgroundColor: '#007aff',
    },
    secondary: {
        backgroundColor: '#f5f5f7',
    },
    danger: {
        backgroundColor: '#ff3b30',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: -0.2,
    },
    primaryText: {
        color: '#ffffff',
    },
    secondaryText: {
        color: '#007aff',
    },
});

export default AppleButton;
