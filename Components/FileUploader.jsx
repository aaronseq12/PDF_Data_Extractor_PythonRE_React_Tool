import React, { useState, useRef } from 'react';

const FileUploader = ({ onFilesUploaded }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    };
    
    const handleUploadClick = () => {
        if (selectedFiles.length > 0) {
            onFilesUploaded(selectedFiles);
        } else {
            alert("Please select files to upload."); // In a real app, use a modal dialog
        }
    };
    
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    const removeFile = (fileName) => {
      setSelectedFiles(prevFiles => prevFiles.filter(f => f.name !== fileName));
    }

    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--bh-dark-gray)', marginBottom: '20px' }}>
                Upload your document(s) to get extracted data from.
            </p>
            <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
            />
            <button onClick={triggerFileSelect} style={{
                padding: '25px 40px', fontSize: '1.1rem', fontWeight: '600', color: 'var(--bh-white)',
                backgroundColor: 'var(--bh-secondary-green)', border: 'none', borderRadius: '12px',
                cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(0, 167, 93, 0.3)',
            }}>
                Click to Upload Documents
            </button>
            {selectedFiles.length > 0 && (
                <div style={{
                    marginTop: '30px', padding: '20px', background: 'var(--bh-white)', borderRadius: '8px',
                    border: '1px dashed var(--bh-medium-gray)', minHeight: '100px',
                }}>
                    <h4 style={{textAlign: 'left', marginBottom: '15px', color: 'var(--bh-primary-green)'}}>Selected Files:</h4>
                    <ul style={{ listStyle: 'none', textAlign: 'left' }}>
                        {selectedFiles.map((file, index) => (
                            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--bh-light-gray)'}}>
                                <span>{file.name} ({Math.round(file.size / 1024)} KB)</span>
                                <button onClick={() => removeFile(file.name)} style={{background: 'none', border: 'none', color: 'var(--bh-error-red)', cursor: 'pointer', fontSize: '16px'}}>✖</button>
                            </li>
                        ))}
                    </ul>
                </div>
             )}
             {selectedFiles.length > 0 && (
                <button onClick={handleUploadClick} className="primary-button" style={{marginTop: '30px'}}>
                    Process Files
                </button>
            )}
        </div>
    );
};

export default FileUploader;
