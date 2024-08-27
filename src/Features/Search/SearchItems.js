import React from "react";
import styled from "styled-components";

const PostItemWrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  background: ${props => {
    switch (props.category) {
      case 'audio':
        return '#e0f7fa'; // Light blue for audio
      case 'video':
        return '#f1f8e9'; // Light green for video
      case 'article':
        return '#fff3e0'; // Light orange for article
      case 'QnA':
        return '#fce4ec'; // Light pink for QnA
      case 'feedback':
        return '#e8f5e9'; // Light green for feedback
      default:
        return '#ffffff'; // Default white
    }
  }};
  border-left: 5px solid ${props => props.relevance > 0 ? '#007bff' : '#ddd'};
`;

const VideoContent = styled.div`
  /* Style specific to video content */
`;

const AudioContent = styled.div`
  /* Style specific to audio content */
`;

const QuestionContent = styled.div`
  /* Style specific to question content */
`;

const SearchItems = ({ post }) => {
  const renderContent = () => {
    switch (post.type) {
      case 'video':
        return (
          <VideoContent>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <a href={post.videoUrl} target="_blank" rel="noopener noreferrer">Watch Video</a>
          </VideoContent>
        );
      case 'audio':
        return (
          <AudioContent>
            <h2>{post.title}</h2>
            <img src={post.thumbnail} alt={post.title} />
            <p>{post.description}</p>
            <audio controls>
              <source src={post.audioUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </AudioContent>
        );
      case 'QnA':
        return (
          <QuestionContent>
            <h2>{post.question}</h2>
            <p>{post.answer}</p>
          </QuestionContent>
        );
      default:
        return (
          <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        );
    }
  };

  return (
    <PostItemWrapper category={post.category} relevance={post.relevance}>
      {renderContent()}
    </PostItemWrapper>
  );
};

export default SearchItems;
