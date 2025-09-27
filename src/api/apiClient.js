import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Your Flask server URL
});

export const processFiles = async (files, user) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });
  formData.append('user', JSON.stringify(user));

  try {
    const response = await apiClient.post('/process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'File processing failed');
  }
};
