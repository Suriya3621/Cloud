import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { MdOutlineDownload,MdDownloadDone} from "react-icons/md";

const ImageDownloader = ({ url, fileName }) => {
  const [downloading, setDownloading] = useState(false);

  const downloadImage = () => {
    setDownloading(true);
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        saveAs(blob, fileName);
        setDownloading(false);
      })
      .catch(error => {
        console.error('Error downloading the image:', error);
        setDownloading(false);
      });
  };

  return (
    <button
      onClick={downloadImage}
      className='text-primary download-button'
      aria-label='Download Image'
style={{border:"none",backgroundColor:"transparent"}}
>
{downloading ? "Downloading": <MdOutlineDownload /> || <MdDownloadDone/>}
    </button>
  );
};

export default ImageDownloader;
