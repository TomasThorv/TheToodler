import { Board, BoardList, TaskItem } from '../types';

export const generateId = (items: { id: number }[]): number => {
    return Math.max(0, ...items.map((item) => item.id)) + 1;
};

export const getTasksForBoard = (
    tasks: TaskItem[],
    lists: BoardList[],
    boardId: number
): TaskItem[] => {
    const listIds = lists.filter((list) => list.boardId === boardId).map((list) => list.id);
    return tasks.filter((task) => listIds.includes(task.listId));
};

export const groupTasksByList = (
    tasks: TaskItem[],
    lists: BoardList[]
): Record<number, TaskItem[]> => {
    const grouped: Record<number, TaskItem[]> = {};
    lists.forEach((list) => {
        grouped[list.id] = tasks.filter((task) => task.listId === list.id);
    });
    return grouped;
};
