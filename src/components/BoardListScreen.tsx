import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Board, NewBoardForm } from '../types';
import BoardCard from './BoardCard';
import BoardForm from './BoardForm';

interface BoardListScreenProps {
    boards: Board[];
    boardForm: NewBoardForm;
    onOpenBoard: (boardId: number) => void;
    onDeleteBoard: (boardId: number) => void;
    onBoardFormChange: (form: NewBoardForm) => void;
    onAddBoard: () => void;
}

const BoardListScreen: React.FC<BoardListScreenProps> = ({
    boards,
    boardForm,
    onOpenBoard,
    onDeleteBoard,
    onBoardFormChange,
    onAddBoard,
}) => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Your Boards</Text>
            {boards.map((board) => (
                <BoardCard
                    key={board.id}
                    board={board}
                    onOpen={onOpenBoard}
                    onDelete={onDeleteBoard}
                />
            ))}
            <BoardForm
                form={boardForm}
                onFormChange={onBoardFormChange}
                onSubmit={onAddBoard}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: 24,
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        marginBottom: 20,
        color: '#1d1d1f',
        letterSpacing: -0.5,
    },
});

export default BoardListScreen;
