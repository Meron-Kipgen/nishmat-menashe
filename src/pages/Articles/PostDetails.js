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
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PostContainer = styled.div`
  width: 800px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Post = styled.div`
  padding: 40px;
  @media (max-width: 768px) {
    width: 100%;
  }
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
  font-size: ${props => props.fontSize}px; /* Apply font size dynamically */
  line-height: 1.7rem;
  p {
    margin-bottom: 10px;
  }
`;

const SuggestionContainer = styled.div`
  background: white;
  margin-right: 40px;
  width: 400px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Menubar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 30px;
  width: 100%;
  background: white;
  position: sticky;
  top: 45px;
  z-index: 100;
  @media (min-width: 768px) {
    display: none;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 140px;
  right: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  z-index: 200;

  @media (min-width: 768px) {
    display: none; /* Hide on larger screens */
  }
`;

const MenusWrapper = styled.div`
  @media (max-width: 767px) {
    display: none; /* Hide on smaller screens */
  }
`;
const MobileMenu = styled.div`
padding: 6px 5px;
  display: flex;
 gap: 5px;
font-size: 15px;
  align-items: center;
`;

const PostDetails = () => {
  const { articleData } = useArticlesData();
  const { id } = useParams();
  const navigate = useNavigate();
  const post = articleData.find(post => post.$id === id);

  const [fontSize, setFontSize] = useState(16);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility state for mobile

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const increaseFontSize = () => {
    setFontSize(prevSize => prevSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => Math.max(prevSize - 2, 12));
  };

  const handleShowUpdateForm = () => {
    setShowUpdateForm(true);
    setDropdownVisible(false); // Hide dropdown when showing the form
  };

  const toggleDropdown = () => {
    setDropdownVisible(prevVisible => !prevVisible);
  };

  const { author, category, subcategory, title } = post;

  return (
    <Container>
      <Menubar>
        <MobileMenu onClick={handleBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrow-back-up"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 14l-4 -4l4 -4" />
            <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
          </svg>
          Back
        </MobileMenu>
        <MobileMenu>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrows-random"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 21h-4v-4" />
            <path d="M16 21l5 -5" />
            <path d="M6.5 9.504l-3.5 -2l2 -3.504" />
            <path d="M3 7.504l6.83 -1.87" />
            <path d="M4 16l4 -1l1 4" />
            <path d="M8 15l-3.5 6" />
            <path d="M21 5l-.5 4l-4 -.5" />
            <path d="M20.5 9l-4.5 -5.5" />
          </svg>
          Suggestion
        </MobileMenu>
        <MobileMenu>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-box-multiple" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M7 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
  <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
</svg>
          Related
        </MobileMenu>
        <MobileMenu onClick={toggleDropdown}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-settings"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          </svg>
          Setting
        </MobileMenu>
      </Menubar>
      {dropdownVisible && (
        <DropdownMenu>
          <Menus
            increaseFont={increaseFontSize}
            decreaseFont={decreaseFontSize}
            articleId={post.$id}
            onShowUpdateForm={handleShowUpdateForm}
          />
        </DropdownMenu>
      )}
      <PostContainer>
        {/* Always display menu on larger screens */}
        <MenusWrapper>
          <Menus
            handleBack={handleBack}
            increaseFont={increaseFontSize}
            decreaseFont={decreaseFontSize}
            articleId={post.$id}
            onShowUpdateForm={handleShowUpdateForm}
          />
        </MenusWrapper>

        <Post>
          <h1>{post.title}</h1>
          <h5>
            By: {post.writer} - <TimeAgo createdAt={post.$createdAt} />
          </h5>
          <h5>
            {post.category} | {post.subcategory} | Read {post.views}
          </h5>
          <Body fontSize={fontSize}>
            {post.body && (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.body),
                }}
              />
            )}
          </Body>
        </Post>
        {showUpdateForm && (
          <UpdateArticleForm
            articleId={post.$id}
            onClose={() => setShowUpdateForm(false)}
          />
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
