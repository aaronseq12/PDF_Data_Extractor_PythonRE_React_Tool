import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

//++++++++++++ STYLES (FROM App.css) +++++++++++++++
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    :root {
      --bh-primary-green: #006F43;
      --bh-secondary-green: #00A75D;
      --bh-accent-teal: #00B0B9;
      --bh-light-gray: #F0F2F5;
      --bh-medium-gray: #D9D9D9;
      --bh-dark-gray: #333333;
      --bh-white: #FFFFFF;
      --bh-black: #000000;
      --bh-error-red: #D93025;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body, #root {
      font-family: 'Poppins', sans-serif;
      background-color: var(--bh-light-gray);
      color: var(--bh-dark-gray);
      min-height: 100vh;
      width: 100%;
      overflow-x: hidden;
    }
    .app-container {
      background-image: ('../opening_keynote_energizing_change.jpg');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      min-height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .form-container {
      background: rgba(255, 255, 255, 0.95);
      padding: 40px 50px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 450px;
      text-align: center;
      border: 1px solid var(--bh-medium-gray);
    }
    .input-field {
      width: 100%; padding: 15px; margin-bottom: 20px;
      border-radius: 8px; border: 1px solid var(--bh-medium-gray);
      font-size: 16px; font-family: 'Poppins', sans-serif;
    }
    .primary-button {
      width: 100%; padding: 15px; border-radius: 8px; border: none;
      background-color: var(--bh-primary-green); color: var(--bh-white);
      font-size: 16px; font-weight: 600; cursor: pointer;
      transition: background-color 0.3s ease, transform 0.1s ease;
      box-shadow: 0 4px 12px rgba(0, 111, 67, 0.2);
    }
    .primary-button:hover { background-color: #005a36; }
    .primary-button:active { transform: scale(0.98); }
    .primary-button:disabled { background-color: var(--bh-medium-gray); cursor: not-allowed; }
    .link-button {
      background: none; border: none; color: var(--bh-secondary-green);
      cursor: pointer; text-decoration: underline;
      font-family: 'Poppins', sans-serif; font-size: 14px;
    }
    .table-container {
      overflow-x: auto; width: 100%; background: var(--bh-white);
      border-radius: 8px; padding: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .styled-table { width: 100%; border-collapse: collapse; text-align: left; }
    .styled-table th {
      background-color: var(--bh-primary-green); color: var(--bh-white);
      padding: 12px 15px; font-size: 14px;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .styled-table td {
      padding: 12px 15px; border-bottom: 1px solid var(--bh-medium-gray);
      font-size: 14px;
    }
    .styled-table tbody tr:nth-of-type(even) { background-color: #f9f9f9; }
    .error-message { color: var(--bh-error-red); margin-bottom: 20px; }
    .success-message { color: var(--bh-secondary-green); font-weight: 500; margin-bottom: 20px; }
  `}</style>
);


//++++++++++++ API & FILE UTILS (from api.js, fileUtils.js) +++++++++++++++
const API_BASE_URL = 'http://127.0.0.1:5000'; // Your Flask server URL

// This function now makes a REAL API call to your Flask backend
const processFilesWithPython = async (files) => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);
    });

    const response = await fetch(`${API_BASE_URL}/process`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Backend processing failed');
    }
    return await response.json();
};

// This function now opens the download link provided by the backend
const downloadFileFromServer = (downloadUrl) => {
    if (!downloadUrl) return;
    window.open(`${API_BASE_URL}${downloadUrl}`, '_blank');
};


//++++++++++++ COMPONENTS (from components/*.jsx) +++++++++++++++
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
            <img src="./bhi-logo.png" alt="Baker Hughes Logo" style={{ width: '180px', height: 'auto', marginBottom: '20px', borderRadius: '8px' }}/>
            <h2 style={{ marginBottom: '10px', color: 'var(--bh-primary-green)', fontWeight: '600' }}>DATA EXTRACTOR TOOL</h2>
            <p style={{ marginBottom: '30px', color: 'var(--bh-dark-gray)' }}>Please sign in to continue</p>
            {error && <p className="error-message">{error}</p>}
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
        setSsoid(''); setName(''); setPassword('');
    };

    return (
        <div className="form-container">
            <img src="./bhi-logo.png" alt="Baker Hughes Logo" style={{ width: '180px', height: 'auto', marginBottom: '20px', borderRadius: '8px' }}/>
            <h2 style={{ marginBottom: '30px', color: 'var(--bh-primary-green)', fontWeight: '600' }}>Create Account</h2>
            {message && <p className={isSuccess ? 'success-message' : 'error-message'}>{message}</p>}
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
};

const FileUploader = ({ onFilesUploaded, isProcessing }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    };
    
    const handleUploadClick = () => {
        if (selectedFiles.length > 0) {
            onFilesUploaded(selectedFiles);
        }
    };
    
    const triggerFileSelect = () => fileInputRef.current.click();
    const removeFile = (fileName) => setSelectedFiles(prevFiles => prevFiles.filter(f => f.name !== fileName));

    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--bh-dark-gray)', marginBottom: '20px' }}>
                Upload your PDF document(s) to extract data.
            </p>
            <input
                type="file" multiple ref={fileInputRef} onChange={handleFileChange}
                style={{ display: 'none' }} accept=".pdf"
            />
            <button onClick={triggerFileSelect} disabled={isProcessing} style={{
                padding: '25px 40px', fontSize: '1.1rem', fontWeight: '600', color: 'var(--bh-white)',
                backgroundColor: 'var(--bh-secondary-green)', border: 'none', borderRadius: '12px',
                cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(0, 167, 93, 0.3)',
            }}>
                Click to Upload Documents
            </button>
            {selectedFiles.length > 0 && (
                <div style={{ marginTop: '30px', padding: '20px', background: 'var(--bh-white)', borderRadius: '8px', border: '1px dashed var(--bh-medium-gray)', minHeight: '100px' }}>
                    <h4 style={{textAlign: 'left', marginBottom: '15px', color: 'var(--bh-primary-green)'}}>Selected Files:</h4>
                    <ul style={{ listStyle: 'none', textAlign: 'left' }}>
                        {selectedFiles.map((file, index) => (
                            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--bh-light-gray)'}}>
                                <span>{file.name} ({Math.round(file.size / 1024)} KB)</span>
                                <button onClick={() => removeFile(file.name)} disabled={isProcessing} style={{background: 'none', border: 'none', color: 'var(--bh-error-red)', cursor: 'pointer', fontSize: '16px'}}>✖</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedFiles.length > 0 && (
                <button onClick={handleUploadClick} className="primary-button" style={{marginTop: '30px'}} disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Process Files'}
                </button>
            )}
        </div>
    );
};

const PdfSubmit = ({ user, onProcessFiles, onLogout, isProcessing }) => (
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
        <FileUploader onFilesUploaded={onProcessFiles} isProcessing={isProcessing} />
    </div>
);

const Processing = () => (
    <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.9)', padding: '50px', borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    }}>
        <img src="https://i.gifer.com/ZZ5H.gif" alt="Processing..." style={{ width: '100px', height: '100px' }}/>
        <h2 style={{ marginTop: '20px', color: 'var(--bh-primary-green)', fontWeight: '500' }}>
            Processing your documents...
        </h2>
        <p style={{marginTop: '10px', color: 'var(--bh-dark-gray)'}}>This may take a few moments.</p>
    </div>
);

const AuditLog = ({ logs }) => (
    <div style={{ width: '100%', background: 'var(--bh-white)', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <h2 style={{color: 'var(--bh-primary-green)', marginBottom: '20px'}}>Audit Log</h2>
        <div style={{maxHeight: '400px', overflowY: 'auto'}}>
            <table className="styled-table">
                <thead>
                    <tr><th>Timestamp</th><th>User</th><th>SSOID</th><th>Action</th></tr>
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

const ExtractedData = ({ data, onBack, onLogout, user, downloadUrl, processingTime }) => {
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
        downloadFileFromServer(downloadUrl);
        const auditLog = JSON.parse(localStorage.getItem('bh_audit_log') || '[]');
        auditLog.push({ user: user.name, ssoid: user.ssoid, action: 'Downloaded Excel', timestamp: new Date().toISOString() });
        localStorage.setItem('bh_audit_log', JSON.stringify(auditLog));
    };

    return (
        <div style={{ background: 'rgba(240, 242, 245, 0.95)', padding: '40px', borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '95%', maxWidth: '1400px', minHeight: '600px',
            position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
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
            <p style={{ width: '100%', textAlign: 'left', marginBottom: '20px', color: 'var(--bh-dark-gray)', fontSize: '0.9rem'}}>
                Processing completed in <strong>{processingTime} seconds</strong>.
            </p>

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


//++++++++++++ MAIN APP COMPONENT +++++++++++++++
function App() {
    const [page, setPage] = useState('login'); // login, signup, submit, processing, data
    const [user, setUser] = useState(null);
    const [extractedData, setExtractedData] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState('');
    const [processingTime, setProcessingTime] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem('bh_user');
        if (loggedInUser) {
            const parsedUser = JSON.parse(loggedInUser);
            setUser(parsedUser);
            setPage('submit');
        } else {
            // Ensure admin user exists in local storage for demo purposes
            const users = JSON.parse(localStorage.getItem('bh_users') || '{}');
            if (!users.admin) {
                users.admin = { ssoid: 'admin', name: 'Aaron', password: 'aaron12' };
                localStorage.setItem('bh_users', JSON.stringify(users));
            }
        }
    }, []);

    const handleLogin = useCallback((loggedInUser) => {
        setUser(loggedInUser);
        sessionStorage.setItem('bh_user', JSON.stringify(loggedInUser));
        const auditLog = JSON.parse(localStorage.getItem('bh_audit_log') || '[]');
        auditLog.push({ user: loggedInUser.name, ssoid: loggedInUser.ssoid, action: 'Logged In', timestamp: new Date().toISOString() });
        localStorage.setItem('bh_audit_log', JSON.stringify(auditLog));
        setPage('submit');
    }, []);

    const handleLogout = useCallback(() => {
        const auditLog = JSON.parse(localStorage.getItem('bh_audit_log') || '[]');
        if (user) {
            auditLog.push({ user: user.name, ssoid: user.ssoid, action: 'Logged Out', timestamp: new Date().toISOString() });
            localStorage.setItem('bh_audit_log', JSON.stringify(auditLog));
        }
        setUser(null);
        sessionStorage.removeItem('bh_user');
        setPage('login');
    }, [user]);

    const handleProcessFiles = useCallback(async (files) => {
        setIsProcessing(true);
        setError('');
        setPage('processing');
        try {
            const result = await processFilesWithPython(files);
            const auditLog = JSON.parse(localStorage.getItem('bh_audit_log') || '[]');
            auditLog.push({ user: user.name, ssoid: user.ssoid, action: `Processed ${files.length} file(s)`, timestamp: new Date().toISOString() });
            localStorage.setItem('bh_audit_log', JSON.stringify(auditLog));
            setExtractedData(result.data);
            setDownloadUrl(result.download_url);
            setProcessingTime(result.processing_time);
            setPage('data');
        } catch (error) {
            console.error("Processing failed:", error);
            setError(`File processing failed: ${error.message}. Please try again.`);
            setPage('submit'); // Go back to the submit page on error
        } finally {
            setIsProcessing(false);
        }
    }, [user]);
    
    const renderPage = () => {
        switch (page) {
            case 'login': return <Login onLogin={handleLogin} onShowSignUp={() => setPage('signup')} />;
            case 'signup': return <SignUp onShowLogin={() => setPage('login')} />;
            case 'submit': return (
                <>
                  {error && <div style={{position: 'absolute', top: 20, background: 'var(--bh-error-red)', color: 'white', padding: '10px 20px', borderRadius: 8}}>{error}</div>}
                  <PdfSubmit user={user} onProcessFiles={handleProcessFiles} onLogout={handleLogout} isProcessing={isProcessing} />
                </>
            );
            case 'processing': return <Processing />;
            case 'data': return <ExtractedData data={extractedData} onBack={() => { setPage('submit'); setError('') }} onLogout={handleLogout} user={user} downloadUrl={downloadUrl} processingTime={processingTime} />;
            default: return <Login onLogin={handleLogin} onShowSignUp={() => setPage('signup')} />;
        }
    };

    return (
        <div className="app-container">
            <GlobalStyles />
            {renderPage()}
        </div>
    );
}

export default App;
