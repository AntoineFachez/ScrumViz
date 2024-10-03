import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '@/firebase/firebase';
import { useMode } from '@/app/theme/ThemeContext';

function ImageDropzone({}) {
  const [theme, colorMode, palette, styled] = useMode();
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({}); // Track progress for each file
  const storage = getStorage(app);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newSelectedImages = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
      }));

      setSelectedImages([...selectedImages, ...newSelectedImages]);

      newSelectedImages.forEach(({ file }) => {
        const storageRef = ref(storage, `images/${file.name}`);
        handleUpload(storageRef, file);
      });
    },
    [selectedImages]
  );

  const handleUpload = async (storageRef, file) => {
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress((prevProgress) => ({
          ...prevProgress,

          [file.name]: progress,
        }));
      },
      (error) => {
        console.error('Error uploading file:', error);
        // Handle error, maybe update state to reflect the error
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);

          // Optionally, update state to store download URLs
        } catch (error) {
          console.error('Error getting download URL:', error);
          // Handle error
        }
      }
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div {...getRootProps()} style={styled.dropZone}>
      <input {...getInputProps()} />

      {selectedImages.length > 0 ? (
        <div>
          {selectedImages.map((image, index) => (
            <div key={index}>
              <img
                src={image.preview}
                alt={`Selected ${index}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '5rem',
                  objectFit: 'contain',
                }}
              />
              <p>Upload Progress: {uploadProgress[image.file.name] || 0}%</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Drag & drop images here, or click to select</p>
      )}
    </div>
  );
}

export default ImageDropzone;
