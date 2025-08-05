import React, { useState, useMemo } from 'react';
import { downloadFileAsCSV } from '../services/fileUtils';
import AuditLog from './AuditLog';

const ExtractedData = ({ data, onBack, onLogout, user }) => {
    const [showAudit, setShowAudit] = useState(false);
    
    const columns = useMemo(() => {
        if (!data || data.length === 0) return [];
        const allKeys = data.reduce((keys, item) => {
            Object.keys(item).forEach(key => {
                if (!keys.includes(key)) keys.push(key);
            });
            return keys;
        }, []);
        return allKeys;
    }, [data]);

    const auditLogs = JSON.parse(localStorage.getItem('bh_audit_log') || '[]').sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (!data || data.length === 0) {
        return (
            <div>
                <p>No data to display. Something went wrong.</p>
                <button onClick={onBack} className="primary-button">Go Back</button>
            </div>
        );
    }
    
    const handleDownload = () => {
        downloadFileAsCSV(data, 'extracted_data.csv');
        const auditLog = JSON.parse(localStorage.getItem('bh_audit_log') || '[]');
        auditLog.push({ user: user.name, ssoid: user.ssoid, action: 'Downloaded Excel', timestamp: new Date().toISOString() });
        localStorage.setItem('bh_audit_log', JSON.stringify(auditLog));
    };

    return (
        <div style={{ background: 'rgba(240, 242, 245, 0.95)', padding: '40px', borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '95%', maxWidth: '1400px', minHeight: '600px',
            position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: 'var(--bh-primary-green)', fontWeight: '600' }}>Extracted Data</h1>
                <div>
                     <button onClick={() => setShowAudit(!showAudit)} className="primary-button" style={{width: 'auto', marginRight: '15px', backgroundColor: 'var(--bh-accent-teal)'}}>
                        {showAudit ? 'Hide Audit Log' : 'Show Audit Log'}
                    </button>
                    <button onClick={handleDownload} className="primary-button" style={{width: 'auto', marginRight: '15px'}}>Download Excel</button>
                    <button onClick={onLogout} style={{
                        padding: '8px 15px', background: 'var(--bh-dark-gray)', color: 'var(--bh-white)',
                        border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px'
                    }}>Logout</button>
                </div>
            </div>

            {showAudit ? (
                <AuditLog logs={auditLogs} />
            ) : (
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>{columns.map(col => <th key={col}>{col}</th>)}</tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    {columns.map(col => <td key={`${index}-${col}`}>{String(row[col] !== undefined ? row[col] : 'N/A')}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            <button onClick={onBack} className="primary-button" style={{width: 'auto', marginTop: '30px'}}>Extract More</button>
        </div>
    );
};

export default ExtractedData;
