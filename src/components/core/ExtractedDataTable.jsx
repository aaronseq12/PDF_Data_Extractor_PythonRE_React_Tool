import React, { useMemo } from 'react';

const ExtractedDataTable = ({ data }) => {
  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            {columns.map(col => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map(col => <td key={`${index}-${col}`}>{String(row[col] ?? 'N/A')}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExtractedDataTable;
