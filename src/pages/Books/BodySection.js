import React from "react";
import styled from "styled-components";

const GridItem = styled.div`
  flex: 1 1 calc(50% - 10px);
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChapterTitle = styled.h3`
  font-size: ${({ fontSize }) => `${fontSize}px`};
  margin-top: 20px;
`;

const ChapterSubtitle = styled.p`
  font-size: ${({ fontSize }) => `${fontSize}px`};
  font-style: italic;
  margin-bottom: 10px;
`;

const ChapterHeading = styled.h4`
  font-size: ${({ fontSize }) => `${fontSize}px`};
  margin-top: 10px;
`;

const Chapterbody = styled.p`
  font-size: ${({ fontSize }) => `${fontSize}px`};
  margin-bottom: 20px;
`;

const BodySection = ({
  titleEn,
  titleHe,
  subTitleEn,
  subTitleHe,
  headingEn,
  headingHe,
  bodyEn,
  bodyHe,
  fontSize,
}) => (
  <GridItem>
    {titleEn && <ChapterTitle fontSize={fontSize}>{titleEn}</ChapterTitle>}
    {titleHe && <ChapterTitle fontSize={fontSize}>{titleHe}</ChapterTitle>}
    {subTitleEn && (
      <ChapterSubtitle fontSize={fontSize}>{subTitleEn}</ChapterSubtitle>
    )}
    {subTitleHe && (
      <ChapterSubtitle fontSize={fontSize}>{subTitleHe}</ChapterSubtitle>
    )}
    {headingEn && (
      <ChapterHeading fontSize={fontSize}>{headingEn}</ChapterHeading>
    )}
    {headingHe && (
      <ChapterHeading fontSize={fontSize}>{headingHe}</ChapterHeading>
    )}
    {bodyEn && (
      <Chapterbody fontSize={fontSize}>{bodyEn}</Chapterbody>
    )}
    {bodyHe && (
      <Chapterbody fontSize={fontSize}>{bodyHe}</Chapterbody>
    )}
  </GridItem>
);

export default BodySection;
