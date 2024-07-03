import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TimeAgo from "../../components/TimeAgo"; 
import { useDataContext } from '../../contexts/videosDataContext'; // Adjust the path

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Card = ({
  id,
  title,
  rabbi,
  poster,
  category,
  createdAt,
  thumbnail,
  CardContainer,
  ThumbnailContainer,
  TextContainer,
  views,
  likes,
}) => {
  const navigate = useNavigate();
  const { updateViewCount} = useDataContext(); // Access the updateViewCount function
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = async () => {
    await updateViewCount(id); // Increment the view count
    navigate(`/video/${id}`); // Navigate to the video details page
  };

  return (
    <CardContainer onClick={handleClick}>
      <ThumbnailContainer
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <img src={thumbnail} alt={title} />
        ) : (
          <img src={poster} alt={title} />
        )}
      </ThumbnailContainer>

      <TextContainer>
        <h1>{title}</h1>
        <p>
          <TimeAgo createdAt={createdAt} /> | {category}
        </p>
        <CardFooter>
          <h3>{rabbi}</h3><span>{views}</span> <span>likes:{likes} </span>
         
        </CardFooter>
      </TextContainer>
    </CardContainer>
  );
};

export default Card;
