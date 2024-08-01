import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useVideosData } from "./useVideosData";

const FormContainer = styled.form`
  position: absolute;
  top: 60px;
  width: 800px;
  z-index: 1000;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: #6c757d;
  font-size: 20px;
  cursor: pointer;
`;

const Update = ({ videoId, onClose }) => {
  const { updateVideo, videoData } = useVideosData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rabbi, setRabbi] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [poster, setPoster] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const video = videoData.find(video => video.$id === videoId);
    if (video) {
      setTitle(video.title || '');
      setDescription(video.description || '');
      setRabbi(video.rabbi || '');
      setCategory(video.category || '');
      setSubcategory(video.subcategory || '');
      setThumbnail(video.thumbnail || '');
      setPoster(video.poster || '');
      setVideoUrl(video.videoUrl || '');
    }
  }, [videoId, videoData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedVideo = {
      title,
      description,
      rabbi,
      category,
      subcategory,
      thumbnail,
      poster,
      videoUrl
    };

    try {
      await updateVideo(videoId, updatedVideo);
      onClose(); // Close the form after successful update
    } catch (error) {
      console.error('Failed to update video:', error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <FormGroup>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Rabbi:</label>
        <input
          type="text"
          value={rabbi}
          onChange={(e) => setRabbi(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Subcategory:</label>
        <input
          type="text"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Thumbnail URL:</label>
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Poster URL:</label>
        <input
          type="text"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Video URL:</label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
      </FormGroup>
      <SubmitButton type="submit">Update Video</SubmitButton>
    </FormContainer>
  );
};

export default Update;
