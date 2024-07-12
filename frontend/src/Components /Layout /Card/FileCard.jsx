import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase/config.js';
import '../Styles /FileCard.css'; // Ensure there's no space in the import path
import { useCookies } from 'react-cookie';
import { IoIosCloudDownload } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

function FileCard({ fileId, fileName, nickname, fileSize, fileUrl, fileUser, onDelete }) {
  const [userData, setUserData] = useState([]);
  const [cookies] = useCookies(['theme']);
  const [theme, setTheme] = useState(cookies.theme || 'light');
  const videoRef = useRef(null); // Ref for video or audio element

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = [];
        const collectionsRef = collection(db, 'Users');
        const querySnapshot = await getDocs(collectionsRef);
        querySnapshot.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setUserData(results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTheme(cookies.theme);
  }, [cookies]);

  const user = userData.find(user => user.id === fileUser);

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      onDelete(fileId);
    }
  };

  const getFileExtension = (fileName) => {
    return fileName.split('.').pop().toLowerCase();
  };

  // Render content based on file extension
  let fileContent;
  const fileExtension = getFileExtension(fileName);
  if (['jpg', 'png', 'jpeg', 'svg'].includes(fileExtension)) {
    fileContent = <img src={fileUrl} alt="File" className="preview" />;
  } else if (['mp4'].includes(fileExtension)) {
    fileContent = (
      <div className="video-container">
        <video ref={videoRef} src={fileUrl} controls className="responsive-video preview">
          Your browser does not support the video tag.
        </video>
      </div>
    );
  } else if (['mp3'].includes(fileExtension)) {
    fileContent = (
      <div className="audio-container">
        <audio ref={videoRef} src={fileUrl} controls className="responsive-audio preview">
          Your browser does not support the audio tag.
        </audio>
      </div>
    );
  } else {
    fileContent = <h2>Extension: {fileExtension}</h2>;
  }

  return (
    <div className={`file-card ${theme}`}>
      {user && <h4>Uploaded by: {user.name}</h4>}
      <div className="centered">
        <div className="box">
          {fileContent}
        </div>
      </div>
      <div>
        <h3>{nickname}</h3>
        <p className="text-muted">{fileName}</p>
      </div>
      <p>{fileSize} MB</p>
      {fileUrl && (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="download-link">
          <IoIosCloudDownload />
        </a>
      )}
      <button onClick={handleDeleteClick} className={`delete-button btn btn-${theme}`}>
        <MdDelete />
      </button>
    </div>
  );
}

export default FileCard;