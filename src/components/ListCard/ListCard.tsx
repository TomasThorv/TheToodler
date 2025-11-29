import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BoardList, TaskItem, NewTaskForm } from '../../types';
import TaskCard from '../TaskCard';
import TaskForm from '../TaskForm';

interface ListCardProps {
    list: BoardList;
    tasks: TaskItem[];
    availableLists: BoardList[];
    taskForm: NewTaskForm;
    onDeleteList: (listId: number) => void;
    onDeleteTask: (taskId: number) => void;
    onToggleTaskFinished: (taskId: number) => void;
    onToggleTaskInProgress: (taskId: number) => void;
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
    onToggleTaskInProgress,
    onMoveTask,
    onTaskFormChange,
    onAddTask,
}) => {
    const [expanded, setExpanded] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    return (
        <View style={styles.listCard}>
            <View style={[styles.listHeader, { backgroundColor: list.color || '#ff6b35' }]}>
                <TouchableOpacity
                    onPress={() => setExpanded((s) => {
                        const next = !s;
                        if (!next) setAddOpen(false);
                        return next;
                    })}
                    style={styles.titleContainer}
                >
                    <Text style={styles.chevron}>{expanded ? '▾' : '▸'}</Text>
                    <Text style={styles.listTitle}>{list.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDeleteList(list.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>

            {expanded && (
                <>
                    <View style={styles.tasksContainer}>
                        {tasks.length === 0 ? (
                            <Text style={styles.emptyText}>No tasks in this list</Text>
                        ) : (
                            tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    availableLists={availableLists}
                                    onDelete={onDeleteTask}
                                    onToggleFinished={onToggleTaskFinished}
                                    onToggleInProgress={onToggleTaskInProgress}
                                    onMoveToList={onMoveTask}
                                />
                            ))
                        )}
                    </View>
                    <TouchableOpacity
                        style={styles.addToggle}
                        onPress={() => setAddOpen((s) => !s)}
                    >
                        <Text style={styles.addArrow}>{addOpen ? '▾' : '▸'}</Text>
                        <View style={styles.addLeft}>
                            <Text style={styles.chevron}>{addOpen ? '▾' : '▸'}</Text>
                            <Text style={styles.addToggleText}>ADD TASK</Text>
                        </View>
                    </TouchableOpacity>

                    {addOpen && (
                        <TaskForm
                            form={taskForm}
                            onFormChange={onTaskFormChange}
                            onSubmit={onAddTask}
                        />
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    listCard: {
        backgroundColor: '#1a1d2e',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#2d3142',
        shadowColor: '#ff6b35',
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    listHeader: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#2d3142',
    },
    listTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1d1d1f',
        letterSpacing: 1,
        fontFamily: 'monospace',
        textTransform: 'uppercase',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    chevron: {
        fontSize: 18,
        marginRight: 8,
        color: '#1d1d1f',
    },
    deleteText: {
        color: '#1d1d1f',
        fontWeight: '700',
        fontSize: 14,
        fontFamily: 'monospace',
        letterSpacing: 0.5,
    },
    addToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#2d3142',
        backgroundColor: '#151726',
    },
    addLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addArrow: {
        color: '#cfcfd1',
        fontSize: 22,
        fontWeight: '700',
        marginLeft: 12,
    },
    addToggleText: {
        color: '#cfcfd1',
        fontWeight: '700',
        fontSize: 14,
        fontFamily: 'monospace',
        letterSpacing: 0.5,
    },
    tasksContainer: {
        padding: 16,
        gap: 12,
        backgroundColor: '#1a1d2e',
    },
    emptyText: {
        color: '#9e9e9e',
        fontSize: 14,
        fontFamily: 'monospace',
        paddingVertical: 8,
    },
});

export default ListCard;
