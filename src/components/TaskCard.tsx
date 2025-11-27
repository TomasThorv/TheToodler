import React from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, StyleSheet } from 'react-native';
import { TaskItem, BoardList } from '../types';

interface TaskCardProps {
    task: TaskItem;
    availableLists: BoardList[];
    onDelete: (taskId: number) => void;
    onToggleFinished: (taskId: number) => void;
    onMoveToList: (taskId: number, listId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
    task,
    availableLists,
    onDelete,
    onToggleFinished,
    onMoveToList,
}) => {
    return (
        <View style={styles.taskCard}>
            <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{task.name}</Text>
                <TouchableOpacity onPress={() => onDelete(task.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.taskDescription}>{task.description}</Text>
            <View style={styles.taskFooter}>
                <View style={styles.switchRow}>
                    <Text>Finished</Text>
                    <Switch 
                        value={task.isFinished} 
                        onValueChange={() => onToggleFinished(task.id)} 
                    />
                </View>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.moveRow}
                >
                    {availableLists.map((list) => (
                        <TouchableOpacity
                            key={list.id}
                            style={styles.moveButton}
                            onPress={() => onMoveToList(task.id, list.id)}
                        >
                            <Text style={styles.moveButtonText}>{list.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskCard: {
        backgroundColor: '#f9f9fb',
        borderRadius: 16,
        padding: 16,
        borderWidth: 0,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    taskTitle: {
        fontWeight: '600',
        fontSize: 16,
        color: '#1d1d1f',
        letterSpacing: -0.2,
        flex: 1,
    },
    deleteText: {
        color: '#ff3b30',
        fontWeight: '600',
        fontSize: 15,
    },
    taskDescription: {
        marginTop: 4,
        color: '#6e6e73',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    taskFooter: {
        marginTop: 8,
        gap: 10,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    moveRow: {
        flexGrow: 0,
        paddingVertical: 4,
    },
    moveButton: {
        backgroundColor: '#007aff',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
    },
    moveButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 14,
        letterSpacing: -0.1,
    },
});

export default TaskCard;
