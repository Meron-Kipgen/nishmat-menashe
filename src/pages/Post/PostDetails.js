import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import postData from "./postData";
import styled from "styled-components";
import Suggestion from "./Suggestion";
import Comments from "./Comments";
import Menus from "./Menus";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 50px;
`;

const PostContainer = styled.div`
  max-width: 800px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Post = styled.div`
  padding: 40px;
  h1{
  margin-bottom: 7px;
  }
  h5{
    margin-bottom: 40px;
    font-size: 1rem;
  }
  p{
    font-size: ${props => props.fontSize}px; /* Apply font size dynamically */
    line-height: 1.7rem;
  }
  
`;

const SuggestionContainer = styled.div`
  background: white;
  margin-right: 40px;
  width: 400px;
`;

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = postData.find((post) => post.id === parseInt(id));

  const [fontSize, setFontSize] = useState(16); // Default font size

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleClose = () => {
    navigate(-1);
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2); // Increase font size by 2px
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(prevSize - 2, 12)); // Decrease font size by 2px, with a minimum of 12px
  };

  const { author, category, subcategory } = post;

  return (
    <Container>
      <PostContainer>
        <Menus views={post.views} handleClose={handleClose} increaseFont={increaseFontSize} decreaseFont={decreaseFontSize} />
        <Post fontSize={fontSize}>
          <h1>{post.title}</h1>
          <h5>by: {post.writer} 2 months ago</h5>
          <p>{post.body}</p>
         
        </Post> 
        <Comments comments={post.comments} />
      </PostContainer>

      <SuggestionContainer>
        <Suggestion
          author={author}
          category={category}
          subcategory={subcategory}
          postId={post.id}
          postData={postData}
        />
      </SuggestionContainer>
    </Container>
  );
};

export default PostDetails;
