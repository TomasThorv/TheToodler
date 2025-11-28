import React from 'react';
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

    return (
        <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Add task</Text>
            <TextInput
                placeholder="Task name"
                value={form.name}
                onChangeText={(text) => onFormChange({ ...form, name: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Task description"
                value={form.description}
                onChangeText={(text) => onFormChange({ ...form, description: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Due date (YYYY-MM-DD)"
                value={form.dueDate || ''}
                onChangeText={(text) => onFormChange({ ...form, dueDate: text })}
                style={styles.input}
            />
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
            <AppleButton title="Add Task" onPress={onSubmit} variant="primary" />
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
});

export default TaskForm;
