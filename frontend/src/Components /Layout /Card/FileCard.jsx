import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase/config.js';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { MdDelete } from 'react-icons/md';
import ImageDownloader from './Preview.jsx';

// Styled components
const FileCardContainer = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: ${props => props.theme === 'dark' ? '#1d1614' : '#fbfbfb'};
  color: ${props => props.theme === 'dark' ? 'white' : 'black'};
`;

const FileCardHeading = styled.h4`
  margin: 0 0 5px;
`;

const FileCardSubheading = styled.h3`
  margin: 10px 0 5px;
`;

const FileCardContent = styled.p`
  margin: 5px 0;
`;

const DownloadLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;

  &:hover {
    color: #c82333;
  }
`;

const Box = styled.div`
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ResponsiveVideo = styled.video`
  width: 100%;
  height: auto;
`;

// FileCard component using styled-components
const FileCard = ({ fileId, fileName, nickname, fileSize, fileUrl, fileUser, onDelete }) => {
  const [userData, setUserData] = useState([]);
  const [cookies] = useCookies(['theme']);
  const [theme, setTheme] = useState(cookies.theme || 'light');
  const videoRef = useRef(null);

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
        console.error('Error fetching user data:', err);
      }
    };

    fetchData();
  }, []); // Empty dependency array means it runs only once on mount

  useEffect(() => {
    setTheme(cookies.theme);
  }, [cookies]); // Update theme state when cookies.theme changes

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      onDelete(fileId);
    }
  };

  const getFileExtension = (fileName) => {
    return fileName.split('.').pop().toLowerCase();
  };

  let fileContent;
  const fileExtension = getFileExtension(fileName);
  if (['jpg', 'png', 'jpeg', 'svg'].includes(fileExtension)) {
    fileContent = <img src={fileUrl} alt="File" className="preview" />;
  } else if (['mp4'].includes(fileExtension)) {
    fileContent = (
      <VideoContainer>
        <ResponsiveVideo ref={videoRef} src={fileUrl} controls className="responsive-video preview">
          Your browser does not support the video tag.
        </ResponsiveVideo>
      </VideoContainer>
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

  const user = userData.find(user => user.id === fileUser);

  return (
    <FileCardContainer theme={theme}>
      {user && <FileCardHeading>Uploaded by: {user.name}</FileCardHeading>}
      <div className="centered">
        <Box>
          {fileContent}
        </Box>
      </div>
      <div>
        <FileCardSubheading>{nickname}</FileCardSubheading>
        <FileCardContent className="text-muted">{fileName}</FileCardContent>
      </div>
      <FileCardContent>{fileSize} MB</FileCardContent>
      {fileUrl && (
        <>
          <DownloadLink href={fileUrl} target="_blank" rel="noopener noreferrer" className="download-link">
            <ImageDownloader url={fileUrl} fileName={fileName} />
          </DownloadLink>
        </>
      )}
      <DeleteButton onClick={handleDeleteClick} className={`delete-button btn btn-${theme}`}>
        <MdDelete />
      </DeleteButton>
    </FileCardContainer>
  );
};

export default FileCard;
