export interface Board {
    id: number;
    name: string;
    description: string;
    thumbnailPhoto: string;
}

export interface BoardList {
    id: number;
    name: string;
    color: string;
    boardId: number;
}

export interface TaskItem {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    listId: number;
}

export interface NewBoardForm {
    name: string;
    description: string;
    thumbnailPhoto: string;
}

export interface NewListForm {
    name: string;
    color: string;
}

export interface NewTaskForm {
    name: string;
    description: string;
}
