import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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
`;

const PostWrapper = styled.div`
  border-radius: 8px;
  background: #ffffff;
`;

const Feed = () => {
  const { posts, loading, error } = usePosts();
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const postsPerPage = 10;

  useEffect(() => {
    // Load the initial posts
    if (posts.length) {
      setVisiblePosts(posts.slice(0, postsPerPage));
    }
  }, [posts]);

  const loadMorePosts = () => {
    const nextPosts = posts.slice(visiblePosts.length, visiblePosts.length + postsPerPage);
    setVisiblePosts(prev => [...prev, ...nextPosts]);
    if (visiblePosts.length >= posts.length) {
      setHasMore(false);
    }
  };

  if (loading) return <Loading />; // Show loader while loading initial posts
  if (error) return <div>Error loading posts: {error}</div>;

  return (
    <Container>
      <Left>left</Left>
     
      <Middle>
        <Feedback />
        <InfiniteScroll
          dataLength={visiblePosts.length} // Length of the data loaded so far
          next={loadMorePosts} // Function to load more posts
          hasMore={hasMore} // Whether or not there are more posts to load
          loader={<Loading />} // Use the Loader component while loading more posts
          endMessage={<p>No more posts to load</p>} // Message when all posts are loaded
        >
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
        </InfiniteScroll>
      </Middle>
      <Right>right</Right>
    </Container>
  );
};

export default Feed;
