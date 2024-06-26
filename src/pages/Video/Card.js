import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Card = ({
  id,
  title,
  rabbi,
  date,
  poster,
  category,
  thumbnail,
  CardContainer,
  ThumbnailContainer,
  TextContainer,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/video/${id}`);
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
          {date} | {category}
        </p>
        <CardFooter>
          <h3>By: {rabbi}</h3>
        </CardFooter>
      </TextContainer>
    </CardContainer>
  );
};

export default Card;
