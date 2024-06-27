import styled from "styled-components";
import Card from "./Card";

const RelatedContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    height: 0; /* Remove scrollbar space */
  }
`;
const CardContainer = styled.div`
  transition: background-color 0.3s ease-in-out;
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 10px;
  margin: 10px 0;
  padding: 5px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background-color: rgba(255, 255, 255, 0.5);

  &:hover {
    cursor: pointer;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.6);
  }
`;
const ThumbnailContainer = styled.div`
  flex: 1;
  margin-right: 10px;
  img {
    height: 100%;
    width: 100%;
    border-radius: 10px;
  }
`;
const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    font-size: 1.1rem;
    font-weight: 500;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
  }
  h3 {
    font-size: 1rem;
    font-weight: 400;
  }
  p {
    color: rgb(226, 25, 114);
  }
`;
const Related = ({ baseTitle, videos }) => {
  const getCommonPrefix = (title) => {
    const regex = /\d/;
    const match = regex.exec(title);
    if (match) {
      return title.substring(0, match.index).trim();
    }
    return title;
  };

  const getRelatedVideos = (baseTitle, allVideos) => {
    const commonPrefix = getCommonPrefix(baseTitle);
    return allVideos.filter(video => {
      const videoPrefix = getCommonPrefix(video.title);
      return videoPrefix === commonPrefix && video.title !== baseTitle;
    });
  };

  const relatedVideos = getRelatedVideos(baseTitle, videos);

  return (
    <RelatedContainer>
      <h2>Related Videos</h2>
      <ul>
        {relatedVideos.map((video, index) => (
           <Card
           key={index}
           thumbnail={video.thumbnail}
           id={video.id}
           title={video.title}
           rabbi={video.rabbi}
           date={video.date}
           videoUrl={video.videoUrl}
           category={video.category}
           CardContainer={CardContainer}
           TextContainer={TextContainer}
           ThumbnailContainer={ThumbnailContainer}
         />
        ))}
      </ul>
    </RelatedContainer>
  );
};

export default Related;
