import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { NewListForm } from '../../types';
import AppleButton from '../AppleButton';

interface ListFormProps {
    form: NewListForm;
    onFormChange: (form: NewListForm) => void;
    onSubmit: () => void;
}

const ListForm: React.FC<ListFormProps> = ({ form, onFormChange, onSubmit }) => {
    const [nameError, setNameError] = useState<string | null>(null);
    return (
        <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Create a new list</Text>
            <TextInput
                placeholder="List name"
                value={form.name}
                onChangeText={(text) => {
                    onFormChange({ ...form, name: text });
                    if (text && text.trim() !== '') setNameError(null);
                }}
                style={[styles.input, nameError && styles.inputError]}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            <View style={styles.colorInputContainer}>
                <TextInput
                    placeholder="Color (e.g. #ff0000)"
                    value={form.color}
                    onChangeText={(text) => onFormChange({ ...form, color: text })}
                    style={styles.colorTextInput}
                    placeholderTextColor="#9e9e9e"
                />
                <View style={styles.colorPreviewWrapper}>
                    <View
                        style={[
                            styles.colorPreview,
                            { backgroundColor: normalizeColor(form.color) },
                        ]}
                    />
                    <Text style={styles.colorValueText}>{form.color || '#ffffff'}</Text>
                </View>
            </View>
            <AppleButton
                title="Add List"
                onPress={() => {
                    if (!form.name || form.name.trim() === '') {
                        setNameError('Please enter a list name');
                        return;
                    }
                    setNameError(null);
                    onSubmit();
                }}
                variant="primary"
            />
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
    inputError: {
        borderColor: '#ff3d00',
        backgroundColor: '#1b0f0f',
    },
    errorText: {
        color: '#ff3d00',
        fontSize: 12,
        marginBottom: 8,
        fontFamily: 'monospace',
    },
    colorInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2d3142',
        borderRadius: 6,
        paddingHorizontal: 8,
        backgroundColor: '#0f1116',
        marginBottom: 12,
    },
    colorTextInput: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 6,
        color: '#ffffff',
        fontFamily: 'monospace',
        fontSize: 14,
    },
    colorPreviewWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    colorPreview: {
        width: 22,
        height: 22,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#3d4152',
    },
    colorValueText: {
        color: '#ffffff',
        fontFamily: 'monospace',
        fontSize: 12,
        marginLeft: 8,
    },
});

function normalizeColor(value: string | undefined): string {
    if (!value) return 'transparent';
    const v = value.trim();
    const hexRe = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    if (hexRe.test(v)) return v;
    return 'transparent';
}

export default ListForm;
