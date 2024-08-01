import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TimeAgo from "../../components/TimeAgo"; 
import { useVideosData } from "./useVideosData";

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
}) => {
  const navigate = useNavigate();
  const { updateViews} = useVideosData(); 
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/Video/${id}`);
    updateViews(id); 
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
          <h3>{rabbi}</h3><span>{views}</span>
         
        </CardFooter>
      </TextContainer>
    </CardContainer>
  );
};

export default Card;
