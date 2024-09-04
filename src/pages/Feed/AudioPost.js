import styled from "styled-components";
import TimeAgo from "../../utils/TimeAgo";
import { useSermonsData } from "../Audio/Sermons/useSermonsData";
import useCommentsData from "../../Features/Comment/useCommentsData";
import CommentBox from "../../Features/Comment/CommentBox";
import { CommentIcon } from "../../Assets/Icons";
import { useNavigate } from "react-router-dom";

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  padding: 15px;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Thumbnail = styled.div`
  width: 120px;
  height: 120px;
  background: #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 16px;
    color: #333;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
  h5 {
    padding-top: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
  p {
    margin-top: 10px;
    color: #666;
    font-size: 12px;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterText = styled.div`
  font-size: 0.8rem;
`;

const PlayButton = styled.div`
  position: absolute;
  display: flex;
  top: 80px;
  right: 20px;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 1px solid #142b42;
  border-radius: 50%;
  color: #142b42;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.3s, transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
const CommentBoxContainer = styled.div`
border-top: 1px solid #ccc;
`

const AudioPost = ({ post }) => {
  const { updatePlayed } = useSermonsData();
  const navigate = useNavigate();
  const {
    comments,
   
    createComment,

  } = useCommentsData(post.$id);

  if (!post) {
    return <div>Loading...</div>; // Handle undefined post gracefully
  }

  const handlePlay = () => {
    navigate(`/Audio/Sermon/${post.$id}`);
    updatePlayed(post.$id);
  };

  return (
    <>
      <CardContainer>
        <Thumbnail>
          <img src={post.thumbnail} alt={`${post.title} thumbnail`} />
        </Thumbnail>
        <Content>
          <Header>
            <h1>{post.title}</h1>
            <h5>
              {post.category} ⁃ {post.subcategory}
            </h5>
            <p>
              By: {post.rabbi} ⁃ <TimeAgo createdAt={post.$createdAt} />
            </p>
          </Header>
          <FooterContainer>
            <FooterText>
              {post.played} Played ⁃{" "}
              <CommentIcon height="20px" width="20px" stroke="red" />{" "}
              {comments.length} {comments.length > 0 ? "Comments" : "Comment"}
            </FooterText>
            <PlayButton onClick={() => handlePlay(post.audioUrl)}>
              play
            </PlayButton>
          </FooterContainer>
        </Content>
      </CardContainer>

      <CommentBoxContainer>
          <CommentBox postId={post.$id} createComment={createComment} />
      </CommentBoxContainer>
    </>
  );
};

export default AudioPost;
