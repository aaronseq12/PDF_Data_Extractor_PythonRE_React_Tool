import React, { useState, useRef } from 'react';
import Button from '../common/Button';

const FileUploader = ({ onProcessFiles, isProcessing }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
  };

  const handleUploadClick = () => {
    if (selectedFiles.length > 0) {
      onProcessFiles(selectedFiles);
    }
  };

  const removeFile = (fileName) => {
    setSelectedFiles(prevFiles => prevFiles.filter(f => f.name !== fileName));
  };

  return (
    <div className="file-uploader">
      <p>Upload your document(s) to get extracted data from.</p>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".pdf,.doc,.docx,.xls,.xlsx"
      />
      <Button onClick={() => fileInputRef.current.click()} disabled={isProcessing}>
        Click to Upload Documents
      </Button>
      {selectedFiles.length > 0 && (
        <div className="file-list">
          <h4>Selected Files:</h4>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>
                <span>{file.name} ({Math.round(file.size / 1024)} KB)</span>
                <button onClick={() => removeFile(file.name)} disabled={isProcessing}>✖</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedFiles.length > 0 && (
        <Button onClick={handleUploadClick} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Process Files'}
        </Button>
      )}
    </div>
  );
};

export default FileUploader;
