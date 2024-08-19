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
import Loading from '../../components/Loading';
import SidebarLeft from './SidebarLeft';
import RightSidebar from './RightSidebar';
import { useSwipeable } from 'react-swipeable';

const Container = styled.section`
margin-top: 45px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const Middle = styled.section`
  width: 600px;
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

const Left = styled.section`
  margin-top: 10px;
  width: 300px;
  height: 50vh;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    margin-top: 0;
    position: absolute;
    z-index: 20;
    width: 100%;
    top: 45;
    height: 100vh;
    transform: translateX(${props => (props.show ? '0' : '-100%')});
  }
`;

const Right = styled.section`
  margin-top: 10px;
  width: 400px;
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

const ToggleButton = styled.div`
  position: fixed;
  top: 0px;
  left: 20px;
  z-index: 1001;
  margin-top: -2px;
  cursor: pointer;
  display: none; 

  @media (max-width: 768px) {
    display: block; 
  }

  @media (max-width: 480px) {
    top: 10px;
    left: 10px;
  }
`;

const StyledSVG = styled.svg`
  width: 30px;
  height: 30px;
  fill: white;
  transition: transform 0.6s; 
  transform: ${({ flipped }) => (flipped ? 'rotate(180deg)' : 'rotate(0deg)')}; 
`;

const Feed = () => {
  const { posts, loading, error } = usePosts();
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false); // Sidebar hidden by default
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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (showSidebar) setShowSidebar(false);
    },
    onSwipedRight: () => {
      if (!showSidebar) setShowSidebar(true);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  if (loading) return <Loading />;
  if (error) return <div>Error loading posts: {error}</div>;

  return (
    <Container>
      <ToggleButton onClick={() => setShowSidebar(prev => !prev)}>
        <StyledSVG flipped={showSidebar} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path d="M127.6 259h768.9c35.4 0 64.1-28.7 64.1-64.1s-28.7-64.1-64.1-64.1H127.6c-35.4 0-64.1 28.7-64.1 64.1S92.2 259 127.6 259zM896.4 765H127.6c-35.4 0-64.1 28.7-64.1 64.1s28.7 64.1 64.1 64.1h768.9c35.4 0 64.1-28.7 64.1-64.1S931.8 765 896.4 765zM127.6 576.1H512c35.4 0 64.1-28.7 64.1-64.1s-28.7-64-64.1-64H127.6c-35.4 0-64.1 28.7-64.1 64.1s28.7 64 64.1 64zM938.8 477l-159.1-88.4c-28.2-15.6-62.8 4.7-62.7 36.9v176.7c0 32.2 34.6 52.6 62.8 36.9l159.1-88.4c28.8-15.9 28.8-57.6-0.1-73.7z"/>
        </StyledSVG>
      </ToggleButton>

      <Left show={showSidebar} {...swipeHandlers}>
        <SidebarLeft />
      </Left>

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
      
      <Right>
        <RightSidebar />
      </Right>
    </Container>
  );
};

export default Feed;
