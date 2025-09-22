import React, { useState } from "react";
import Layout from "../Components/Layouts";

function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
    setMessage(""); // Clear previous messages when selecting new files
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setMessage("Please select at least one file");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      setUploading(true);
      setMessage(""); // Clear previous messages during upload

      const res = await fetch(
        "http://127.0.0.1:8001/upload?session_id=default",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(
          `Upload successful! Loaded ${data.row_count} rows into session 'default'. You can now search in the chat page.`
        );
      } else {
        setMessage(`Upload failed: ${data.detail || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(
        "Error uploading file. Ensure the backend server is running on http://127.0.0.1:8001."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-4 py-8 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Upload Excel File
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          Supported: .xlsx files (with standard weld point data structure)
        </p>

        <input
          type="file"
          multiple
          accept=".xlsx" // Focused on .xlsx for pd.read_excel(); add .csv if backend is updated
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleUpload}
          disabled={uploading || selectedFiles.length === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? "Uploading..." : "Upload Files"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center px-4 py-2 rounded-lg ${
              message.includes("successful")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </Layout>
  );
}

export default UploadPage;
