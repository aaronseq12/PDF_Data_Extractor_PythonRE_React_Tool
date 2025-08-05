import React from 'react';
import FileUploader from './FileUploader';

const PdfSubmit = ({ user, onProcessFiles, onLogout }) => {
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.98)', padding: '40px', borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '90%', maxWidth: '900px',
            minHeight: '500px', position: 'relative',
        }}>
            <button onClick={onLogout} style={{
                position: 'absolute', top: '10px', right: '10px', padding: '8px 15px',
                background: 'var(--bh-dark-gray)', color: 'var(--bh-white)', border: 'none',
                borderRadius: '8px', cursor: 'pointer', fontSize: '14px'
            }}>Logout</button>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ color: 'var(--bh-primary-green)', fontWeight: '600', fontSize: '2rem' }}>
                    Welcome {user.name} to the BH Data Extractor Tool
                </h1>
            </div>
            <FileUploader onFilesUploaded={onProcessFiles} />
        </div>
    );
};

export default PdfSubmit;
