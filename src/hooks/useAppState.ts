import { useState, useMemo } from 'react';
import { Board, BoardList, TaskItem, NewBoardForm, NewListForm, NewTaskForm } from '../types';
import { generateId, groupTasksByList } from '../utils/helpers';

export const useAppState = (initialBoards: Board[], initialLists: BoardList[], initialTasks: TaskItem[]) => {
    const [boards, setBoards] = useState<Board[]>(initialBoards);
    const [lists, setLists] = useState<BoardList[]>(initialLists);
    const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
    const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
    const [boardForm, setBoardForm] = useState<NewBoardForm>({
        name: '',
        description: '',
        thumbnailPhoto: '',
    });
    const [listForm, setListForm] = useState<NewListForm>({ 
        name: '', 
        color: '#cccccc' 
    });
    const [taskForm, setTaskForm] = useState<Record<number, NewTaskForm>>({});

    const selectedBoard = useMemo(
        () => boards.find((board) => board.id === selectedBoardId) || null,
        [boards, selectedBoardId]
    );

    const listsForBoard = useMemo(
        () => lists.filter((list) => list.boardId === selectedBoardId),
        [lists, selectedBoardId]
    );

    const tasksByList = useMemo(() => {
        return groupTasksByList(tasks, listsForBoard);
    }, [listsForBoard, tasks]);

    const addBoard = () => {
        if (!boardForm.name.trim() || !boardForm.thumbnailPhoto.trim()) {
            return;
        }
        const newBoard: Board = {
            id: generateId(boards),
            name: boardForm.name.trim(),
            description: boardForm.description.trim(),
            thumbnailPhoto: boardForm.thumbnailPhoto.trim(),
        };
        setBoards((prev) => [...prev, newBoard]);
        setBoardForm({ name: '', description: '', thumbnailPhoto: '' });
    };

    const deleteBoard = (boardId: number) => {
        setBoards((prev) => prev.filter((board) => board.id !== boardId));
        setLists((prev) => prev.filter((list) => list.boardId !== boardId));
        setTasks((prev) => prev.filter((task) => {
            const list = lists.find((l) => l.id === task.listId);
            return list?.boardId !== boardId;
        }));
        if (selectedBoardId === boardId) {
            setSelectedBoardId(null);
        }
    };

    const addList = () => {
        if (!selectedBoardId || !listForm.name.trim()) {
            return;
        }
        const newList: BoardList = {
            id: generateId(lists),
            name: listForm.name.trim(),
            color: listForm.color.trim() || '#cccccc',
            boardId: selectedBoardId,
        };
        setLists((prev) => [...prev, newList]);
        setListForm({ name: '', color: '#cccccc' });
    };

    const deleteList = (listId: number) => {
        setLists((prev) => prev.filter((list) => list.id !== listId));
        setTasks((prev) => prev.filter((task) => task.listId !== listId));
    };

    const addTask = (listId: number) => {
        const form = taskForm[listId];
        if (!form || !form.name.trim()) {
            return;
        }
        const newTask: TaskItem = {
            id: generateId(tasks),
            name: form.name.trim(),
            description: form.description.trim(),
            isFinished: false,
            listId,
        };
        setTasks((prev) => [...prev, newTask]);
        setTaskForm((prev) => ({
            ...prev,
            [listId]: { name: '', description: '' },
        }));
    };

    const deleteTask = (taskId: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
    };

    const moveTaskToList = (taskId: number, targetListId: number) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === taskId ? { ...task, listId: targetListId } : task))
        );
    };

    const toggleTaskFinished = (taskId: number) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === taskId ? { ...task, isFinished: !task.isFinished } : task))
        );
    };

    const updateTaskForm = (listId: number, form: NewTaskForm) => {
        setTaskForm((prev) => ({
            ...prev,
            [listId]: form,
        }));
    };

    return {
        boards,
        lists,
        tasks,
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
    };
};
