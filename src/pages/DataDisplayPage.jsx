import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { downloadFile } from '../services/fileService';
import Header from '../components/core/Header';
import MainContent from '../components/core/MainContent';
import ExtractedDataTable from '../components/core/ExtractedDataTable';
import AuditLog from '../components/core/AuditLog';
import Button from '../components/common/Button';

const DataDisplayPage = () => {
  const [showAudit, setShowAudit] = useState(false);
  const [auditLogs, setAuditLogs] = useLocalStorage('bh_audit_log', []);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, processingTime } = location.state || {};

  const handleDownload = () => {
    downloadFile(data, 'extracted_data.csv');
    setAuditLogs(prevLogs => [...prevLogs, { user: user.name, ssoid: user.ssoid, action: 'Downloaded Excel', timestamp: new Date().toISOString() }]);
  };

  if (!data) {
    return <Navigate to="/dashboard" />;
  }

  const sortedAuditLogs = [...auditLogs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <>
      <Header />
      <MainContent>
        <div className="data-display-header">
          <h2>Extracted Data</h2>
          <div className="actions">
            <Button onClick={() => setShowAudit(!showAudit)}>
              {showAudit ? 'Hide Audit Log' : 'Show Audit Log'}
            </Button>
            <Button onClick={handleDownload}>Download Excel</Button>
          </div>
        </div>
        <p>Processing completed in <strong>{processingTime} seconds</strong>.</p>
        {showAudit ? (
          <AuditLog logs={sortedAuditLogs} />
        ) : (
          <ExtractedDataTable data={data} />
        )}
        <Button onClick={() => navigate('/dashboard')} className="extract-more-button">
          Extract More
        </Button>
      </MainContent>
    </>
  );
};

export default DataDisplayPage;
