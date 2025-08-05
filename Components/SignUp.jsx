import React, { useState } from 'react';

const SignUp = ({ onShowLogin }) => {
    const [ssoid, setSsoid] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();
        setMessage('');
        setIsSuccess(false);

        if (!ssoid || !name || !password) {
            setMessage('All fields are required.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('bh_users') || '{}');
        if (users[ssoid]) {
            setMessage('SSOID already exists. Please choose another.');
            return;
        }

        users[ssoid] = { ssoid, name, password };
        localStorage.setItem('bh_users', JSON.stringify(users));
        setMessage('Account created successfully! You can now log in.');
        setIsSuccess(true);
        setSsoid('');
        setName('');
        setPassword('');
    };

    return (
        <div className="form-container">
            <img src="/bhi-logo.png" alt="Baker Hughes Logo" style={{ width: '180px', height: 'auto', marginBottom: '20px', borderRadius: '8px' }}/>
            <h2 style={{ marginBottom: '30px', color: 'var(--bh-primary-green)', fontWeight: '600' }}>Create Account</h2>
            {message && <p style={{ color: isSuccess ? 'var(--bh-secondary-green)' : 'var(--bh-error-red)', marginBottom: '20px', fontWeight: '500' }}>{message}</p>}
            <form onSubmit={handleSignUp}>
                <input type="text" placeholder="SSOID" value={ssoid} onChange={(e) => setSsoid(e.target.value)} required className="input-field" />
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="input-field" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />
                <button type="submit" className="primary-button">Create Account</button>
            </form>
            <p style={{ marginTop: '30px', fontSize: '14px' }}>
                Already have an account?{' '}
                <button onClick={onShowLogin} className="link-button">Sign In</button>
            </p>
        </div>
    );
}

export default SignUp;
