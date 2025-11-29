import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { NewBoardForm } from '../../types';
import AppleButton from '../AppleButton';

interface BoardFormProps {
    form: NewBoardForm;
    onFormChange: (form: NewBoardForm) => void;
    onSubmit: () => void;
}

const BoardForm: React.FC<BoardFormProps> = ({ form, onFormChange, onSubmit }) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.formContainer}>
            <TouchableOpacity style={styles.formHeader} onPress={() => setOpen((s) => !s)}>
                <Text style={styles.chevron}>{open ? '▾' : '▸'}</Text>
                <Text style={styles.sectionTitle}>Create a new board</Text>
            </TouchableOpacity>

            {open && (
                <>
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
                </>
            )}
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
        color: '#ff6b35',
        letterSpacing: 1,
        fontFamily: 'monospace',
        textTransform: 'uppercase',
    },
    formHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    chevron: {
        fontSize: 18,
        marginRight: 8,
        color: '#ff6b35',
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

export default BoardForm;
