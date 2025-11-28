import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    value, 
    onChangeText, 
    placeholder = 'Search tasks...' 
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#6e6e73"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#f5f5f7',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: '#1d1d1f',
    },
});

export default SearchBar;
