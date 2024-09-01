import React from "react";
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
import LoadMore from "../../components/LoadMore";
import useLoadMore from "../../hooks/useLoadMore"; 

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
`;

const PostContainer = styled.section`
  width: 100%;
  background: white;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Left = styled.section`
  position: sticky;
  top: 40px;
  margin-top: 10px;
  width: 300px;
  height: 50vh;
  @media (max-width: 768px) {
    margin-top: 0;
    display: none;
  }
`;

const Right = styled.section`
  position: sticky;
  top: 40px;
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

const Feed = () => {
  const { posts, loading, error } = useAllPosts();
  const { visibleItems: visiblePosts, loadMoreItems, hasMore, loadingMore } = useLoadMore(posts, 30);

  if (loading) return <Loading />;
  if (error) return <div>Error loading posts: {error}</div>;

  return (
    <Container>
      <Left>
        <LeftSidebar />
      </Left>

      <Middle>
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
        <LoadMore
          onClick={loadMoreItems}
          loading={loadingMore}
          hasMore={hasMore}
        />
      </Middle>

      <Right>
        <RightSidebar />
      </Right>
    </Container>
  );
};

export default Feed;
