import React, { useState, useEffect, useRef } from "react";
import { useAllPosts } from "./useAllPost";
import VideoPost from "./VideoPost";
import AudioPost from "./AudioPost";
import ArticlePost from "./ArticlePost";
import QnAPost from "./QnAPost";
import FeedbackPost from "./FeedbackPost";
import PodcastPost from "./PodcastPost";
import styled from "styled-components";
import FeedbackForm from "../../Features/Feedback/FeedbackForm";
import Loading from "../../components/Loading";
import RightSidebar from "../../layouts/sidebar/RightSidebar";
import LeftSidebar from "../../layouts/sidebar/LeftSidebar";

const Container = styled.section`
  margin-top: 45px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
  @media (max-width: 768px) {
    width: 100%;
  }
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
    margin-bottom: 40px;
    width: 100%;
    overflow-y: none;
  scrollbar-width: none;
  -ms-overflow-style: none;
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
  @media (max-width: 768px) {
    margin-top: 0;
    display: none;
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

const Feed = () => {
  const { posts, loading, error } = useAllPosts();
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const containerRef = useRef(null);

  const postsPerPage = 10;
  console.log("Posts:", posts);
  useEffect(() => {
    if (posts && posts.length > 0) {
      setVisiblePosts(posts.slice(0, postsPerPage));
    }
  }, [posts]);

  const loadMorePosts = () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const nextPosts = posts.slice(
        visiblePosts.length,
        visiblePosts.length + postsPerPage
      );
      setVisiblePosts(prev => [...prev, ...nextPosts]);

      if (visiblePosts.length + nextPosts.length >= posts.length) {
        setHasMore(false);
      }

      setLoadingMore(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        if (
          container.scrollTop + container.clientHeight >=
          container.scrollHeight - 5
        ) {
          loadMorePosts();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [visiblePosts, hasMore, loadingMore]);

  if (loading) return <Loading />;
  if (error) return <div>Error loading posts: {error}</div>;

  return (
    <Container>
      <Left>
        <LeftSidebar />
      </Left>

      <Middle ref={containerRef}>
        <FeedbackForm />
        {visiblePosts.map(post => (
          <PostContainer key={post.$id}>
            <PostWrapper>
              {post.type === "video" && <VideoPost post={post} />}
              {post.type === "audio" && <AudioPost post={post} />}
              {post.type === "article" && <ArticlePost post={post} />}
              {post.type === "QnA" && <QnAPost post={post} />}
              {post.type === "podcast" && <PodcastPost post={post} />}
              {post.type === "feedback" && <FeedbackPost post={post} />}
            </PostWrapper>
          </PostContainer>
        ))}
        {loadingMore && <LoadingMessage>Loading more posts...</LoadingMessage>}
        {!hasMore && <LoadingMessage>No more posts to load.</LoadingMessage>}
      </Middle>

      <Right>
        <RightSidebar />
      </Right>
    </Container>
  );
};

export default Feed;
