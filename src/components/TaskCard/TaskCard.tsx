import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { TaskItem, BoardList } from '../../types';

interface TaskCardProps {
    task: TaskItem;
    availableLists: BoardList[];
    onDelete: (taskId: number) => void;
    onToggleFinished: (taskId: number) => void;
    onToggleInProgress: (taskId: number) => void;
    onMoveToList: (taskId: number, listId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
    task,
    availableLists,
    onDelete,
    onToggleFinished,
    onToggleInProgress,
    onMoveToList,
}) => {
    const getPriorityColor = () => {
        switch (task.priority) {
            case 'high': return '#ff3d00';
            case 'medium': return '#ff6b35';
            case 'low': return '#ffa500';
            default: return '#9e9e9e';
        }
    };

    const isOverdue = task.dueDate && !task.isFinished && new Date(task.dueDate) < new Date();

    return (
        <View style={[styles.taskCard, task.isFinished && styles.completedCard, task.inProgress && styles.inProgressCard, isOverdue && styles.overdueCard]}>
            <View style={styles.taskHeader}>
                <View style={styles.taskTitleRow}>
                    <Text style={[styles.taskTitle, task.isFinished && styles.completedTitle]}>{task.name}</Text>
                    {task.priority && (
                        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor() + '20' }]}>
                            <Text style={[styles.priorityText, { color: getPriorityColor() }]}>
                                {task.priority.toUpperCase()}
                            </Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity onPress={() => onDelete(task.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.taskDescription, task.isFinished && styles.completedText]}>{task.description}</Text>
            {task.dueDate && (
                <Text style={[styles.dueDateText, isOverdue && styles.overdueText, task.isFinished && styles.completedText]}>
                    Due: {new Date(task.dueDate).toLocaleDateString()} {isOverdue && !task.isFinished && '(Overdue)'}
                </Text>
            )}
            <View style={styles.statusSection}>
                <Text style={styles.statusLabel}>Status:</Text>
                <View style={styles.statusButtons}>
                    <TouchableOpacity
                        style={[styles.statusButton, !task.inProgress && !task.isFinished && styles.statusButtonActive]}
                        onPress={() => {
                            if (task.inProgress || task.isFinished) {
                                onToggleInProgress(task.id);
                                if (task.isFinished) onToggleFinished(task.id);
                            }
                        }}
                    >
                        <View style={[styles.statusIndicator, !task.inProgress && !task.isFinished && styles.pendingIndicator]} />
                        <Text style={[styles.statusButtonText, !task.inProgress && !task.isFinished && styles.statusButtonTextActive]}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.statusButton, task.inProgress && !task.isFinished && styles.statusButtonActive]}
                        onPress={() => onToggleInProgress(task.id)}
                    >
                        <View style={[styles.statusIndicator, task.inProgress && !task.isFinished && styles.inProgressIndicator]} />
                        <Text style={[styles.statusButtonText, task.inProgress && !task.isFinished && styles.statusButtonTextActive]}>In Progress</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.statusButton, task.isFinished && styles.statusButtonActive]}
                        onPress={() => onToggleFinished(task.id)}
                    >
                        <View style={[styles.statusIndicator, task.isFinished && styles.completedIndicator]} />
                        <Text style={[styles.statusButtonText, task.isFinished && styles.statusButtonTextActive]}>Completed</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.taskFooter}>
                <Text style={styles.moveLabel}>Move to:</Text>
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
        backgroundColor: '#1a1d2e',
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: '#2d3142',
        shadowColor: '#ff6b35',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    completedCard: {
        backgroundColor: '#151823',
        opacity: 0.7,
    },
    inProgressCard: {
        borderLeftWidth: 4,
        borderLeftColor: '#ff6b35',
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    taskTitleRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
    },
    taskTitle: {
        fontWeight: '700',
        fontSize: 16,
        color: '#ffffff',
        letterSpacing: 0.5,
        fontFamily: 'monospace',
    },
    completedTitle: {
        textDecorationLine: 'line-through',
        color: '#6e6e73',
    },
    completedText: {
        color: '#6e6e73',
    },
    priorityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    priorityText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    dueDateText: {
        fontSize: 12,
        color: '#9e9e9e',
        marginTop: 8,
        marginBottom: 4,
        fontFamily: 'monospace',
        letterSpacing: 0.5,
    },
    overdueText: {
        color: '#ff3d00',
        fontWeight: '700',
    },
    overdueCard: {
        borderWidth: 2,
        borderColor: '#ff3d00',
    },
    deleteText: {
        color: '#ff3d00',
        fontWeight: '700',
        fontSize: 14,
        fontFamily: 'monospace',
        letterSpacing: 0.5,
    },
    taskDescription: {
        marginTop: 4,
        color: '#b0b0b0',
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 12,
        fontFamily: 'monospace',
    },
    statusSection: {
        marginTop: 12,
        marginBottom: 8,
    },
    statusLabel: {
        fontSize: 12,
        color: '#ff6b35',
        fontWeight: '700',
        marginBottom: 8,
        fontFamily: 'monospace',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    statusButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    statusButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 6,
        backgroundColor: '#2d3142',
        borderWidth: 1,
        borderColor: '#3d4152',
        gap: 6,
    },
    statusButtonActive: {
        backgroundColor: '#ff6b3520',
        borderColor: '#ff6b35',
    },
    statusButtonText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#9e9e9e',
        fontFamily: 'monospace',
        letterSpacing: 0.5,
    },
    statusButtonTextActive: {
        color: '#ff6b35',
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3d4152',
    },
    pendingIndicator: {
        backgroundColor: '#ffa500',
    },
    inProgressIndicator: {
        backgroundColor: '#ff6b35',
    },
    completedIndicator: {
        backgroundColor: '#4caf50',
    },
    taskFooter: {
        marginTop: 12,
        gap: 6,
    },
    moveLabel: {
        fontSize: 12,
        color: '#ff6b35',
        fontWeight: '700',
        fontFamily: 'monospace',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    moveRow: {
        flexGrow: 0,
        paddingVertical: 4,
    },
    moveButton: {
        backgroundColor: '#2d3142',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 6,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ff6b35',
    },
    moveButtonText: {
        color: '#ff6b35',
        fontWeight: '700',
        fontSize: 12,
        fontFamily: 'monospace',
        letterSpacing: 0.5,
    },
});

export default TaskCard;
