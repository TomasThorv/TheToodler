import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Board, BoardList, TaskItem, NewListForm, NewTaskForm } from '../types';
import AppleButton from './AppleButton';
import ListForm from './ListForm';
import ListCard from './ListCard';

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
    onMoveTask,
    onTaskFormChange,
    onAddTask,
}) => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerRow}>
                <AppleButton title="← Boards" onPress={onBack} variant="secondary" />
                <Text style={styles.title}>{board.name}</Text>
            </View>
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
                    taskForm={taskForms[list.id] || { name: '', description: '' }}
                    onDeleteList={onDeleteList}
                    onDeleteTask={onDeleteTask}
                    onToggleTaskFinished={onToggleTaskFinished}
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
        fontSize: 34,
        fontWeight: '700',
        color: '#1d1d1f',
        letterSpacing: -0.5,
    },
});

export default BoardDetailScreen;
