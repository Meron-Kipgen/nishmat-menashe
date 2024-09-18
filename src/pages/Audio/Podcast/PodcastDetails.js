import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePodcastData } from "./usePodcastData";
import AddEpisodeForm from "./AddEpisodeForm";
import AudioPlayer from "../../../Features/AudioPlayer/AudioPlayer";
import playerVars from "../../../Features/AudioPlayer/PlayerVars";
import EditPodcast from "./EditPodcast";
import styled from "styled-components";
import UpdateEpisodeForm from "./UpdateEpisodeForm";
import { UserContext } from "../../../contexts/UserContext";
import CommentsSection from "../../../Features/Comment/CommentSection";
import useCommentsData from "../../../Features/Comment/useCommentsData";
const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const PlayerContainer = styled.div`
  height: 220px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      width: 100%;
      height: auto;
    }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Rabbi = styled.h5`
  font-size: 20px;
  color: #666;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  color: #444;
  margin-bottom: 30px;
  line-height: 1.8;
  text-align: justify;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #ffffff;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 14px;
  }
`;

const EpisodeContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const EpisodeTitle = styled.h3`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const EpisodeActions = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const EpisodeButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 5px 8px;
    font-size: 12px;
  }
`;
const LeftContainer = styled.div`
  width: 300px;
`;
const RightContainer = styled.div`
  width: 500px;
`;
const EpisodeWrapper = styled.div`
  width: 500px;
`;
const NextPrevious = styled.div`
  position: absolute;
  top: 60px;
  width: 94%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NextAndPreviousButton = styled.div`
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 40px;
  cursor: pointer;
`;
const Buttoncontainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TitleAndBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MiddleContainer = styled.div`
  flex: 1;
`;
const PodcastDetails = () => {
  const { id } = useParams();
  const { podcastData, fetchEpisodes, deletePodcast, deleteEpisode } =
    usePodcastData();
  const [isAddingEpisode, setIsAddingEpisode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingEpisode, setIsUpdatingEpisode] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(null);
  const [selectedAudioUrl, setSelectedAudioUrl] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const navigate = useNavigate();
  const podcast = podcastData.find(podcast => podcast.$id === id);
  const { isAdmin } = useContext(UserContext);
  const {
    comments,
    loading,
    error,
    updateComment,
    deleteComment,
    createComment,
  } = useCommentsData(podcast?.$id);

  useEffect(() => {
    if (podcast) {
      const loadEpisodes = async () => {
        const episodes = await fetchEpisodes(podcast.$id);
        setEpisodes(episodes);
      };
      loadEpisodes();
    }
  }, [podcast, fetchEpisodes]);

  if (!podcast) {
    return <div>Podcast not found</div>;
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this podcast?")) {
      await deletePodcast(podcast.$id);
      navigate(`/Audio/Podcast`);
    }
  };

  const handleDeleteEpisode = async episodeId => {
    if (window.confirm("Are you sure you want to delete this episode?")) {
      await deleteEpisode(episodeId);
      setEpisodes(episodes.filter(episode => episode.$id !== episodeId));
    }
  };

  const handlePlayEpisode = index => {
    setCurrentEpisodeIndex(index);
    const episode = episodes[index];
    setSelectedAudioUrl(episode.audioId);
    setSelectedTitle(episode.title);
  };

  const handleNextEpisode = () => {
    if (
      currentEpisodeIndex !== null &&
      currentEpisodeIndex < episodes.length - 1
    ) {
      handlePlayEpisode(currentEpisodeIndex + 1);
    }
  };

  const handlePreviousEpisode = () => {
    if (currentEpisodeIndex !== null && currentEpisodeIndex > 0) {
      handlePlayEpisode(currentEpisodeIndex - 1);
    }
  };

  return (
    <Container>
      <LeftContainer>
        <Thumbnail>
          <img src={podcast.thumbnail} alt={`${podcast.title} thumbnail`} />
        </Thumbnail>
        <Title>{podcast.title}</Title>
        <Rabbi>{podcast.rabbi}</Rabbi>
        <Description>{podcast.description}</Description>
        {isAdmin && (
          <Buttoncontainer>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={() => setIsUpdating(true)}>Update</Button>
            {isUpdating && (
              <EditPodcast
                podcastId={id}
                onClose={() => setIsUpdating(false)}
              />
            )}
          </Buttoncontainer>
        )}
      </LeftContainer>
      <MiddleContainer>
        <PlayerContainer>
          <AudioPlayer
            audioUrl={selectedAudioUrl}
            playerVars={playerVars}
            shouldPlay={true}
          />
          <NextPrevious>
            <NextAndPreviousButton
              onClick={handlePreviousEpisode}
              disabled={currentEpisodeIndex === 0}
            >
              Previous
            </NextAndPreviousButton>
            <NextAndPreviousButton
              onClick={handleNextEpisode}
              disabled={currentEpisodeIndex === episodes.length - 1}
            >
              Next
            </NextAndPreviousButton>
          </NextPrevious>
        </PlayerContainer>
        <CommentsSection
          postId={podcast.$id}
          comments={comments}
          loading={loading}
          error={error}
          createComment={createComment}
          updateComment={updateComment}
          deleteComment={deleteComment}
          maxPosts={comments.length}
        />
      </MiddleContainer>
      <RightContainer>
        <EpisodeWrapper>
          <button onClick={() => setIsAddingEpisode(true)}>Add Episode</button>

          <div>
            <h2>Episodes</h2>
            {episodes.map((episode, index) => (
              <EpisodeContainer key={episode.$id}>
                <h1>Episode: {episode.episodeNum}</h1>
                <TitleAndBtnContainer>
                  <EpisodeTitle>{episode.title}</EpisodeTitle>

                  <EpisodeActions>
                    <EpisodeButton onClick={() => handlePlayEpisode(index)}>
                      Play
                    </EpisodeButton>
                    {isAdmin && (
                      <>
                        <EpisodeButton
                          onClick={() => setIsUpdatingEpisode(episode)}
                        >
                          Update
                        </EpisodeButton>
                        <EpisodeButton
                          onClick={() => handleDeleteEpisode(episode.$id)}
                        >
                          Delete
                        </EpisodeButton>
                      </>
                    )}
                  </EpisodeActions>
                </TitleAndBtnContainer>
              </EpisodeContainer>
            ))}
          </div>

          {isAddingEpisode && (
            <AddEpisodeForm
              podcastId={podcast.$id}
              onClose={() => setIsAddingEpisode(false)}
            />
          )}

          {isUpdatingEpisode && (
            <UpdateEpisodeForm
              episodeId={isUpdatingEpisode.$id}
              onClose={() => setIsUpdatingEpisode(null)}
            />
          )}
        </EpisodeWrapper>
      </RightContainer>
    </Container>
  );
};

export default PodcastDetails;
