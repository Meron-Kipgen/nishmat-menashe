import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDataContext } from "../../contexts/videosDataContext"; // Ensure correct path to DataContextProvider

const UpdateButtonStyled = styled.button`
  background-color: #ffc107;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
`;

const ModalContainer = styled.div`
  display: ${props => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Update = ({ videoId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
    rabbi: "",
    category: "",
    thumbnail: "",
    poster: "",
    videoUrl: "",
  });

  const { getDocument, updateVideo } = useDataContext(); // Destructure getDocument and updateVideo from context

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const document = await getDocument(videoId); // Use getDocument from context
        console.log("Fetched video data:", document);

        setUpdatedData({
          title: document.title || "",
          description: document.description || "",
          rabbi: document.rabbi || "",
          category: document.category || "",
          thumbnail: document.thumbnail || "",
          poster: document.poster || "",
          videoUrl: document.videoUrl || "",
        });
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    if (isOpen && videoId) {
      fetchVideoData();
    }
  }, [isOpen, videoId, getDocument]);

  const handleUpdate = async () => {
    try {
      await updateVideo({ videoId, updatedData }); // Use updateVideo from context
      setIsOpen(false); // Close modal after successful update
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  return (
    <>
      <UpdateButtonStyled onClick={openModal}>
        Update Video
      </UpdateButtonStyled>
      <ModalContainer isOpen={isOpen}>
        <ModalContent>
          <FormGroup>
            <Label>Title:</Label>
            <Input
              type="text"
              name="title"
              value={updatedData.title}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Description:</Label>
            <Input
              type="text"
              name="description"
              value={updatedData.description}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Rabbi:</Label>
            <Input
              type="text"
              name="rabbi"
              value={updatedData.rabbi}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Thumbnail URL:</Label>
            <Input
              type="text"
              name="thumbnail"
              value={updatedData.thumbnail}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Poster URL:</Label>
            <Input
              type="text"
              name="poster"
              value={updatedData.poster}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Category:</Label>
            <Input
              type="text"
              name="category"
              value={updatedData.category}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Video URL:</Label>
            <Input
              type="text"
              name="videoUrl"
              value={updatedData.videoUrl}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default Update;
