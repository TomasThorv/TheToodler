import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { NewListForm } from '../../types';
import AppleButton from '../AppleButton';

interface ListFormProps {
    form: NewListForm;
    onFormChange: (form: NewListForm) => void;
    onSubmit: () => void;
}

const ListForm: React.FC<ListFormProps> = ({ form, onFormChange, onSubmit }) => {
    return (
        <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Create a new list</Text>
            <TextInput
                placeholder="List name"
                value={form.name}
                onChangeText={(text) => onFormChange({ ...form, name: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Color (e.g. #ff0000)"
                value={form.color}
                onChangeText={(text) => onFormChange({ ...form, color: text })}
                style={styles.input}
            />
            <AppleButton title="Add List" onPress={onSubmit} variant="primary" />
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#1a1d2e',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2d3142',
        shadowColor: '#ff6b35',
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        color: '#ff6b35',
        letterSpacing: 1,
        fontFamily: 'monospace',
        textTransform: 'uppercase',
    },
    input: {
        borderWidth: 1,
        borderColor: '#2d3142',
        borderRadius: 6,
        padding: 14,
        backgroundColor: '#0f1116',
        fontSize: 14,
        marginBottom: 12,
        color: '#ffffff',
        fontFamily: 'monospace',
    },
});

export default ListForm;
