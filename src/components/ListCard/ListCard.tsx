import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BoardList, TaskItem, NewTaskForm } from '../../types';
import TaskCard from '../TaskCard';
import TaskForm from '../TaskForm';

interface ListCardProps {
    list: BoardList;
    tasks: TaskItem[];
    availableLists: BoardList[];
    taskForm: NewTaskForm;
    onDeleteList: (listId: number) => void;
    onDeleteTask: (taskId: number) => void;
    onToggleTaskFinished: (taskId: number) => void;
    onToggleTaskInProgress: (taskId: number) => void;
    onMoveTask: (taskId: number, listId: number) => void;
    onTaskFormChange: (form: NewTaskForm) => void;
    onAddTask: () => void;
}

const ListCard: React.FC<ListCardProps> = ({
    list,
    tasks,
    availableLists,
    taskForm,
    onDeleteList,
    onDeleteTask,
    onToggleTaskFinished,
    onToggleTaskInProgress,
    onMoveTask,
    onTaskFormChange,
    onAddTask,
}) => {
    return (
        <View style={styles.listCard}>
            <View style={[styles.listHeader, { backgroundColor: list.color || '#ff6b35' }]}>
                <Text style={styles.listTitle}>{list.name}</Text>
                <TouchableOpacity onPress={() => onDeleteList(list.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.tasksContainer}>
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        availableLists={availableLists}
                        onDelete={onDeleteTask}
                        onToggleFinished={onToggleTaskFinished}
                        onToggleInProgress={onToggleTaskInProgress}
                        onMoveToList={onMoveTask}
                    />
                ))}
            </View>
            <TaskForm
                form={taskForm}
                onFormChange={onTaskFormChange}
                onSubmit={onAddTask}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listCard: {
        backgroundColor: '#1a1d2e',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#2d3142',
        shadowColor: '#ff6b35',
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    listHeader: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#2d3142',
    },
    listTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1d1d1f',
        letterSpacing: 1,
        fontFamily: 'monospace',
        textTransform: 'uppercase',
    },
    deleteText: {
        color: '#1d1d1f',
        fontWeight: '700',
        fontSize: 14,
        fontFamily: 'monospace',
        letterSpacing: 0.5,
    },
    tasksContainer: {
        padding: 16,
        gap: 12,
        backgroundColor: '#1a1d2e',
    },
});

export default ListCard;
