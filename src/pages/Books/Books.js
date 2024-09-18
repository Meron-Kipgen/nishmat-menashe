import styled from "styled-components";

const Container = styled.div`
  margin: 45px auto;
  padding: 10px;
  background-color: #f5f5f5;
 width: 800px; 
 @media (max-width: 760px) {
   width: 100%;
  }
`;

const Section = styled.div`
  flex: 1;
  margin: 0 10px;
  @media (max-width: 760px) {
   margin: 0;
  }
`;

const Title = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
`;

const BookList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 1.2em;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;

  div {
    flex: 1 1 calc(50% - 10px); /* Mobile layout: two items per row */
    padding: 8px 12px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    cursor: pointer;
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide overflowing text */
    text-overflow: ellipsis; /* Add ellipsis for overflowing text */

    &:hover {
      background-color: #f0f0f0;
    }
  }

  @media (min-width: 800px) {
    div {
      flex: 1 1 calc(33.333% - 10px); /* PC layout: three items per row */
    }
  }
`;
const ComingSoon = styled.h1`
text-align: center;
color: red;
`
export default function Books() {
  return (
    <Container>
      <ComingSoon>Coming soon.....</ComingSoon>
      <Section>
        <Title>Torah</Title>
        <BookList>
          <div>Bereshit</div>
          <div>Shemot</div>
          <div>Vayikra</div>
          <div>Bamidbar</div>
          <div>Devrim</div>
        </BookList>
        <Title>Writing</Title>
        <BookList>
          <div>Yehoshua</div>
          <div>Melakhim</div>
        </BookList>
      </Section>
      
      <Section>
        <Title>Neviim</Title>
        <BookList>
          <div>Yehoshua</div>
          <div>Melakhim</div>
        </BookList>
      </Section>
      <Section>
        <Title>Halakha</Title>
        <BookList>
          <div>Daily Halakha</div>
          <div>Shabbat Halakha</div>
        </BookList>
      </Section>
    </Container>
  );
}
