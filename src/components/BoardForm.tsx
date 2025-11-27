import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { NewBoardForm } from '../types';
import AppleButton from './AppleButton';

interface BoardFormProps {
    form: NewBoardForm;
    onFormChange: (form: NewBoardForm) => void;
    onSubmit: () => void;
}

const BoardForm: React.FC<BoardFormProps> = ({ form, onFormChange, onSubmit }) => {
    return (
        <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Create a new board</Text>
            <TextInput
                placeholder="Board name"
                value={form.name}
                onChangeText={(text) => onFormChange({ ...form, name: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Description"
                value={form.description}
                onChangeText={(text) => onFormChange({ ...form, description: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Thumbnail URL"
                value={form.thumbnailPhoto}
                onChangeText={(text) => onFormChange({ ...form, thumbnailPhoto: text })}
                style={styles.input}
            />
            <AppleButton title="Add Board" onPress={onSubmit} variant="primary" />
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 18,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 12,
        color: '#1d1d1f',
        letterSpacing: -0.3,
    },
    input: {
        borderWidth: 0,
        borderRadius: 12,
        padding: 14,
        backgroundColor: '#f5f5f7',
        fontSize: 16,
        marginBottom: 12,
        color: '#1d1d1f',
    },
});

export default BoardForm;
