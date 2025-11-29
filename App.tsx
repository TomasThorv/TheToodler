import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import initialData from './data.json';
import { TaskItem } from './src/types';
import { useAppState } from './src/hooks/useAppState';
import BoardListScreen from './src/components/BoardListScreen/BoardListScreen';
import BoardDetailScreen from './src/components/BoardDetailScreen/BoardDetailScreen';

export default function App() {
    const {
        boards,
        selectedBoardId,
        selectedBoard,
        listsForBoard,
        tasksByList,
        boardForm,
        listForm,
        taskForm,
        setSelectedBoardId,
        setBoardForm,
        setListForm,
        updateTaskForm,
        addBoard,
        deleteBoard,
        addList,
        deleteList,
        addTask,
        deleteTask,
        moveTaskToList,
        toggleTaskFinished,
        toggleTaskInProgress,
    } = useAppState(
        initialData.boards,
        initialData.lists,
        // JSON import types "priority" as string; narrow to TaskItem[] for TS
        initialData.tasks as unknown as TaskItem[]
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            {selectedBoardId && selectedBoard ? (
                <BoardDetailScreen
                    board={selectedBoard}
                    lists={listsForBoard}
                    tasksByList={tasksByList}
                    listForm={listForm}
                    taskForms={taskForm}
                    onBack={() => setSelectedBoardId(null)}
                    onListFormChange={setListForm}
                    onAddList={addList}
                    onDeleteList={deleteList}
                    onDeleteTask={deleteTask}
                    onToggleTaskFinished={toggleTaskFinished}
                    onToggleTaskInProgress={toggleTaskInProgress}
                    onMoveTask={moveTaskToList}
                    onTaskFormChange={updateTaskForm}
                    onAddTask={addTask}
                />
            ) : (
                <BoardListScreen
                    boards={boards}
                    boardForm={boardForm}
                    onOpenBoard={setSelectedBoardId}
                    onDeleteBoard={deleteBoard}
                    onBoardFormChange={setBoardForm}
                    onAddBoard={addBoard}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f1116',
    },
});