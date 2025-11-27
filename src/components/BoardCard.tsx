import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Board } from '../types';
import AppleButton from './AppleButton';

interface BoardCardProps {
    board: Board;
    onOpen: (boardId: number) => void;
    onDelete: (boardId: number) => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, onOpen, onDelete }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: board.thumbnailPhoto }} style={styles.thumbnail} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{board.name}</Text>
                <Text style={styles.cardDescription}>{board.description}</Text>
                <View style={styles.cardActions}>
                    <AppleButton 
                        title="Open" 
                        onPress={() => onOpen(board.id)} 
                        variant="primary" 
                    />
                    <AppleButton 
                        title="Delete" 
                        onPress={() => onDelete(board.id)} 
                        variant="danger" 
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    thumbnail: {
        height: 200,
        width: '100%',
        backgroundColor: '#e5e5ea',
    },
    cardContent: {
        padding: 20,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 6,
        color: '#1d1d1f',
        letterSpacing: -0.4,
    },
    cardDescription: {
        fontSize: 15,
        color: '#6e6e73',
        marginBottom: 16,
        lineHeight: 21,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
});

export default BoardCard;
