import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskItem } from '../../types';

interface TaskStatisticsProps {
    tasks: TaskItem[];
}

const TaskStatistics: React.FC<TaskStatisticsProps> = ({ tasks }) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.isFinished).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.isFinished).length;
    const overdueTasks = tasks.filter(task => {
        if (!task.dueDate || task.isFinished) return false;
        return new Date(task.dueDate) < new Date();
    }).length;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task Statistics</Text>
            <View style={styles.statsGrid}>
                <View style={[styles.statCard, styles.primaryCard]}>
                    <Text style={styles.statNumber}>{totalTasks}</Text>
                    <Text style={styles.statLabel}>Total Tasks</Text>
                </View>
                <View style={[styles.statCard, styles.successCard]}>
                    <Text style={styles.statNumber}>{completedTasks}</Text>
                    <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={[styles.statCard, styles.warningCard]}>
                    <Text style={styles.statNumber}>{pendingTasks}</Text>
                    <Text style={styles.statLabel}>Pending</Text>
                </View>
                <View style={[styles.statCard, styles.infoCard]}>
                    <Text style={styles.statNumber}>{completionRate}%</Text>
                    <Text style={styles.statLabel}>Completion</Text>
                </View>
            </View>
            {highPriorityTasks > 0 && (
                <View style={styles.alertBox}>
                    <View style={styles.alertIndicator} />
                    <Text style={styles.alertText}>
                        {highPriorityTasks} high priority task{highPriorityTasks > 1 ? 's' : ''} pending
                    </Text>
                </View>
            )}
            {overdueTasks > 0 && (
                <View style={[styles.alertBox, styles.dangerAlert]}>
                    <View style={[styles.alertIndicator, styles.dangerIndicator]} />
                    <Text style={styles.alertText}>
                        {overdueTasks} task{overdueTasks > 1 ? 's' : ''} overdue!
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a1d2e',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#2d3142',
        shadowColor: '#ff6b35',
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
        color: '#ff6b35',
        letterSpacing: 2,
        fontFamily: 'monospace',
        textTransform: 'uppercase',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 12,
    },
    statCard: {
        flex: 1,
        minWidth: 70,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    primaryCard: {
        backgroundColor: '#ff6b3515',
        borderColor: '#ff6b35',
    },
    successCard: {
        backgroundColor: '#4caf5015',
        borderColor: '#4caf50',
    },
    warningCard: {
        backgroundColor: '#ffa50015',
        borderColor: '#ffa500',
    },
    infoCard: {
        backgroundColor: '#ff6b3515',
        borderColor: '#ff6b35',
    },
    statNumber: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ff6b35',
        marginBottom: 4,
        fontFamily: 'monospace',
    },
    statLabel: {
        fontSize: 11,
        color: '#b0b0b0',
        fontWeight: '700',
        fontFamily: 'monospace',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    alertBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2d3142',
        padding: 12,
        borderRadius: 6,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#ffa500',
    },
    dangerAlert: {
        backgroundColor: '#2d3142',
        borderColor: '#ff3d00',
    },
    alertIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ffa500',
        marginRight: 10,
    },
    dangerIndicator: {
        backgroundColor: '#ff3d00',
    },
    alertText: {
        fontSize: 13,
        color: '#ffffff',
        fontWeight: '700',
        flex: 1,
        fontFamily: 'monospace',
        letterSpacing: 0.5,
    },
});

export default TaskStatistics;
