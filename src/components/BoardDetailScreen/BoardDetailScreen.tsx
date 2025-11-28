import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Board, BoardList, TaskItem, NewListForm, NewTaskForm } from '../../types';
import AppleButton from '../AppleButton';
import ListForm from '../ListForm';
import ListCard from '../ListCard';
import TaskStatistics from '../TaskStatistics';

interface BoardDetailScreenProps {
    board: Board;
    lists: BoardList[];
    tasksByList: Record<number, TaskItem[]>;
    listForm: NewListForm;
    taskForms: Record<number, NewTaskForm>;
    onBack: () => void;
    onListFormChange: (form: NewListForm) => void;
    onAddList: () => void;
    onDeleteList: (listId: number) => void;
    onDeleteTask: (taskId: number) => void;
    onToggleTaskFinished: (taskId: number) => void;
    onToggleTaskInProgress: (taskId: number) => void;
    onMoveTask: (taskId: number, listId: number) => void;
    onTaskFormChange: (listId: number, form: NewTaskForm) => void;
    onAddTask: (listId: number) => void;
}

const BoardDetailScreen: React.FC<BoardDetailScreenProps> = ({
    board,
    lists,
    tasksByList,
    listForm,
    taskForms,
    onBack,
    onListFormChange,
    onAddList,
    onDeleteList,
    onDeleteTask,
    onToggleTaskFinished,
    onToggleTaskInProgress,
    onMoveTask,
    onTaskFormChange,
    onAddTask,
}) => {
    const allBoardTasks = lists.reduce((acc, list) => {
        return [...acc, ...(tasksByList[list.id] || [])];
    }, [] as TaskItem[]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerRow}>
                <AppleButton title="← Boards" onPress={onBack} variant="secondary" />
                <Text style={styles.title}>{board.name}</Text>
            </View>
            <TaskStatistics tasks={allBoardTasks} />
            <ListForm
                form={listForm}
                onFormChange={onListFormChange}
                onSubmit={onAddList}
            />
            {lists.map((list) => (
                <ListCard
                    key={list.id}
                    list={list}
                    tasks={tasksByList[list.id] || []}
                    availableLists={lists.filter((l) => l.id !== list.id)}
                    taskForm={taskForms[list.id] || { name: '', description: '', priority: 'medium', dueDate: '' }}
                    onDeleteList={onDeleteList}
                    onDeleteTask={onDeleteTask}
                    onToggleTaskFinished={onToggleTaskFinished}
                    onToggleTaskInProgress={onToggleTaskInProgress}
                    onMoveTask={onMoveTask}
                    onTaskFormChange={(form) => onTaskFormChange(list.id, form)}
                    onAddTask={() => onAddTask(list.id)}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: 24,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ff6b35',
        letterSpacing: 2,
        fontFamily: 'monospace',
        textTransform: 'uppercase',
    },
});

export default BoardDetailScreen;
