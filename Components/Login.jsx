import React, { useState } from 'react';

const Login = ({ onLogin, onShowSignUp }) => {
    const [ssoid, setSsoid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const users = JSON.parse(localStorage.getItem('bh_users') || '{}');

        if (ssoid.toLowerCase() === 'admin' && password === 'aaron12') {
            onLogin({ ssoid: 'admin', name: 'Aaron' });
            return;
        }

        if (users[ssoid] && users[ssoid].password === password) {
            onLogin(users[ssoid]);
        } else {
            setError('Invalid SSOID or password.');
        }
    };

    return (
        <div className="form-container">
            <img src="/bhi-logo.png" alt="Baker Hughes Logo" style={{ width: '180px', height: 'auto', marginBottom: '20px', borderRadius: '8px' }}/>
            <h2 style={{ marginBottom: '10px', color: 'var(--bh-primary-green)', fontWeight: '600' }}>DATA EXTRACTOR TOOL</h2>
            <p style={{ marginBottom: '30px', color: 'var(--bh-dark-gray)' }}>Please sign in to continue</p>
            {error && <p style={{ color: 'var(--bh-error-red)', marginBottom: '20px' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="SSOID" value={ssoid} onChange={(e) => setSsoid(e.target.value)} required className="input-field" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />
                <button type="submit" className="primary-button">Login</button>
            </form>
            <p style={{ marginTop: '30px', fontSize: '14px' }}>
                Don't have an account?{' '}
                <button onClick={onShowSignUp} className="link-button">Create an account</button>
            </p>
        </div>
    );
};

export default Login;
