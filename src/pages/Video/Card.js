import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
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
  thumbnail,
  category,
  CardContainer,
  ThumbnailContainer,
  TextContainer,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${id}`);
  };

  return (
    <>
      <CardContainer onClick={handleClick}>
        <ThumbnailContainer>
          <img src={thumbnail} alt={title} />
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
    </>
  );
};

export default Card;
