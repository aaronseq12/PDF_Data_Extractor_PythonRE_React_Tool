// Description: Utility functions for file operations like downloading.

export const downloadFileAsCSV = (data, fileName) => {
    // In a real app, you might get a file blob from the server.
    // For this demo, we convert the JSON data to a CSV string.
    if (!data.length) return;

    const headers = Object.keys(data[0]);
    const csvRows = [
        headers.join(','),
        ...data.map(row =>
            headers.map(fieldName =>
                JSON.stringify(row[fieldName], (key, value) => value === null ? '' : value)
            ).join(',')
        )
    ];
    const csvString = csvRows.join('\r\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(`Downloading ${fileName}`);
};
