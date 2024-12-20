import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        filter: 'all' // all, active, completed
    },
    reducers: {
        initializeTasks: (state, action) => {
            state.tasks = JSON.parse(localStorage.getItem(`tasks_${action.payload}`)) || [];
        },
        addTask: (state, action) => {
            const newTask = {
                id: Date.now(),
                title: action.payload.title,
                completed: false,
                createdAt: new Date().toISOString()
            };

            state.tasks.push(newTask);
            localStorage.setItem(
                `tasks_${action.payload.username}`,
                JSON.stringify(state.tasks)
            );
        },
        toggleTask: (state, action) => {
            const task = state.tasks.find(t => t.id === action.payload.taskId);
            if (task) {
                task.completed = !task.completed;
                localStorage.setItem(
                    `tasks_${action.payload.username}`,
                    JSON.stringify(state.tasks)
                );
            }
        },
        editTask: (state, action) => {
            const task = state.tasks.find(t => t.id === action.payload.taskId);
            if (task) {
                task.title = action.payload.title;
                localStorage.setItem(
                    `tasks_${action.payload.username}`,
                    JSON.stringify(state.tasks)
                );
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.taskId);
            localStorage.setItem(
                `tasks_${action.payload.username}`,
                JSON.stringify(state.tasks)
            );
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export const {
    initializeTasks,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
    setFilter
} = taskSlice.actions;

export default taskSlice.reducer;