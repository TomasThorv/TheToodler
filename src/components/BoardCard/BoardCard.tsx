import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Board } from '../../types';
import AppleButton from '../AppleButton';

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
        backgroundColor: '#1a1d2e',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2d3142',
        shadowColor: '#ff6b35',
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
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
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 6,
        color: '#ff6b35',
        letterSpacing: 1,
        fontFamily: 'monospace',
        textTransform: 'uppercase',
    },
    cardDescription: {
        fontSize: 14,
        color: '#b0b0b0',
        marginBottom: 16,
        lineHeight: 22,
        fontFamily: 'monospace',
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
});

export default BoardCard;
