import React from 'react';

const AuditLog = ({ logs }) => (
    <div style={{ width: '100%', background: 'var(--bh-white)', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <h2 style={{color: 'var(--bh-primary-green)', marginBottom: '20px'}}>Audit Log</h2>
         <div style={{maxHeight: '400px', overflowY: 'auto'}}>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>User</th>
                        <th>SSOID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                            <td>{log.user}</td>
                            <td>{log.ssoid}</td>
                            <td>{log.action}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
    </div>
);

export default AuditLog;
