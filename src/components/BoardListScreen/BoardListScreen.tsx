import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Board, NewBoardForm } from '../../types';
import BoardCard from '../BoardCard';
import BoardForm from '../BoardForm';

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
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 24,
        color: '#ff6b35',
        letterSpacing: 2,
        fontFamily: 'monospace',
        textTransform: 'uppercase',
    },
});

export default BoardListScreen;
