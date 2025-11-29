import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { NewTaskForm } from '../../types';
import AppleButton from '../AppleButton';

interface TaskFormProps {
    form: NewTaskForm;
    onFormChange: (form: NewTaskForm) => void;
    onSubmit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ form, onFormChange, onSubmit }) => {
    const priorities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
    const [dateError, setDateError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);

    return (
        <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Add task</Text>
            <TextInput
                placeholder="Task name"
                value={form.name}
                onChangeText={(text) => {
                    onFormChange({ ...form, name: text });
                    if (text && text.trim() !== '') {
                        setNameError(null);
                    }
                }}
                style={[styles.input, nameError && styles.inputError]}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            <TextInput
                placeholder="Task description"
                value={form.description}
                onChangeText={(text) => onFormChange({ ...form, description: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Due date (YYYY-MM-DD)"
                value={form.dueDate || ''}
                onChangeText={(text) => {
                    onFormChange({ ...form, dueDate: text });
                    if (!text) {
                        setDateError(null);
                        return;
                    }
                    if (!isValidDate(text)) {
                        setDateError('Invalid date — use YYYY-MM-DD');
                    } else {
                        setDateError(null);
                    }
                }}
                style={[styles.input, dateError && styles.inputError]}
                onBlur={() => {
                    if (form.dueDate && !isValidDate(form.dueDate)) {
                        setDateError('Invalid date — use YYYY-MM-DD');
                    }
                }}
            />
            {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
            <View style={styles.priorityContainer}>
                <Text style={styles.priorityLabel}>Priority:</Text>
                <View style={styles.priorityButtons}>
                    {priorities.map((priority) => (
                        <TouchableOpacity
                            key={priority}
                            style={[
                                styles.priorityButton,
                                form.priority === priority && styles[`${priority}Priority`],
                            ]}
                            onPress={() => onFormChange({ ...form, priority })}
                        >
                            <Text
                                style={[
                                    styles.priorityButtonText,
                                    form.priority === priority && styles.priorityButtonTextActive,
                                ]}
                            >
                                {priority.charAt(0).toUpperCase() + priority.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <AppleButton
                title="Add Task"
                onPress={() => {
                    if (!form.name || form.name.trim() === '') {
                        setNameError('Please enter a task name');
                        return;
                    }
                    if (form.dueDate && !isValidDate(form.dueDate)) {
                        setDateError('Invalid date — use YYYY-MM-DD');
                        return;
                    }
                    setNameError(null);
                    setDateError(null);
                    onSubmit();
                }}
                variant="primary"
            />
        </View>
    );
};

function isValidDate(dateStr: string): boolean {
    if (!dateStr) return true;
    const re = /^\d{4}-\d{2}-\d{2}$/;
    if (!re.test(dateStr)) return false;
    const [yStr, mStr, dStr] = dateStr.split('-');
    const y = Number(yStr);
    const m = Number(mStr);
    const d = Number(dStr);
    if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return false;
    if (m < 1 || m > 12) return false;
    const dt = new Date(y, m - 1, d);
    return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

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
    priorityContainer: {
        marginBottom: 12,
    },
    priorityLabel: {
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 8,
        color: '#ff6b35',
        fontFamily: 'monospace',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    priorityButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    priorityButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 6,
        backgroundColor: '#2d3142',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3d4152',
    },
    lowPriority: {
        backgroundColor: '#ffa50020',
        borderColor: '#ffa500',
    },
    mediumPriority: {
        backgroundColor: '#ff6b3520',
        borderColor: '#ff6b35',
    },
    highPriority: {
        backgroundColor: '#ff3d0020',
        borderColor: '#ff3d00',
    },
    priorityButtonText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#9e9e9e',
        fontFamily: 'monospace',
        letterSpacing: 0.5,
    },
    priorityButtonTextActive: {
        color: '#ffffff',
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
});

export default TaskForm;
