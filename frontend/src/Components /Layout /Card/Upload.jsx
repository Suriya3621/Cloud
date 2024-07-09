import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../Firebase/config.js';
import { useCookies } from 'react-cookie';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import '../Styles /Upload.css'; // Adjust path as necessary
import FileCard from './FileCard.jsx'; // Adjust path as necessary
import { FaPlus } from 'react-icons/fa';
import { GoUpload } from 'react-icons/go';

function FileUpload({ folderPath = 'files', onUpload }) {
  const [file, setFile] = useState(null);
  const [nickname, setNickname] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadRow, setUploadRow] = useState(false);
  const [cookies] = useCookies(['pass']);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = cookies.pass;

  useEffect(() => {
    const fetchFiles = async () => {
      const filesCollection = collection(db, 'uploadedFiles');
      const filesSnapshot = await getDocs(filesCollection);
      const filesList = filesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUploadedFiles(filesList.filter(file => file.user === userId));
    };

    fetchFiles();
  }, [userId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
  if (file) {
    const storageRef = ref(storage, `${folderPath}/${file.name}`);
    
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      addFileToFirestore(file.name, downloadURL);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  toggleUploadRow();
};

  const addFileToFirestore = async (fileName, downloadURL) => {
    try {
      const docRef = await addDoc(collection(db, 'uploadedFiles'), {
        name: fileName,
        url: downloadURL,
        nickname: nickname,
        size: (file.size / 1048576).toFixed(2),
        user: userId
      });
      console.log('Document written with ID: ', docRef.id);
      setUploadedFiles([...uploadedFiles, { name: fileName, url: downloadURL, nickname: nickname, size: (file.size / 1048576).toFixed(2), user: userId }]);
      if (onUpload) {
        onUpload(downloadURL);
      }
      setFile(null);
      setNickname('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleDelete = async (fileId, fileName) => {
    try {
      const storageRef = ref(storage, `${folderPath}/${fileName}`);
      await deleteObject(storageRef);
      await deleteDoc(doc(db, 'uploadedFiles', fileId));
      setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
      console.log('File deleted successfully!');
    } catch (error) {
      console.error('Error deleting file: ', error);
    }
  };

  const toggleUploadRow = () => {
    setUploadRow(!uploadRow);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFiles = uploadedFiles.filter(file =>
    file.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="file-upload-grid">
      <input
        type="text"
        placeholder="Search by nickname..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control"
      />

      <button onClick={toggleUploadRow} className="btn btn-info">
        <FaPlus /> Upload
      </button>

      {uploadRow && (
        <div className="popup">
          <div className="popup-content">
            <button className="popup-close" onClick={toggleUploadRow}>
              &times;
            </button>
            <div className="upload-row">
              <input type="file" onChange={handleFileChange} className="form-control" />
              <input
                type="text"
                placeholder="Enter nickname"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                className="form-control"
              />
              <button onClick={handleUpload}>
                <GoUpload /> Upload
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="file-list">
        {filteredFiles.map((file, index) => (
          <FileCard
            key={index}
            fileId={file.id}
            fileName={file.name}
            nickname={file.nickname}
            fileSize={file.size}
            fileUrl={file.url}
            fileUser={file.user}
            onDelete={() => handleDelete(file.id, file.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
