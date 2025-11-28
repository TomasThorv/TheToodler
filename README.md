# TheToodler - Task Management App

A beautiful, Apple-inspired task management application built with React Native and Expo.

## Project Structure

```
TheToodler/
├── App.tsx                      # Main app entry point
├── data.json                    # Initial data
├── src/
│   ├── components/              # React components (Single Responsibility)
│   │   ├── AppleButton/
│   │   │   ├── AppleButton.tsx
│   │   │   ├── AppleButton.test.tsx
│   │   │   └── index.ts
│   │   ├── BoardCard/
│   │   │   ├── BoardCard.tsx
│   │   │   ├── BoardCard.test.tsx
│   │   │   └── index.ts
│   │   ├── BoardForm/
│   │   │   ├── BoardForm.tsx
│   │   │   ├── BoardForm.test.tsx
│   │   │   └── index.ts
│   │   ├── BoardListScreen/
│   │   │   ├── BoardListScreen.tsx
│   │   │   ├── BoardListScreen.test.tsx
│   │   │   └── index.ts
│   │   ├── BoardDetailScreen/
│   │   │   ├── BoardDetailScreen.tsx
│   │   │   ├── BoardDetailScreen.test.tsx
│   │   │   └── index.ts
│   │   ├── ListCard/
│   │   │   ├── ListCard.tsx
│   │   │   ├── ListCard.test.tsx
│   │   │   └── index.ts
│   │   ├── ListForm/
│   │   │   ├── ListForm.tsx
│   │   │   ├── ListForm.test.tsx
│   │   │   └── index.ts
│   │   ├── TaskCard/
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskCard.test.tsx
│   │   │   └── index.ts
│   │   └── TaskForm/
│   │       ├── TaskForm.tsx
│   │       ├── TaskForm.test.tsx
│   │       └── index.ts
│   ├── hooks/                   # Custom React hooks
│   │   └── useAppState.ts       # App state management hook
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts             # All interface definitions
│   ├── utils/                   # Utility functions
│   │   └── helpers.ts           # Common helper functions
│   └── styles/                  # Shared styles (if needed)
└── .eslintrc.js                 # ESLint configuration
```

## Architecture

### Single Responsibility Principle

Each component has a single, well-defined responsibility:

- **AppleButton**: Renders a styled button with variants
- **BoardCard**: Displays a board with thumbnail and actions
- **BoardForm**: Handles board creation input
- **TaskCard**: Displays a task with status and move options
- **TaskForm**: Handles task creation input
- **ListCard**: Displays a list with tasks and task form
- **BoardListScreen**: Manages the board list view
- **BoardDetailScreen**: Manages the board detail view

### State Management

- **useAppState**: Custom hook that encapsulates all state logic
  - Manages boards, lists, and tasks
  - Provides CRUD operations
  - Computes derived state (selected board, filtered lists, grouped tasks)

### Common Logic

- **helpers.ts**: Shared utility functions
  - `generateId()`: Creates unique IDs
  - `groupTasksByList()`: Groups tasks by list
  - `getTasksForBoard()`: Filters tasks for a board

### Type Safety

All types are defined in `src/types/index.ts`:

- Board, BoardList, TaskItem (data models)
- NewBoardForm, NewListForm, NewTaskForm (form models)

## Code Style

The project follows consistent coding standards enforced by ESLint:

- **Indentation**: 4 spaces
- **Brace Style**: Egyptian (1tbs)
- **Quotes**: Single quotes
- **Semicolons**: Required
- **Trailing commas**: Always in multiline
- **No trailing spaces**
- **File ends with newline**

## Running the App

```bash
# Install dependencies
npm install

# Run on web
npm run web

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Lint & Format

```bash
# Run ESLint
npx eslint . --ext .ts,.tsx

# Fix ESLint issues
npx eslint . --ext .ts,.tsx --fix
```

## Folder Structure Compliance

✅ **Each component has its own folder** containing:

- Component file (`ComponentName.tsx`)
- Test file (`ComponentName.test.tsx`)
- Index file for clean imports (`index.ts`)

✅ **Proper separation of concerns**:

- `src/components/` - All UI components
- `src/hooks/` - Custom React hooks
- `src/utils/` - Shared utility functions
- `src/types/` - TypeScript type definitions
- `src/styles/` - Shared styles (if needed)

✅ **Code consistency enforced by ESLint**:

- 4 spaces indentation
- Egyptian style curly braces (1tbs)
- Single quotes
- Semicolons required
