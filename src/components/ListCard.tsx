import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BoardList, TaskItem, NewTaskForm } from '../types';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

interface ListCardProps {
    list: BoardList;
    tasks: TaskItem[];
    availableLists: BoardList[];
    taskForm: NewTaskForm;
    onDeleteList: (listId: number) => void;
    onDeleteTask: (taskId: number) => void;
    onToggleTaskFinished: (taskId: number) => void;
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
    onMoveTask,
    onTaskFormChange,
    onAddTask,
}) => {
    return (
        <View style={styles.listCard}>
            <View style={[styles.listHeader, { backgroundColor: list.color || '#eeeeee' }]}>
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
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
    },
    listHeader: {
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1d1d1f',
        letterSpacing: -0.3,
    },
    deleteText: {
        color: '#ff3b30',
        fontWeight: '600',
        fontSize: 15,
    },
    tasksContainer: {
        padding: 16,
        gap: 12,
    },
});

export default ListCard;
