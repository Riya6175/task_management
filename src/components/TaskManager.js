// src/components/TaskManager.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    TextField,
    Button,
    Card,
    CardHeader,
    CardContent,
    Typography,
    IconButton,
    Checkbox,
    ButtonGroup,
    Box
} from '@mui/material';
import { Check, Close, Edit, Delete } from '@mui/icons-material';
import { logout } from '../store/authSlice';
import {
    initializeTasks,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
    setFilter
} from '../store/taskSlice';

const TaskManager = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const tasks = useSelector((state) => state.tasks.tasks);
    const filter = useSelector((state) => state.tasks.filter);

    const [newTask, setNewTask] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        if (user) {
            dispatch(initializeTasks(user.username));
        }
    }, [user, dispatch]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        dispatch(
            addTask({
                username: user.username,
                title: newTask,
            })
        );
        setNewTask('');
    };

    const handleEdit = (task) => {
        setEditingId(task.id);
        setEditText(task.title);
    };

    const handleSaveEdit = (taskId) => {
        if (!editText.trim()) return;

        dispatch(
            editTask({
                username: user.username,
                taskId,
                title: editText,
            })
        );
        setEditingId(null);
        setEditText('');
    };

    const getFilteredTasks = () => {
        switch (filter) {
            case 'completed':
                return tasks.filter((task) => task.completed);
            case 'active':
                return tasks.filter((task) => !task.completed);
            default:
                return tasks;
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f9fafb',
                p: 4,
            }}
        >
            <Card sx={{ maxWidth: '800px', mx: 'auto', p: 2 }}>
                <CardHeader
                    title={
                        <Typography variant="h5" component="div">
                            Task Manager - Welcome {user.username}!
                        </Typography>
                    }
                    action={
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => dispatch(logout())}
                        >
                            Logout
                        </Button>
                    }
                />
                <CardContent>
                    <form
                        onSubmit={handleAddTask}
                        style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}
                    >
                        <TextField
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Add a new task..."
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Add Task
                        </Button>
                    </form>

                    <ButtonGroup sx={{ mb: 2 }}>
                        <Button
                            variant={filter === 'all' ? 'contained' : 'outlined'}
                            onClick={() => dispatch(setFilter('all'))}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === 'active' ? 'contained' : 'outlined'}
                            onClick={() => dispatch(setFilter('active'))}
                        >
                            Active
                        </Button>
                        <Button
                            variant={filter === 'completed' ? 'contained' : 'outlined'}
                            onClick={() => dispatch(setFilter('completed'))}
                        >
                            Completed
                        </Button>
                    </ButtonGroup>

                    {getFilteredTasks().map((task) => (
                        <Box
                            key={task.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 1,
                                borderBottom: '1px solid #e0e0e0',
                            }}
                        >
                            <Checkbox
                                checked={task.completed}
                                onChange={() =>
                                    dispatch(
                                        toggleTask({
                                            username: user.username,
                                            taskId: task.id,
                                        })
                                    )
                                }
                            />

                            {editingId === task.id ? (
                                <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
                                    <TextField
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        fullWidth
                                    />
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleSaveEdit(task.id)}
                                    >
                                        <Check />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => setEditingId(null)}
                                    >
                                        <Close />
                                    </IconButton>
                                </Box>
                            ) : (
                                <Typography
                                    variant="body1"
                                    sx={{
                                        flex: 1,
                                        textDecoration: task.completed ? 'line-through' : 'none',
                                        color: task.completed ? 'text.disabled' : 'text.primary',
                                    }}
                                >
                                    {task.title}
                                </Typography>
                            )}

                            {editingId !== task.id && (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(task)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() =>
                                            dispatch(
                                                deleteTask({
                                                    username: user.username,
                                                    taskId: task.id,
                                                })
                                            )
                                        }
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    ))}
                </CardContent>
            </Card>
        </Box>
    );
};

export default TaskManager;
