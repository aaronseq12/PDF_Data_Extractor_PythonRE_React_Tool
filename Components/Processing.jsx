import React from 'react';

const Processing = () => (
    <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.9)', padding: '50px', borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    }}>
        <img src="/spin.webp" alt="Processing..." style={{ width: '100px', height: '100px' }}/>
        <h2 style={{ marginTop: '20px', color: 'var(--bh-primary-green)', fontWeight: '500' }}>
            Processing your documents...
        </h2>
        <p style={{marginTop: '10px', color: 'var(--bh-dark-gray)'}}>This may take a few moments.</p>
    </div>
);

export default Processing;
