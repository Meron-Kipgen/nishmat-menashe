import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Suggestion from "./Suggestion";
import Menus from "./Menus";
import UpdateArticleForm from "./UpdateArticleForm"; // Adjust the path if necessary
import { useArticlesData } from "./useArticlesData";
import DOMPurify from "dompurify";
import TimeAgo from "../../utils/TimeAgo";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 50px;
`;

const PostContainer = styled.div`
  width: 800px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Post = styled.div`
  padding: 40px;
  h1 {
    margin-bottom: 7px;
  }
  h5 {
    margin-bottom: 40px;
    font-size: 1rem;
    color: grey;
    font-weight: 500;
  }
`;

const Body = styled.div`
  font-size: ${(props) => props.fontSize}px; /* Apply font size dynamically */
  line-height: 1.7rem;

  p {
    margin-bottom: 10px;
  }
`;

const SuggestionContainer = styled.div`
  background: white;
  margin-right: 40px;
  width: 400px;
`;

const PostDetails = () => {
  const { articleData } = useArticlesData();
  const { id } = useParams();
  const navigate = useNavigate();
  const post = articleData.find((post) => post.$id === id);

  const [fontSize, setFontSize] = useState(16); 
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleClose = () => {
    navigate(-1);
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2); 
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(prevSize - 2, 12)); 
  };

  const handleShowUpdateForm = () => {
    setShowUpdateForm(true);
  };

  const { author, category, subcategory } = post;

  return (
    <Container>
      <PostContainer>
        <Menus
          views={post.views}
          handleClose={handleClose}
          increaseFont={increaseFontSize}
          decreaseFont={decreaseFontSize}
          articleId={post.$id}
          onShowUpdateForm={handleShowUpdateForm}
        />
        <Post>
          <h1>{post.title}</h1>
          <h5>By: {post.writer} - <TimeAgo createdAt={post.$createdAt} /></h5>
          <Body fontSize={fontSize}>
            {post.body && (
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }} />
            )}
          </Body>
        </Post>
        {showUpdateForm && (
          <UpdateArticleForm articleId={post.$id} onClose={() => setShowUpdateForm(false)} />
        )}
      </PostContainer>

      <SuggestionContainer>
        <Suggestion
          author={author}
          category={category}
          subcategory={subcategory}
          postId={post.$id}
          postData={articleData}
        />
      </SuggestionContainer>
    </Container>
  );
};

export default PostDetails;
