import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await fetch('http://127.0.0.1:8000/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (response.ok) {
                const data = await response.json();
                login(data.access_token);
                navigate('/admin');
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Invalid username or password');
            }
        } catch (err) {
            setError('An error occurred during login.');
            console.error(err);
        }
    };

    return (
        <div className="bg-custom_bg_gray text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-900 text-white border border-gray-700 rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-900 text-white border border-gray-700 rounded p-2 w-full"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <button type="submit" className="bg-button_bg text-white w-full py-2 px-4 rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
