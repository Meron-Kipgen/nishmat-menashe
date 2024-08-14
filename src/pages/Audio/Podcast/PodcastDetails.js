import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { usePodcastData } from './usePodcastData'; // Adjust import path as needed
import AudioPlayer from '../../../Features/AudioPlayer/AudioPlayer';
import playerVars from '../../../Features/AudioPlayer/PlayerVars';
import AddEpisode from './AddEpisode';

const Container = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
`;
const ScrollableContainer = styled.div`
  max-height: 600px; /* Adjust as needed */
  overflow-y: auto;
  padding-right: 10px; /* Space for the scrollbar */
  
  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;
const Thumbnail = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

  img {
    width: 60%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
`;

const Rabbi = styled.h5`
  font-size: 20px;
  color: #666;
  margin-bottom: 20px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 18px;
  color: #444;
  margin-bottom: 30px;
  line-height: 1.8;
  text-align: justify;
`;

const SuggestionContainer = styled(ScrollableContainer)`
  width: 300px;
  background: #ffffff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const EpisodeContainer = styled(ScrollableContainer)`
  width: 400px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const PodcastContainer = styled.div`
  width: 700px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const AudioPlayerContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const EpisodeList = styled.div`
  width: 100%;
  margin-top: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  button {
    margin-bottom: 20px;
    padding: 10px 20px;
    font-size: 16px;
    color: #ffffff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Episode = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
    color: #555;
  }

  button {
    margin-right: 10px;
    padding: 8px 15px;
    font-size: 14px;
    color: #ffffff;
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #218838;
    }

    &:last-child {
      background-color: #dc3545;

      &:hover {
        background-color: #c82333;
      }
    }
  }

  div {
    display: flex;
    align-items: center;
    margin-top: 10px;

    svg {
      margin-right: 10px;
      cursor: pointer;
    }
  }
`;

const FormContainer = styled.div`
position: absolute;
top: 60px;
  right: 10px;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
`;

const PodcastDetails = () => {
  const { id } = useParams();
  const { podcastData } = usePodcastData();
  const [isAddingEpisode, setIsAddingEpisode] = useState(false);

  const podcast = podcastData.find(podcast => podcast.$id === id);

  if (!podcast) {
    return <div>Podcast not found</div>;
  }

  const episodes = podcast.episodes || [];

  return (
    <Container>
      <SuggestionContainer>
        {/* Add content for suggestions here */}
        suggestion
      </SuggestionContainer>

      <PodcastContainer>
        <Thumbnail>
          <img src={podcast.thumbnail} alt={`${podcast.title} thumbnail`} />
        </Thumbnail>
        <Title>{podcast.title}</Title>
        <Rabbi>{podcast.rabbi}</Rabbi>
        <Description>{podcast.description}</Description>
        <AudioPlayerContainer>
          <AudioPlayer 
            key={podcast.audioUrl} 
            audioUrl={podcast.audioUrl} 
            playerVars={playerVars} 
          />
        </AudioPlayerContainer>
      </PodcastContainer>
      
      <EpisodeContainer>
        <EpisodeList>
          <h2>Episodes</h2>
          <button onClick={() => setIsAddingEpisode(true)}>Add New Episode</button>
          {episodes.length > 0 ? (
            episodes.map((episode, index) => (
              <Episode key={index}>
                <h3>{episode.title}</h3>
                <p>Audio URL: {episode.audioId}</p>
                <div>
                  {/* Replace with actual play/pause icons */}
                  <span>Play/Pause Icon</span>
                </div>
                <button>Edit</button>
                <button>Delete</button>
              </Episode>
            ))
          ) : (
            <p>No episodes found for this podcast.</p>
          )}
        </EpisodeList>
      </EpisodeContainer>

      {isAddingEpisode && (
        <FormContainer>
        <AddEpisode 
          podcastId={id} 
          onClose={() => setIsAddingEpisode(false)} 
        /></FormContainer>
      )}
    </Container>
  );
};

export default PodcastDetails;
