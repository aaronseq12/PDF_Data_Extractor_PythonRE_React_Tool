# PDF Data Extractor Tool

An internal tool designed to streamline the process of extracting structured data from PDF documents. This application provides a user-friendly interface for uploading files, processing them through a backend script, and viewing the extracted information in a clear, tabular format. It also includes user authentication and an audit trail for tracking activities.

## ✨ Features

* **Secure User Authentication**: Login and Signup functionality to ensure only authorized personnel can access the tool.
* **File Upload**: Easily upload multiple PDF documents at once.
* **Data Extraction**: Processes uploaded PDFs to extract relevant data points.
* **Tabular Data Display**: View the extracted data in a clean, organized table.
* **CSV Export**: Download the extracted data as a CSV file for offline analysis or use in other applications.
* **Audit Log**: Tracks key user actions such as logins, file processing, and downloads for accountability.
* **Responsive UI**: A modern and responsive interface built with React and styled with custom CSS for a seamless user experience.

## 🚀 Technologies Used

* **Frontend**:
    * [React](https://reactjs.org/)
    * [Vite](https://vitejs.dev/)
    * JavaScript (ES6+)
    * CSS3 with custom properties for theming
* **Backend (assumed)**:
    * Python
    * Flask (or a similar web framework)

## 📦 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js and npm (or yarn) installed.
* Python and pip installed.
* A running backend server that handles the file processing.

### Frontend Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/aaronseq12/pdf_data_extractor_vite_react_tool.git](https://github.com/aaronseq12/pdf_data_extractor_vite_react_tool.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd pdf_data_extractor_vite_react_tool
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Backend Setup (Example)

This project requires a backend to handle the file processing. The frontend is configured to communicate with a server running on `http://127.0.0.1:5000`.

1.  **Create a Python virtual environment (recommended):**
    ```sh
    python -m venv venv
    source venv/bin/activate # On Windows use `venv\Scripts\activate`
    ```
2.  **Install necessary Python packages:**
    *You will need to create a `requirements.txt` file based on your Python script's dependencies.*
    ```sh
    pip install Flask flask-cors PyPDF2 pandas # etc.
    ```
3.  **Run the Flask application:**
    ```sh
    python your_backend_app.py
    ```

## Usage

1.  **Create an Account**: Use the "Create an account" link on the login page.
2.  **Login**: Sign in with your SSOID and password.
3.  **Upload Files**: On the main page, click "Click to Upload Documents" to select the PDFs you want to process.
4.  **Process Files**: Once files are selected, click the "Process Files" button.
5.  **View and Download**: The application will display the extracted data in a table. You can then download this data as a CSV file using the "Download Excel" button.
6.  **Audit Log**: Click "Show Audit Log" to view a history of actions performed within the tool.

## Components

The application is structured into several reusable React components:

* `App.jsx`: The main component that handles routing and state management.
* `Login.jsx`: Handles user login.
* `SignUp.jsx`: Handles new user registration.
* `FileUploader.jsx`: A component for selecting and uploading files.
* `PdfSubmit.jsx`: The main dashboard view for authenticated users.
* `Processing.jsx`: A loading indicator shown while files are being processed.
* `ExtractedData.jsx`: Displays the extracted data in a table and provides download/logout functionality.
* `AuditLog.jsx`: Displays the audit trail.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
