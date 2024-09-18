import React, { useState } from "react";
import styled from "styled-components";
import useMediaQuery from "../../hooks/useMediaQuery"; // Import your useMediaQuery hook path

const DescriptionContainer = styled.article`
  padding: 10px 0;
  width: 80%;
  button {
    border: none;
    background: none;
    color: blue;
    font-size: 17px;
  }
`;

const Description = ({ description }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)"); // Check if the screen width is less than or equal to 768px

  if (!description) {
    return null; // Handle case where description is undefined or null
  }

  // Split description if it contains more than 6 words, otherwise use the full description
  const truncatedDescription =
    description.split(" ").length > 6
      ? description.split(" ").slice(0, 6).join(" ")
      : description;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <DescriptionContainer>
      {isMobile ? (
        <>
          {showFullDescription ? description : truncatedDescription}{" "}
          {description.split(" ").length > 6 &&
            (!showFullDescription ? (
              <button onClick={toggleDescription}>....Read more</button>
            ) : (
              <button onClick={toggleDescription}>....Show less</button>
            ))}
        </>
      ) : (
        <>
          {showFullDescription ? description : truncatedDescription}
          {description.split(" ").length > 6 &&
            (!showFullDescription ? (
              <button onClick={toggleDescription}>....Read more</button>
            ) : (
              <button onClick={toggleDescription}>....Show less</button>
            ))}
        </>
      )}
    </DescriptionContainer>
  );
};

export default Description;
