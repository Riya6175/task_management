// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Card, CardHeader, CardContent, Typography, Alert } from '@mui/material';
import { loginUser, registerUser, clearError } from '../store/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);
    const [isRegistering, setIsRegistering] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    useEffect(() => {
        return () => dispatch(clearError());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!credentials.username || !credentials.password) {
            return;
        }

        if (isRegistering) {
            dispatch(registerUser(credentials));
        } else {
            dispatch(loginUser(credentials));
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', padding: '16px' }}>
            <Card style={{ width: '100%', maxWidth: '400px', padding: '16px' }}>
                <CardHeader
                    title={<Typography variant="h5" align="center">{isRegistering ? 'Register' : 'Login'}</Typography>}
                />
                <CardContent>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={credentials.username}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                username: e.target.value,
                            })}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={credentials.password}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                password: e.target.value,
                            })}
                        />

                        {error && (
                            <Alert severity="error">{error}</Alert>
                        )}

                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {isRegistering ? 'Register' : 'Login'}
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            fullWidth
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                dispatch(clearError());
                            }}
                        >
                            {isRegistering ? 'Back to Login' : 'Need an account?'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
