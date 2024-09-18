import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimeAgo from "../../utils/TimeAgo"; 
import { useVideosData } from "./useVideosData";



const Card = ({
  id,
  title,
  rabbi,
  poster,
  category,
  subcategory,
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
        <h3>{rabbi} ⁃ <TimeAgo createdAt={createdAt} /></h3>
        <p> {category} ⁃ {subcategory} </p>
        <p> Views:{views}   </p>
         
  
      </TextContainer>
    </CardContainer>
  );
};

export default Card;
