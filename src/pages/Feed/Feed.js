import React from 'react';
import { usePosts } from './usePosts'; // Adjust the path if necessary
import VideoPost from './VideoPost';
import AudioPost from './AudioPost';
import ArticlePost from './ArticlePost';
import QnAPost from './QnAPost';
import styled from 'styled-components';

const Container = styled.section`
width: 100%;
display: flex;
justify-content: center;
gap: 30px;
margin-top: 10px;
`
const Left = styled.section`
width: 300px;
background: white;
`
const Middle =styled.section`
width: 600px;
background: white;
`
const Right = styled.section`
width: 400px;
background: white;
`
const Feed = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <Container>
      <Left>
        left
      </Left>
      <Middle>
        {posts.map(post => {
        switch (post.type) {
          case 'video':
            return <VideoPost key={post.$id} post={post} />;
          case 'audio':
            return <AudioPost key={post.$id} post={post} />;
          case 'article':
            return <ArticlePost key={post.$id} post={post} />;
          case 'QnA':
            return <QnAPost key={post.$id} post={post} />;
          default:
            return null;
        }
      })}
      </Middle>
      
  <Right>
    right
  </Right>
    </Container>
  );
};

export default Feed;
