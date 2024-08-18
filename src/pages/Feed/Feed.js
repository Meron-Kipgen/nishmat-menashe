import React, { useState, useEffect, useRef } from 'react';
import { usePosts } from './usePosts';
import VideoPost from './VideoPost';
import AudioPost from './AudioPost';
import ArticlePost from './ArticlePost';
import QnAPost from './QnAPost';
import FeedbackPost from './FeedbackPost';
import PodcastPost from './PodcastPost';
import styled from 'styled-components';
import Feedback from '../../Features/Feedback/Feedback';
import Loading from '../../components/Loading'; // Import the Loader component

const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 10px;
`;

const Left = styled.section`
  width: 300px;
  background: white;
  height: 80vh;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Middle = styled.section`
  width: 700px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 20px); 
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;  
  
  &::-webkit-scrollbar {
    display: none; 
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PostContainer = styled.section`
  width: 100%;
  background: white;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Right = styled.section`
  width: 400px;
  background: white;
  height: 80vh;
  @media (max-width: 768px) {
    display: none;
  }
`;

const PostWrapper = styled.div`
  border-radius: 8px;
  background: #ffffff;
`;

const LoadingMessage = styled.p`
  text-align: center;
  margin: 20px 0;
  color: #888;
`;

const Feed = () => {
  const { posts, loading, error } = usePosts();
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const containerRef = useRef(null);

  const postsPerPage = 10;

  useEffect(() => {
    if (posts.length > 0) {
      setVisiblePosts(posts.slice(0, postsPerPage));
    }
  }, [posts]);

  const loadMorePosts = () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    // Simulate fetching more posts
    setTimeout(() => {
      const nextPosts = posts.slice(visiblePosts.length, visiblePosts.length + postsPerPage);
      setVisiblePosts(prev => [...prev, ...nextPosts]);

      if (visiblePosts.length + nextPosts.length >= posts.length) {
        setHasMore(false);
      }

      setLoadingMore(false);
    }, 1000); // Simulate network delay
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 5) {
          loadMorePosts();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [visiblePosts, hasMore, loadingMore]);

  if (loading) return <Loading />;
  if (error) return <div>Error loading posts: {error}</div>;

  return (
    <Container>
      <Left>left</Left>
      
      <Middle ref={containerRef}>
        <Feedback />
        {visiblePosts.map(post => (
          <PostContainer key={post.$id}>
            <PostWrapper>
              {post.type === 'video' && <VideoPost post={post} />}
              {post.type === 'audio' && <AudioPost post={post} />}
              {post.type === 'article' && <ArticlePost post={post} />}
              {post.type === 'QnA' && <QnAPost post={post} />}
              {post.type === 'podcast' && <PodcastPost post={post} />}
              {post.type === 'feedback' && <FeedbackPost post={post} />}
            </PostWrapper>
          </PostContainer>
        ))}
        {loadingMore && <LoadingMessage>Loading more posts...</LoadingMessage>}
        {!hasMore && <LoadingMessage>No more posts to load</LoadingMessage>}
      </Middle>
      <Right>right</Right>
    </Container>
  );
};

export default Feed;
