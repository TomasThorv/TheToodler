import React, { useMemo, useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import initialData from './data.json';

interface Board {
  id: number;
  name: string;
  description: string;
  thumbnailPhoto: string;
}

interface BoardList {
  id: number;
  name: string;
  color: string;
  boardId: number;
}

interface TaskItem {
  id: number;
  name: string;
  description: string;
  isFinished: boolean;
  listId: number;
}

interface NewBoardForm {
  name: string;
  description: string;
  thumbnailPhoto: string;
}

interface NewListForm {
  name: string;
  color: string;
}

interface NewTaskForm {
  name: string;
  description: string;
}

export default function App() {
  const [boards, setBoards] = useState<Board[]>(initialData.boards);
  const [lists, setLists] = useState<BoardList[]>(initialData.lists);
  const [tasks, setTasks] = useState<TaskItem[]>(initialData.tasks);

  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const [boardForm, setBoardForm] = useState<NewBoardForm>({
    name: '',
    description: '',
    thumbnailPhoto: '',
  });
  const [listForm, setListForm] = useState<NewListForm>({ name: '', color: '#cccccc' });
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
    const grouped: Record<number, TaskItem[]> = {};
    listsForBoard.forEach((list) => {
      grouped[list.id] = tasks.filter((task) => task.listId === list.id);
    });
    return grouped;
  }, [listsForBoard, tasks]);

  const resetTaskFormForList = (listId: number) => {
    setTaskForm((prev) => ({
      ...prev,
      [listId]: { name: '', description: '' },
    }));
  };

  const addBoard = () => {
    if (!boardForm.name.trim() || !boardForm.thumbnailPhoto.trim()) {
      return;
    }
    const newBoard: Board = {
      id: Math.max(0, ...boards.map((b) => b.id)) + 1,
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
      id: Math.max(0, ...lists.map((list) => list.id)) + 1,
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
      id: Math.max(0, ...tasks.map((task) => task.id)) + 1,
      name: form.name.trim(),
      description: form.description.trim(),
      isFinished: false,
      listId,
    };
    setTasks((prev) => [...prev, newTask]);
    resetTaskFormForList(listId);
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

  const renderBoardList = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Your Boards</Text>
      {boards.map((board) => (
        <View key={board.id} style={styles.card}>
          <Image source={{ uri: board.thumbnailPhoto }} style={styles.thumbnail} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{board.name}</Text>
            <Text style={styles.cardDescription}>{board.description}</Text>
            <View style={styles.cardActions}>
              <Button title="Open" onPress={() => setSelectedBoardId(board.id)} />
              <Button color="#c0392b" title="Delete" onPress={() => deleteBoard(board.id)} />
            </View>
          </View>
        </View>
      ))}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Create a new board</Text>
        <TextInput
          placeholder="Board name"
          value={boardForm.name}
          onChangeText={(text) => setBoardForm((prev) => ({ ...prev, name: text }))}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={boardForm.description}
          onChangeText={(text) => setBoardForm((prev) => ({ ...prev, description: text }))}
          style={styles.input}
        />
        <TextInput
          placeholder="Thumbnail URL"
          value={boardForm.thumbnailPhoto}
          onChangeText={(text) => setBoardForm((prev) => ({ ...prev, thumbnailPhoto: text }))}
          style={styles.input}
        />
        <Button title="Add board" onPress={addBoard} />
      </View>
    </ScrollView>
  );

  const renderTask = (task: TaskItem, listId: number) => (
    <View key={task.id} style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{task.name}</Text>
        <TouchableOpacity onPress={() => deleteTask(task.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.taskDescription}>{task.description}</Text>
      <View style={styles.taskFooter}>
        <View style={styles.switchRow}>
          <Text>Finished</Text>
          <Switch value={task.isFinished} onValueChange={() => toggleTaskFinished(task.id)} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moveRow}>
          {listsForBoard
            .filter((list) => list.id !== listId)
            .map((list) => (
              <TouchableOpacity
                key={list.id}
                style={styles.moveButton}
                onPress={() => moveTaskToList(task.id, list.id)}
              >
                <Text style={styles.moveButtonText}>{list.name}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </View>
  );

  const renderList = (list: BoardList) => (
    <View key={list.id} style={styles.listCard}>
      <View style={[styles.listHeader, { backgroundColor: list.color || '#eeeeee' }]}>
        <Text style={styles.listTitle}>{list.name}</Text>
        <TouchableOpacity onPress={() => deleteList(list.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tasksContainer}>{tasksByList[list.id]?.map((task) => renderTask(task, list.id))}</View>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Add task</Text>
        <TextInput
          placeholder="Task name"
          value={taskForm[list.id]?.name || ''}
          onChangeText={(text) =>
            setTaskForm((prev) => ({
              ...prev,
              [list.id]: { ...prev[list.id], name: text, description: prev[list.id]?.description || '' },
            }))
          }
          style={styles.input}
        />
        <TextInput
          placeholder="Task description"
          value={taskForm[list.id]?.description || ''}
          onChangeText={(text) =>
            setTaskForm((prev) => ({
              ...prev,
              [list.id]: { ...prev[list.id], name: prev[list.id]?.name || '', description: text },
            }))
          }
          style={styles.input}
        />
        <Button title="Add task" onPress={() => addTask(list.id)} />
      </View>
    </View>
  );

  const renderBoardDetails = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.headerRow}>
        <Button title="Back to boards" onPress={() => setSelectedBoardId(null)} />
        {selectedBoard && <Text style={styles.title}>{selectedBoard.name}</Text>}
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Create a new list</Text>
        <TextInput
          placeholder="List name"
          value={listForm.name}
          onChangeText={(text) => setListForm((prev) => ({ ...prev, name: text }))}
          style={styles.input}
        />
        <TextInput
          placeholder="Color (e.g. #ff0000)"
          value={listForm.color}
          onChangeText={(text) => setListForm((prev) => ({ ...prev, color: text }))}
          style={styles.input}
        />
        <Button title="Add list" onPress={addList} />
      </View>
      {listsForBoard.map(renderList)}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {selectedBoardId ? renderBoardDetails() : renderBoardList()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  thumbnail: {
    height: 150,
    width: '100%',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  listHeader: {
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tasksContainer: {
    padding: 12,
    gap: 8,
  },
  taskCard: {
    backgroundColor: '#f5f6f8',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskTitle: {
    fontWeight: '600',
  },
  deleteText: {
    color: '#c0392b',
    fontWeight: '600',
  },
  taskDescription: {
    marginTop: 4,
    color: '#444',
  },
  taskFooter: {
    marginTop: 8,
    gap: 6,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moveRow: {
    flexGrow: 0,
  },
  moveButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  moveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});