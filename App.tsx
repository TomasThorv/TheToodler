import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import initialData from './data.json';
import { useAppState } from './src/hooks/useAppState';
import BoardListScreen from './src/components/BoardListScreen';
import BoardDetailScreen from './src/components/BoardDetailScreen';

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
    } = useAppState(initialData.boards, initialData.lists, initialData.tasks);

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
        backgroundColor: '#f5f5f7',
    },
});