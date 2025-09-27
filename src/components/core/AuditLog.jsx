import React from 'react';

const AuditLog = ({ logs }) => {
  return (
    <div className="audit-log-container">
      <h2>Audit Log</h2>
      <div className="table-container">
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
};

export default AuditLog;
