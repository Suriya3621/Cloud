import React from 'react';
import { saveAs } from 'file-saver';
import { IoIosCloudDownload } from 'react-icons/io';

const ImageDownloader = (url) => {
  const downloadImage = () => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        saveAs(blob, 'downloaded_image.jpg');
      })
      .catch(error => console.error('Error downloading the image:', error));
  };

  return (
    <button onClick={downloadImage} className='text-primary' style={{border:'none',backgroundColor:'transparent'}}><IoIosCloudDownload /></button>
  );
};

export default ImageDownloader;
